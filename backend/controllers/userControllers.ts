import { Request, Response } from "express";
import pool from "../configs/sqlConfig";
import { SUCCESS } from "../utils/httpCodes";
import { handleAsyncErrors } from "../utils/regHelpers";

const getUserAttempts = (req: Request, res: Response)=> handleAsyncErrors(res, async()=>{
    const query = `
        SELECT a.attempt_id, a.quiz_id, a.score, a.created_at,
            (SELECT title FROM quizzes WHERE quiz_id = a.quiz_id) AS quiz_title,
            (SELECT COUNT(*) FROM questions WHERE quiz_id = a.quiz_id) AS questions_count
        FROM quiz_attempts AS a WHERE a.user_id = $1
    `

    const attempts = await pool.query(query, [req.auth?.uid])

    return res.status(SUCCESS.OK).json(attempts.rows)
}, "Failed to get user attempts")

export { getUserAttempts };
