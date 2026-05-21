import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { CLIENT_ERROR, SUCCESS } from "../utils/httpCodes";
import { getDBQuizQuestions, gradeQuizAttempt, handleAsyncErrors } from "../utils/regHelpers";
import { AttemptToken, SubmittedQuizBody } from "../utils/types";


const getPublicQuizQuestions = async (req: Request, res: Response) =>
  handleAsyncErrors(
    res,
    async () => {
      const id =
        typeof req.params.id === "string" ? req.params.id : req.params.id[0];
      const questions = await getDBQuizQuestions(id, null);

      if (questions.rows.length === 0)
        return res
          .status(CLIENT_ERROR.NOT_FOUND)
          .json({ message: "Questions not found" });

      const hasUserId = req.query.userId?.toString();
      const signature: AttemptToken = {
        attemptor_id: null,
        is_valid: true,
      };

      if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY environment variable is not configured");
      }

      const token = jwt.sign(
        JSON.stringify(signature),
        process.env.JWT_KEY,
      );

      return res
        .status(SUCCESS.OK)
        .json({ attempt_token: token, questions: questions.rows });
    },
    "Get public questions err",
  );

const getPrivateQuizQuestions = async (req: Request, res: Response) =>
  handleAsyncErrors(
    res,
    async () => {
      const id =
        typeof req.params.id === "string" ? req.params.id : req.params.id[0];
      const questions = await getDBQuizQuestions(id, req.auth?.uid ?? null);

      if (questions.rows.length === 0)
        return res
          .status(CLIENT_ERROR.NOT_FOUND)
          .json({ message: "Questions not found" });

      const hasUserId = req.query.userId;
      const signature: AttemptToken = {
        attemptor_id: req.auth?.uid ?? v4(),
        is_valid: true,
      };
      const token = jwt.sign(
        JSON.stringify(signature),
        process.env.JWT_KEY || "",
      );

      return res
        .status(SUCCESS.OK)
        .json({ attempt_token: token, questions: questions.rows });
    },
    "Get Private Questions err",
  );

const gradeQuestionAnswers = async (req: Request, res: Response) =>
  handleAsyncErrors(
    res,
    async () => {
      const { answers, attempt_token, quiz_id }: SubmittedQuizBody = req.body;

      if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY environment variable is not configured");
      }

      const verified = jwt.verify(attempt_token, process.env.JWT_KEY);
      const token = typeof verified === 'string' ? verified : JSON.stringify(verified);
      const decoded: AttemptToken = JSON.parse(token);

      if (!decoded?.is_valid)
        return res
          .status(CLIENT_ERROR.UNAUTHORIZED)
          .json({ message: "Unauthorised attempt" });

      const result = await gradeQuizAttempt(quiz_id, answers, decoded.attemptor_id)
          
      return res.status(SUCCESS.OK).json(result);
    },
    "Grade Quiz err",
  );

export { getPrivateQuizQuestions, getPublicQuizQuestions, gradeQuestionAnswers };

