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
  optionId: string;
  value: string | number;
}

export interface QuizQuestionResponse {
  type: "mcq" | "theory";
  questionText: string;
  options: QuizQuestionOption[];
  answer: string;
  explanation: string | null;
}

export type QuizType = "mcq" | "theory" | "both";
