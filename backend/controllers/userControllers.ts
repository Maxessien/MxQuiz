import { Request, Response } from "express";
import pool from "../configs/sqlConfig";
import { CLIENT_ERROR, SUCCESS } from "../utils/httpCodes";
import { gradeMcqAnswers, handleAsyncErrors } from "../utils/regHelpers";
import { SubmittedQuizAnswer } from "../utils/types";

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

export { getAttemptDetails, getUserAttempts };

