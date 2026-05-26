import { QuizCardProps } from "@/types/componentTypes";
import {
  QuestionResult,
  QuizQuestionResponse,
  UserAttemptResponse,
  UserResponse,
} from "@/types/types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { authApi, regApi } from "./api";
import logger from "./logger";
import { CUSTOM_HEADER_KEY } from "./regUtils";

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
  token?: string,
) => {
  try {
    const params = new URLSearchParams();
    params.append("sortBy", sortBy);
    params.append("order", order);
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (search) params.append("search", search);
    type.forEach((t) => params.append("type", t));

    const res = await regApi.get<QuizResponse[]>(
      `/quiz?${params.toString()}`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
    );

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
  includeAnswers: { val: boolean; apiKey: string } = { val: false, apiKey: "" },
) => {
  try {
    const questions =
      type === "private"
        ? await authApi(idToken || "").get<{
            attempt_token: string;
            questions: QuizQuestionResponse[];
          }>(
            `/questions/private/${quizId}${includeAnswers.val ? "?include=ans" : ""}`,
            includeAnswers.val
              ? { headers: { [CUSTOM_HEADER_KEY]: includeAnswers.apiKey } }
              : undefined,
          )
        : await regApi.get<{
            attempt_token: string;
            questions: QuizQuestionResponse[];
          }>(
            `/questions/${quizId}${includeAnswers.val ? "?include=ans" : ""}`,
            idToken
              ? {
                  headers: {
                    Authorization: `Bearer ${idToken}`,
                    ...(includeAnswers.val
                      ? { [CUSTOM_HEADER_KEY]: includeAnswers.apiKey }
                      : {}),
                  },
                }
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

export const getUserAttempts = async (token: string) => {
  try {
    const attempts =
      await authApi(token).get<UserAttemptResponse[]>("/user/attempts");

    return attempts.data;
  } catch (err) {
    logger.error("Get user attempts", err);
    return [];
  }
};

export const getUserAttemptsDetails = async (token: string, id: string) => {
  try {
    const attempts = await authApi(token).get<{
      score: number;
      result: QuestionResult[];
    }>(`/user/attempts/${id}`);

    return attempts.data;
  } catch (err) {
    logger.error("Get user attempts", err);
    return null;
  }
};

export const getUserDashboardStats = async (token: string) => {
  try {
    const stats = await authApi(token).get<{
      stats: {
        total_quizzes_created: number;
        total_attempts_taken: number;
        average_score: number;
        total_plays_on_user_quizzes: number;
      };
      recentAttempts: {
        attempt_id: string;
        quiz_id: string;
        score: number;
        created_at: string;
        quiz_title: string;
      }[];
      recentQuizzes: {
        quiz_id: string;
        title: string;
        created_at: string;
        status: string;
        visibility: string;
        attempts_count: number;
      }[];
    }>("/user/dashboard");
    return stats.data;
  } catch (err) {
    logger.error("Get user dashboard stats", err);
    return null;
  }
};
