import axios from "axios";
import { Request, Response } from "express";
import { readFile } from "node:fs/promises";
import { client } from "../configs/groq.js";
import pool from "../configs/sqlConfig.js";
import { CLIENT_ERROR, SERVER_ERROR, SUCCESS } from "../utils/httpCodes";
import logger from "../utils/logger.js";
import { getPdfSystemsPrompt, storeQuizandQuestions } from "../utils/regHelpers";
import { Quiz, QuizQuestion, QuizType } from "../utils/types";

interface QuizBody extends Pick<
  Quiz,
  "description" | "status" | "title" | "time" | "visibility"
> {
  questions: QuizQuestion[];
}

const createQuiz = async(req: Request, res: Response) => {
  try {
    const { description, status, time, title, visibility, questions } =
      req.body as QuizBody;
      
    await storeQuizandQuestions(
      {
        description,
        status,
        time,
        title,
        visibility,
        author: req.auth?.uid || "",
        isAiGen: false,
      },
      questions,
    );

    return res.status(SUCCESS.CREATED).json({ message: "Quiz created" });
  } catch (err) {
    logger.error("Create Quiz", err);
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

const createQuizWithAi = async (req: Request, res: Response) => {
  try {
    const {qType, qCount, optCount} = req.body
    const pdf = req.uploaded?.find(({fieldname})=>fieldname==="pdf")
    if (!pdf) return res.status(CLIENT_ERROR.BAD_REQUEST).json({message: "No pdf file uploaded"})
    
    const formdata = new FormData();
    const fileBuffer = await readFile(pdf?.path || "");
    const blob = new Blob([fileBuffer], {
      type: pdf?.mimetype || "application/pdf",
    });
    formdata.append("pdf_file", blob, pdf?.originalname || "document.pdf");

    const pdfText = await axios.post<{ extracted_text: string }>(
      `${process.env.PDF_EXTRACTOR_URL}/upload` || "",
      formdata,
    );

    if (!pdfText.data?.extracted_text?.trim())
      return res.status(CLIENT_ERROR.BAD_REQUEST).json({message: "Empty file"});

    const allowedType = ["mcq", "theory", "both"]
    const clean: {type: QuizType, count: number, optCount: number} = {
      type: typeof qType === "string" && allowedType.includes(qType) ? (qType as QuizType) : "mcq",
      count: Number.isFinite(Number(qCount)) ? Number(qCount) : 10,
      optCount: Number.isFinite(Number(optCount)) ? Number(optCount) : 3,
    }

    const questionsRes = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: getPdfSystemsPrompt(clean.type, clean.count, clean.optCount) },
        { role: "user", content: pdfText.data.extracted_text },
      ],
      response_format: { type: "json_object" },
    });

    const quizInfoRes = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            `You are a specialized AI that generates quiz metadata. 
            Based on the given text, create metadata for a quiz. 
            Your response MUST be in valid JSON format matching this exact object structure: 
            { "title": "A catchy title for the quiz based on the content", "thumbnail": "", 
             "description": "A concise, engaging description of the quiz content", "author": "", 
             "isAiGen": true, "visibility": "private", "status": "draft", "time": null }`,
        },
        { role: "user", content: pdfText.data.extracted_text },
      ],
      response_format: { type: "json_object" },
    });

    const content = questionsRes.choices[0].message.content
    const infoContent = quizInfoRes.choices[0].message.content
    if (!content) return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ message: "Failed to generate questions" });
    
    const questions: QuizQuestion[] = JSON.parse(content);
    const quizInfo: Quiz = JSON.parse(infoContent || "");

    quizInfo.author = req.auth?.uid || ""
    quizInfo.isAiGen = true

    await storeQuizandQuestions(quizInfo, questions);

    return res.status(SUCCESS.CREATED).json({quizInfo, questions})
  } catch (err) {
    logger.error("Create quiz with AI", err);
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

const getPublicQuizzes = async(req: Request, res: Response)=>{
  try {
    const query = `SELECT * FROM quizzes`
    const quizzes = await pool.query(query)

    return res.status(SUCCESS.OK).json(quizzes.rows)
  } catch (err) {
    logger.error("Get public quizzes", err)
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).json({message: "Internal server error"})
  }
}

const getUserQuizzes = async(req: Request, res: Response)=> {
  try {
    const userQuizzes = await pool.query("SELECT * FROM quizzes WHERE author_user_id=$1", [req.auth?.uid])

    return res.status(SUCCESS.OK).json(userQuizzes.rows)
  } catch (err) {
    logger.error("Get user quizzes", err)
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).json({message: "Internal server error"})
  }
}

export { createQuiz, createQuizWithAi, getPublicQuizzes, getUserQuizzes };

