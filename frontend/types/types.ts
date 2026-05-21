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

export interface QuizQuestionOption {
  option_id: string;
  value: string | number;
}

export interface QuizQuestionResponse {
  question_text: string;
  options: QuizQuestionOption[];
  question_id: string
  title: string,
  time_limit: number
}

export interface QuizQuestionsMod extends QuizQuestionResponse {
  is_answered: boolean,
  answer: string | null
}

export type QuizType = "mcq" | "theory" | "both";


export interface FormFields {
  email: string;
  name?: string;
  password: string;
}

export type Fields = "email" | "name" | "password"