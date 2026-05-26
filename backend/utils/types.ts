import type { DecodedIdToken } from "firebase-admin/auth";
import { } from "multer";

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
  value: string;
}

export interface QuizQuestion {
  type: "mcq" | "theory";
  question_text: string;
  options: QuizQuestionOption[];
  answer: string;
  explanation: string | null;
}

export interface UpdateQuestionReq extends QuizQuestion {
  question_id: string;
}

export type QuizType = "mcq" | "theory" | "both";

export interface AttemptToken {
  attemptor_id: string | null;
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

export interface QuestionResult {
  question_id: string,
  answer: string,
  explanation: string | null,
  question_text: string
  userAnswer: string,
  options: QuizQuestionOption[]
}

export interface QuestionResultWithType extends QuestionResult {
  type: "mcq" | "theory",
}

export interface FormattedResult extends Pick<QuestionResult, "explanation" | "question_id" | "question_text"> {
  answer: {id: string, val: string},
  userAnswer: {id: string, val: string}
}
