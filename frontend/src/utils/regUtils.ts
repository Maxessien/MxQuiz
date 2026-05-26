import {
  AuthFormType,
  CreateQuizForm,
  CreateQuizManualForm,
  Fields,
  FormFields,
  GenQuizRes,
  QuestionResult,
  QuizQuestionsMod,
} from "@/types/types";
import { RegisterOptions } from "react-hook-form";
import { authApi } from "./api";

export const SESSION_COOKIE_NAME = "user_session_cookie";

export const CUSTOM_HEADER_KEY = "x-mxquiz-api-key";

export const formatTime = (seconds?: number) => {
  if (seconds === undefined) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const authFieldsRegisters: Record<
  Fields,
  Record<AuthFormType, RegisterOptions<FormFields, Fields>>
> = {
  email: {
    login: { required: "Email is required" },
    register: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email",
      },
    },
  },

  name: {
    login: { required: "Name is required" },
    register: {
      required: "Name is required",
      minLength: { value: 2, message: "Name cannot be less than 2 characters" },
      maxLength: {
        value: 35,
        message: "Name cannot be greater than 35 characters",
      },
      pattern: {
        value: /^[a-zA-Z\s'-]+$/,
        message:
          "Name can only contain letters, spaces, apostrophes, and hyphens",
      },
    },
  },

  password: {
    login: { required: "Password is required" },
    register: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long",
      },
      validate: (val) => {
        const value = String(val);
        if (!value.match(/[A-Z]/))
          return "Password must contain an uppercase letter";
        if (!value.match(/[a-z]/))
          return "Password must contain a lowercase letter";
        if (!value.match(/[0-9]/)) return "Password must contain a number";
        if (!value.match(/[^a-zA-Z0-9]/))
          return "Password must contain a special character";

        return true;
      },
    },
  },
};

export const submitCreateQuizForm = async (
  { optCount, pdf, qCount, qType }: CreateQuizForm,
  token: string,
) => {
  if (!pdf || pdf.length === 0) {
    throw new Error("PDF file is required");
  }

  const formData = new FormData();
  formData.append("qType", qType);
  formData.append("qCount", qCount.toString());
  formData.append("optCount", optCount.toString());
  formData.append("pdf", pdf[0]);

  const res = await authApi(token).post<GenQuizRes>("/quiz/ai", formData);
  return res.data;
};

export const submitQuizQuestions = async (
  data: CreateQuizManualForm,
  idToken: string,
) => {
  await authApi(idToken).post("/quiz", data);
};

export const gradeTestModeMcq = (
  questions: QuizQuestionsMod[],
): Promise<{ score: number; result: QuestionResult[] }> => new Promise((res, rej)=>{

  // Reject if none of the questions have an answer field
  if (questions.every(({answer})=> !answer || answer.trim().length === 0)) {
    rej({message: "Missing answers in questions"})
    return
  }

  const grade: { score: number; result: QuestionResult[] } = {
    score: 0,
    result: [],
  };

  for (const {
    options,
    question_id,
    question_text,
    explanation,
    userAnswer,
    answer,
  } of questions) {
    if (answer === userAnswer) grade.score++;

    const answerVal = options.find(
      ({ optionId }) => optionId === answer,
    )?.value;
    const userAnswerVal = options.find(
      ({ optionId }) => optionId === userAnswer,
    )?.value;

    grade.result.push({
      answer: { id: answer || "N/A", val: answerVal || "N/A" },
      explanation: explanation || null,
      question_id,
      question_text,
      userAnswer: { id: userAnswer || "", val: userAnswerVal || "" },
    });
  }

  grade.score = questions.length > 0 ? (grade.score / questions.length) * 100 : 0;

  res(grade);
});
