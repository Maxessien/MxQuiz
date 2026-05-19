import pool from "./../configs/sqlConfig.js";
import type { Quiz, QuizQuestion } from "./types.js";
import format from "pg-format";

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const SESSION_COOKIE_NAME = "user_session_cookie";


const storeQuizandQuestions = async (
  quizInfo: Quiz,
  questions: QuizQuestion[],
) => {
  const {
    author,
    description,
    isAiGen,
    status,
    thumbnail,
    time,
    title,
    visibility,
  } = quizInfo;

  // Use a transaction to ensure atomicity
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertQuizQuery = `
            INSERT INTO quizzes (
                title,
                thumbnail_url,
                description,
                author_user_id,
                is_ai_generated,
                visibility,
                status,
                time_limit,
                question_count
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING quiz_id
        `;

    const questionCount = Array.isArray(questions) ? questions.length : 0;
    const timeLimit = typeof time === "number" ? time : null;

    const quizValues = [
      title,
      thumbnail,
      description,
      author,
      isAiGen,
      visibility,
      status,
      timeLimit,
      questionCount,
    ];

    const res = await client.query(insertQuizQuery, quizValues);
    const insertedQuizId = res.rows[0]?.quiz_id;

    // Insert questions
    const insertQuestionQuery = `
            INSERT INTO questions (
                quiz_id,
                type,
                question_text,
                options,
                answer,
                explanation
            ) VALUES %L
        `;

    const allQValues = questions.map((q) => [
      insertedQuizId,
      q.type,
      q.questionText,
      JSON.stringify(q.options || {}),
      q.answer,
      q.explanation || null,
    ]);
    await client.query(format(insertQuestionQuery), allQValues);

    await client.query("COMMIT");
    return insertedQuizId;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const getPdfSystemsPrompt = (questionType: "mcq" | "theory" | "both", questionCount: number, optionsCount?: number)=>{

  const extra = {
    both: "The array should contain a mix of mcq and theory question type with a 7:3 ratio respectively",
    mcq: "The array should only contain the mcq type questions",
    theory: "The array should only contain the theory type questions"
  };

  return `You are an expert quiz generator. Using the provided text, 
  generate an array of ${questionCount} quiz questions 
  ${Number.isFinite(optionsCount) && (questionType === "mcq" || questionType === "both") 
  ? `with each question having only ${optionsCount} options` : ""} in valid JSON format. 
  Your response must strictly contain ONLY an array of objects matching this exact structure structure 
  (no markdown wrappers or other text): [{ "type": "mcq" | "theory", "questionText": "The question being asked", 
  "options": [{ "optionId": "unique-id", "value": "Option text" }], "answer": "The correct optionId or theory answer", 
  "explanation": "Why the answer is correct or null" }]. ${extra[questionType]}`;
}

export {storeQuizandQuestions, getPdfSystemsPrompt};
