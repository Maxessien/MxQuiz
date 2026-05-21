import { QuizCardProps } from "@/types/componentTypes";
import { authApi, regApi } from "./api";
import logger from "./logger";
import { QuizQuestionResponse } from "@/types/types";


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
          }>(`/questions/${quizId}`);

    return questions.data;
  } catch (err) {
    logger.error("Get Questions", err);
    return null;
  }
};

export const submitQuiz = async (
  answers: SubmittedQuizAnswer[],
  quizId: string,
  token: string,
) => {
  const { data } = await regApi.post<{ score: number }>("/questions/grade", {
    answers,
    attempt_token: token,
    quiz_id: quizId,
  });

  return data.score;
};
