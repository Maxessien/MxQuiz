import { Request, Response } from "express";
import { CLIENT_ERROR, SUCCESS } from "../utils/httpCodes";
import { getDBQuizQuestions, handleAsyncErrors } from "../utils/regHelpers";

const getPublicQuizQuestions = async (req: Request, res: Response) =>
  handleAsyncErrors(
    res,
    async () => {
      const id =
        typeof req.params.id === "string" ? req.params.id : req.params.id[0];
      const questions = await getDBQuizQuestions(id, null);
      if (!questions.rows[0])
        return res
          .status(CLIENT_ERROR.NOT_FOUND)
          .json({ message: "Questions not found" });

      return res.status(SUCCESS.OK).json(questions.rows[0]);
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
      if (!questions.rows[0])
        return res
          .status(CLIENT_ERROR.NOT_FOUND)
          .json({ message: "Questions not found" });

      return res.status(SUCCESS.OK).json(questions.rows[0]);
    },
    "Get Private Questions err",
  );

export { getPublicQuizQuestions, getPrivateQuizQuestions };
