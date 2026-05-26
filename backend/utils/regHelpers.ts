import type { Response } from "express";
import format from "pg-format";
import pool from "./../configs/sqlConfig.js";
import { SERVER_ERROR } from "./httpCodes.js";
import logger from "./logger.js";
import type {
  FormattedResult,
  QuestionResultWithType,
  Quiz,
  QuizQuestion,
  QuizType,
  SubmittedQuizAnswer,
} from "./types.js";

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const SESSION_COOKIE_NAME = "user_session_cookie";

export const CUSTOM_HEADER_KEY = "x-mxquiz-api-key"

const handleAsyncErrors = async (
  res: Response,
  cb: () => Promise<Response<any, any>>,
  errorLogMessage: string = "Server error",
) => {
  try {
    return await cb();
  } catch (err) {
    logger.error(errorLogMessage, err);
    return res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ success: false });
  }
};
const storeQuizandQuestions = async (
  quizInfo: Quiz,
  questions: QuizQuestion[],
) => {
  const { author, description, isAiGen, status, time, title, visibility } =
    quizInfo;

  // Use a transaction to ensure atomicity
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertQuizQuery = `
            INSERT INTO quizzes (
                title,
                description,
                author_user_id,
                is_ai_generated,
                visibility,
                status,
                time_limit
            ) VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING quiz_id
        `;

    const timeLimit = typeof time === "number" ? time : null;

    const quizValues = [
      title,
      description,
      author,
      isAiGen,
      visibility,
      status,
      timeLimit,
    ];

    const res = await client.query(insertQuizQuery, quizValues);
    const insertedQuizId = res.rows[0]?.quiz_id;

    // Insert questions

    const allQValues = questions.map((q) => [
      insertedQuizId,
      q.type,
      q.question_text,
      JSON.stringify(q.options || []),
      q.answer,
      q.explanation || null,
    ]);

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

    await client.query(format(insertQuestionQuery, allQValues));

    await client.query("COMMIT");
    return insertedQuizId;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const getPdfSystemsPrompt = (
  questionType: QuizType,
  questionCount: number,
  optionsCount?: number,
) => {
  const extra = {
    both: "The array should contain a mix of mcq and theory question type with a 7:3 ratio respectively",
    mcq: "The array should only contain the mcq type questions",
    theory: "The array should only contain the theory type questions",
  };

  return `You are an expert quiz generator. Using the provided text, 
  generate an array of ${questionCount} quiz questions 
  ${
    Number.isFinite(optionsCount) &&
    (questionType === "mcq" || questionType === "both")
      ? `with each question having only ${optionsCount} options`
      : ""
  } in valid JSON format. 
  CRITICAL RULE FOR MCQs: Ensure all options are of similar length and level of detail. 
  The correct answer MUST NOT be noticeably longer, more explanatory, or structurally different from the incorrect options. 
  Create plausible distractors so the answer cannot be guessed without actually reading the provided text.
  SECOND CRITICAL RULE FOR MCQs: The position/index of the correct answer within the options array 
  MUST be cryptographically randomized across the quiz. Ensure perfectly even distribution of correct answer 
  positions so no single option index is favored as the correct answer over the others. 
  Your response must strictly contain ONLY an array of objects matching this exact structure structure 
  (no markdown wrappers or other text): [{ "type": "mcq" | "theory", "question_text": "The question being asked", 
  "options": [{ "optionId": "unique-id", "value": "Option text" }], "answer": "The correct optionId or theory answer", 
  "explanation": "Why the answer is correct or null" }]. ${extra[questionType]}`;
};

const getDBQuizDetails = async (id: string, userId: string | null) => {
  const query = `
      SELECT
        q.quiz_id, q.title, q.description, q.time_limit, q.is_ai_generated, q.created_at,
        u.user_id AS author_id, u.name AS author_name, u.avatar_url AS author_img,
        (SELECT COUNT(*)::int FROM questions WHERE quiz_id = q.quiz_id) as question_count,
        (SELECT COALESCE(AVG(rating), 0)::float FROM quiz_comments WHERE quiz_id = q.quiz_id) as average_rating,
        (SELECT COUNT(*)::int FROM quiz_attempts WHERE quiz_id = q.quiz_id) as attempts_count,
        (SELECT COALESCE(AVG(score), 0)::float FROM quiz_attempts WHERE quiz_id = q.quiz_id) as avg_score,
        (SELECT COUNT(*)::int FROM quizzes WHERE author_user_id = u.user_id) AS author_quiz_count
      FROM quizzes AS q LEFT JOIN users AS u ON u.user_id = q.author_user_id
      WHERE q.quiz_id = $1 AND (q.visibility = 'public' OR q.author_user_id = $2)
    `;

  const quiz = await pool.query(query, [id, userId]);
  return quiz;
};

const getDBQuizQuestions = async (id: string, userId: string | null, includeAnswers: boolean) => {
  const query = `
        SELECT q.question_id, q.question_text, q.options, qz.title, 
          ${includeAnswers ? "q.answer, q.explanation," : ""} qz.time_limit
        FROM questions AS q JOIN quizzes AS qz ON q.quiz_id = qz.quiz_id
        WHERE q.quiz_id = $1 AND (qz.visibility = 'public' OR qz.author_user_id = $2)
        GROUP BY q.question_id, q.question_text,
          q.options, qz.title, qz.time_limit
    `;

  const questions = await pool.query(query, [id, userId]);
  return questions;
};

const gradeMcqAnswers = async (
  quizId: string,
  userAnswers: SubmittedQuizAnswer[],
): Promise<{ result: FormattedResult[]; score: number }> => {
  const query = `
    SELECT question_id, answer, explanation, options, question_text, type
    FROM questions
    WHERE quiz_id = $1 AND type = 'mcq'
  `;
  const { rows } = await pool.query<QuestionResultWithType>(query, [quizId]);

  let agg = 0;

  const result: FormattedResult[] = rows.map((dbQuestion) => {
    const submitted = userAnswers.find(
      (ans) => ans.question_id === dbQuestion.question_id,
    );
    if (submitted?.answer_id === dbQuestion.answer) agg++;
    return {
      question_id: dbQuestion.question_id,
      answer: {
        id: dbQuestion.answer,
        val:
          dbQuestion.options.find(
            ({ optionId }) => optionId === dbQuestion.answer,
          )?.value || "",
      },
      explanation: dbQuestion.explanation,
      question_text: dbQuestion.question_text,
      userAnswer: {
        id: submitted?.answer_id || "",
        val:
          dbQuestion.options.find(
            ({ optionId }) => optionId === submitted?.answer_id,
          )?.value || "",
      },
    };
  });

  const score = rows.length > 0 ? (agg / rows.length) * 100 : 0;
  return { score, result };
};

const gradeQuizAttempt = async (
  quizId: string,
  answers: SubmittedQuizAnswer[],
  userId: string | null,
) => {
  const answersQuery = await pool.query<QuestionResultWithType>(
    "SELECT answer, question_id, options, explanation FROM questions WHERE quiz_id = $1",
    [quizId],
  );

  if (answersQuery.rows.length === 0) {
    throw new Error("Quiz not found or has no questions");
  }

  const validQuestionIds = new Set(answersQuery.rows.map((q) => q.question_id));
  const invalidAnswers = answers.filter(
    (a) => !validQuestionIds.has(a.question_id),
  );
  if (invalidAnswers.length > 0) {
    throw new Error("Submitted answers contain invalid question IDs");
  }

  const res = await gradeMcqAnswers(quizId, answers);

  //Only store attempt when user id is available
  if (userId) {
    const query = `
    INSERT INTO quiz_attempts AS q (quiz_id, user_id, chosen_answers, score, status)
    VALUES ($1, $2, $3::jsonb, $4, 'finished')
  `;

    await pool.query(query, [
      quizId,
      userId,
      JSON.stringify(answers),
      res.score.toFixed(0),
    ]);
  }

  return res;
};

export {
  getDBQuizDetails,
  getDBQuizQuestions,
  getPdfSystemsPrompt,
  gradeMcqAnswers,
  gradeQuizAttempt,
  handleAsyncErrors,
  storeQuizandQuestions
};

