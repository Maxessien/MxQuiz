import { QuizCardProps } from "@/types/componentTypes";
import {
  QuestionResult,
  QuizQuestionResponse,
  UserResponse,
} from "@/types/types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { authApi, regApi } from "./api";
import logger from "./logger";

export interface SubmittedQuizAnswer {
  question_id: string;
  answer_id: string;
}

export type QuizSortBy = "ratings" | "date" | "attempts";
export type QuizSortOrder = "asc" | "desc";
export type QuizFilterType = "mcq" | "theory";

export interface QuizResponse extends QuizCardProps {
  total_rows: number;
}

export interface QuizDetailsResponse {
  quiz_id: string;
  title: string;
  description: string;
  time_limit: number | null;
  is_ai_generated: boolean;
  created_at: string;
  author_id: string;
  author_name: string;
  author_img: string | null;
  question_count: number;
  average_rating: number;
  attempts_count: number;
  avg_score: number;
  author_quiz_count: number;
}

export const getQuizzes = async (
  sortBy: QuizSortBy = "date",
  order: QuizSortOrder = "desc",
  search: string = "",
  type: QuizFilterType[] = ["mcq", "theory"],
  page: number = 1,
  limit: number = 20,
) => {
  try {
    const params = new URLSearchParams();
    params.append("sortBy", sortBy);
    params.append("order", order);
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (search) params.append("search", search);
    type.forEach((t) => params.append("type", t));

    const res = await regApi.get<QuizResponse[]>(`/quiz?${params.toString()}`);
    return res.data;
  } catch (err) {
    logger.error("Get Quiz", err);
    return [];
  }
};

export const getQuizQuestions = async (
  type: "public" | "private",
  quizId: string,
  idToken?: string,
) => {
  try {
    const questions =
      type === "private"
        ? await authApi(idToken || "").get<{
            attempt_token: string;
            questions: QuizQuestionResponse[];
          }>(`/questions/private/${quizId}`)
        : await regApi.get<{
            attempt_token: string;
            questions: QuizQuestionResponse[];
          }>(
            `/questions/${quizId}`,
            idToken
              ? { headers: { Authorization: `Bearer ${idToken}` } }
              : undefined,
          );

    return questions.data;
  } catch (err) {
    logger.error("Get Questions", err);
    return null;
  }
};

export const getQuizDetails = async (
  type: "public" | "private",
  quizId: string,
  idToken?: string,
) => {
  try {
    const quiz =
      type === "private"
        ? await authApi(idToken || "").get<QuizDetailsResponse>(
            `/quiz/private/${quizId}`,
          )
        : await regApi.get<QuizDetailsResponse>(`/quiz/${quizId}`);

    return quiz.data;
  } catch (err) {
    logger.error("Get Quiz Details", err);
    return null;
  }
};

export const submitQuiz = async (
  answers: SubmittedQuizAnswer[],
  quizId: string,
  token: string,
) => {
  const { data } = await regApi.post<{
    score: number;
    result: QuestionResult[];
  }>("/questions/grade", {
    answers,
    attempt_token: token,
    quiz_id: quizId,
  });

  return data;
};

export const getUserServerSide = async (
  token: RequestCookie | undefined,
): Promise<UserResponse | null> => {
  try {
    if (!token?.value) throw new Error("No token found");

    const user = await authApi(token.value).get<UserResponse>("/auth");

    return user.data;
  } catch (err) {
    logger.error("Get user server", err);
    return null;
  }
};
