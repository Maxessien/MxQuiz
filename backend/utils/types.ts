import type { DecodedIdToken } from "firebase-admin/auth";
import {} from "multer";

export interface DecodedTokenWithClaims extends DecodedIdToken {
  role: "user" | "admin";
  token: string;
}

export interface CreateUserReqBody {
  email: string;
  name: string;
  password: string;
}

export interface RequestImages extends Express.Multer.File {
  url: string;
  publicId: string;
}

export interface Quiz {
  title: string;
  description: string;
  author: string;
  isAiGen: boolean;
  visibility: "public" | "private";
  status: "draft" | "published";
  time: number | null;
}

export interface QuizQuestionOption {
  optionId: string;
  value: string | number;
}

export interface QuizQuestion {
  type: "mcq" | "theory";
  questionText: string;
  options: QuizQuestionOption[];
  answer: string;
  explanation: string | null;
}

export interface UpdateQuestionReq extends QuizQuestion {
  question_id: string;
}

export type QuizType = "mcq" | "theory" | "both";

export interface AttemptToken {
  attemptor_id: string;
  is_valid: boolean;
}

export interface SubmittedQuizAnswer {
  question_id: string;
  answer_id: string;
}

export interface SubmittedQuizBody {
  quiz_id: string;
  answers: SubmittedQuizAnswer[];
  attempt_token: string;
}
