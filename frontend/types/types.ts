export type AppTheme = "dark" | "light" | "system";

export interface AppSlice {
  width: number;
  height: number;
  theme: AppTheme;
}

export interface UserSlice {
  name: string;
  email: string;
  userId: string;
  avatarUrl: string;
  readonly role: "user" | "admin";
  idToken: string;
  isLoggedIn: boolean;
}

export interface UserResponse {
  name: string;
  email: string;
  user_id: string;
  avatar_url: string;
  role: "user" | "admin";
}

export interface GenQuizInfoRes {
  title: string;
  description: string;
  author: string;
  isAiGen: boolean;
  visibility: "public" | "private";
  status: "draft" | "published";
  time: number | null;
}

export interface GenQuizQuestionsRes extends Pick<
  QuizQuestionResponse,
  "options" | "question_text"
> {
  type: "mcq" | "theory";
  answer: string;
  explanation: string | null;
}

export interface CreateQuizManualForm extends GenQuizInfoRes {
  questions: GenQuizQuestionsRes[]
}

export interface GenQuizRes {
    quizInfo: GenQuizInfoRes;
    questions: GenQuizQuestionsRes[];
  }

export interface QuizQuestionOption {
  optionId: string;
  value: string | number;
}

export interface QuizQuestionResponse {
  question_text: string;
  options: QuizQuestionOption[];
  question_id: string;
  title: string;
  time_limit: number;
}

export interface QuizQuestionsMod extends QuizQuestionResponse {
  is_answered: boolean;
  answer: string | null;
}

export type QuizType = "mcq" | "theory" | "both";

export interface QuestionResult {
  question_id: string;
  answer: string;
  explanation: string | null;
  question_text: string;
  userAnswer: string;
}

export interface FormFields {
  email: string;
  name?: string;
  password: string;
}

export type Fields = "email" | "name" | "password";

export type AuthFormType = "register" | "login";

export interface CreateQuizForm {
  qType: QuizType;
  qCount: number;
  optCount: number;
  pdf: FileList;
}
