import { Request, Response } from "express";
import pool from "../configs/sqlConfig";
import { CLIENT_ERROR, SUCCESS } from "../utils/httpCodes";
import { gradeMcqAnswers, handleAsyncErrors } from "../utils/regHelpers";
import { SubmittedQuizAnswer } from "../utils/types";

const getUserDashboardStats = (req: Request, res: Response) =>
  handleAsyncErrors(
    res,
    async () => {
      const uid = req.auth?.uid;

      const statsQuery = `
        SELECT
          (SELECT COUNT(*)::int FROM quizzes WHERE author_user_id = $1) AS total_quizzes_created,
          (SELECT COUNT(*)::int FROM quiz_attempts WHERE user_id = $1 AND status = 'finished') AS total_attempts_taken,
          (SELECT COALESCE(AVG(score), 0)::float FROM quiz_attempts WHERE user_id = $1 AND status = 'finished') AS average_score,
          (SELECT COUNT(*)::int FROM quiz_attempts qa JOIN quizzes q ON qa.quiz_id = q.quiz_id WHERE q.author_user_id = $1) AS total_plays_on_user_quizzes
      `;

      const statsRes = await pool.query(statsQuery, [uid]);

      const recentAttemptsQuery = `
        SELECT a.attempt_id, a.quiz_id, a.score, a.created_at, q.title as quiz_title
        FROM quiz_attempts a
        JOIN quizzes q ON a.quiz_id = q.quiz_id
        WHERE a.user_id = $1 AND a.status = 'finished'
        ORDER BY a.created_at DESC
        LIMIT 5
      `;
      const recentAttemptsRes = await pool.query(recentAttemptsQuery, [uid]);

      const recentQuizzesQuery = `
        SELECT quiz_id, title, created_at, status, visibility,
        (SELECT COUNT(*)::int FROM quiz_attempts WHERE quiz_id = quizzes.quiz_id) AS attempts_count
        FROM quizzes
        WHERE author_user_id = $1
        ORDER BY created_at DESC
        LIMIT 5
      `;
      const recentQuizzesRes = await pool.query(recentQuizzesQuery, [uid]);

      return res.status(SUCCESS.OK).json({
        stats: statsRes.rows[0],
        recentAttempts: recentAttemptsRes.rows,
        recentQuizzes: recentQuizzesRes.rows,
      });
    },
    "Failed to get dashboard stats",
  );

const getUserAttempts = (req: Request, res: Response) =>
  handleAsyncErrors(
    res,
    async () => {
      const query = `
        SELECT a.attempt_id, a.quiz_id, a.score, a.created_at,
            (SELECT title FROM quizzes WHERE quiz_id = a.quiz_id) AS quiz_title,
            (SELECT COUNT(*) FROM questions WHERE quiz_id = a.quiz_id) AS questions_count
        FROM quiz_attempts AS a WHERE a.user_id = $1
    `;

      const attempts = await pool.query(query, [req.auth?.uid]);

      return res.status(SUCCESS.OK).json(attempts.rows);
    },
    "Failed to get user attempts",
  );

const getAttemptDetails = (req: Request, res: Response) =>
  handleAsyncErrors(
    res,
    async () => {
      const attemptInfo = await pool.query<{
        quiz_id: string;
        chosen_answers: SubmittedQuizAnswer[];
      }>(
        "SELECT quiz_id, chosen_answers FROM quiz_attempts WHERE attempt_id = $1",
        [req.params.id],
      );

      if (!attemptInfo.rows[0]?.quiz_id || !attemptInfo.rows[0]?.chosen_answers)
        return res
          .status(CLIENT_ERROR.BAD_REQUEST)
          .json({ message: "Quiz attempt not found" });

      const grade = await gradeMcqAnswers(
        attemptInfo.rows[0].quiz_id,
        attemptInfo.rows[0].chosen_answers,
      );

      return res.status(SUCCESS.OK).json(grade);
    },
    "Get attempt details",
  );

export { getAttemptDetails, getUserAttempts, getUserDashboardStats };

