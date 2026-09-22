import type { Response } from "express";
import format from "pg-format";
import pool from "./../configs/sqlConfig.js";
import { SERVER_ERROR } from "./httpCodes.js";
import logger from "./logger.js";
import { decode, encode, isWithinTokenLimit } from "gpt-tokenizer";
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

export const CUSTOM_HEADER_KEY = "x-mxquiz-api-key";

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
  const optCount = Number.isFinite(optionsCount) ? optionsCount : 4;

  const extra = {
    both: "The array should contain a mix of mcq and theory question type with a 7:3 ratio respectively",
    mcq: `The array should only contain the mcq type questions with ${optCount} options for each question`,
    theory: "The array should only contain the theory type questions",
  };

  return `You are an elite, expert academic assessment creator. Your goal is to generate ${questionCount} high-quality quiz questions based strictly and exclusively on the provided text. The questions must feel human-authored, testing deep conceptual understanding rather than simple rote memorization.

PEDAGOGICAL & QUALITY RULES:
1. NO KEYWORD MATCHING: Do not copy sentences verbatim from the text and leave a blank space. Paraphrase the concepts using alternative phrasing to test true comprehension.
2. HIGH-QUALITY DISTRACTORS: For MCQs, wrong options must be highly plausible. Construct distractors by using actual terminology, misconceptions, or adjacent facts mentioned elsewhere in the text, but applied incorrectly to this specific context. Avoid obviously fake or unrelated answers.
3. SYNTAX VARIETY: Vary your question structures. Mix scenario-based application questions ("If X happens, what occurs?"), analytical questions, and occasional negative constraints ("Which of the following does NOT...").
4. STRUCTURAL PARITY: For MCQs, all options must be structurally uniform. The correct answer MUST NOT be noticeably longer, more detailed, or more nuanced than the incorrect options.
5. NO TRAP PHRASES: Absolutely do not use "All of the above" or "None of the above" as options.

MCQ INDEX RANDOMIZATION:
The index position of the correct answer within the "options" array must be completely randomized across the generated set. Ensure a perfectly uniform distribution of correct answer positions (e.g., do not stack correct answers under the first option ID).

OUTPUT RULES:
- The response must strictly contain ONLY an array of objects matching the exact JSON structure specified below.
- Do NOT wrap your response in markdown code blocks (\`\`\`json ... \`\`\`), do not include conversational text, intro, or outro.

EXPECTED STRUCTURE:
[{
  "type": "mcq" | "theory",
  "question_text": "The highly refined question text",
  "options": ${
    questionType !== "theory"
      ? `[
    { "optionId": "A", "value": "Plausible option text" },
    { "optionId": "B", "value": "Plausible option text" }
    // Max of ${optCount} options total
  ]`
      : "null"
  },
  "answer": "The correct optionId (e.g., 'B') or the concise ideal theory answer",
  "explanation": "A thorough breakdown explaining why the answer is correct and why the adjacent concepts/distractors are incorrect in this context."
}]. ${extra[questionType]}`;
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

const getDBQuizQuestions = async (
  id: string,
  userId: string | null,
  includeAnswers: boolean,
) => {
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

const MAX_TOKEN_L = 7500;

const chunkPdfContent = (content: string): string[] => {
  const isSmall = isWithinTokenLimit(content, MAX_TOKEN_L);
  if (isSmall) return [content];

  const encoded = encode(content);
  const encodedSplit: number[][] = [];
  for (let i = 0; i < Math.ceil(encoded.length / MAX_TOKEN_L); i++) {
    encodedSplit.push(encoded.splice(i * MAX_TOKEN_L, (i + 1) * MAX_TOKEN_L));
  }
  return encodedSplit.map((n) => decode(n));
};

export {
  getDBQuizDetails,
  getDBQuizQuestions,
  getPdfSystemsPrompt,
  gradeMcqAnswers,
  gradeQuizAttempt,
  handleAsyncErrors,
  storeQuizandQuestions,
  chunkPdfContent,
};
