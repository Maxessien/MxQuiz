import axios from "axios";
import { Request, Response } from "express";
import { readFile } from "node:fs/promises";
import { client } from "../configs/groq.js";
import { CLIENT_ERROR, SERVER_ERROR, SUCCESS } from "../utils/httpCodes";
import logger from "../utils/logger.js";
import { storeQuizandQuestions } from "../utils/regHelpers";
import { Quiz, QuizQuestion } from "../utils/types";

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
    const thumbnail = req.uploaded?.find(({fieldname})=> fieldname === "thumbnail")?.url || "";

    await storeQuizandQuestions(
      {
        description,
        status,
        time,
        title,
        visibility,
        author: req.auth?.uid || "",
        isAiGen: false,
        thumbnail,
      },
      questions,
    );

    return res.status(SUCCESS.CREATED)
  } catch (err) {
    logger.error("Create Quiz", err);
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR);
  }
};

const createQuizWithAi = async (req: Request, res: Response) => {
  try {
    const pdf = req.uploaded?.find(({fieldname})=>fieldname==="pdf")
    const thumbnail = req.uploaded?.find(({fieldname})=>fieldname==="thumbnail")
    if (!pdf) return res.status(CLIENT_ERROR.BAD_REQUEST).json({message: "No pdf file uploaded"})
    
    const formdata = new FormData();
    const fileBuffer = await readFile(pdf?.path || "");
    const blob = new Blob([fileBuffer], {
      type: pdf?.mimetype || "application/pdf",
    });
    formdata.append("pdf_file", blob, pdf?.originalname || "document.pdf");

    const pdfText = await axios.post<{ extracted_text: string }>(
      process.env.PDF_EXTRACTOR_URL || "",
      formdata,
    );

    if (!pdfText.data?.extracted_text?.trim())
      return res.status(CLIENT_ERROR.BAD_REQUEST);

    const questionsRes = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: "" },
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

    const content = questionsRes.choices[0].message.content;
    const infoContent = quizInfoRes.choices[0].message.content;
    if (!content) return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR);

    const questions: QuizQuestion[] = JSON.parse(content);
    const quizInfo: Quiz = JSON.parse(infoContent || "");

    quizInfo.author = req.auth?.uid || ""
    quizInfo.isAiGen = true
    quizInfo.thumbnail = thumbnail?.url || null

    await storeQuizandQuestions(quizInfo, questions)

    return res.status(SUCCESS.CREATED).json({quizInfo, questions})
  } catch (err) {
    logger.error("Create quiz with AI", err);
    return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR);
  }
};

export { createQuiz, createQuizWithAi };
