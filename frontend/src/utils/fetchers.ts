import { QuizCardProps } from "@/types/componentTypes";
import { regApi } from "./api";
import logger from "./logger";

export type QuizSortBy = "ratings" | "date" | "attempts"
export type QuizSortOrder = "asc" | "desc"
export type QuizFilterType = "mcq" | "theory"

export interface QuizResponse extends QuizCardProps {
    total_rows: number
}

export const getQuizzes = async (
  sortBy: QuizSortBy = "date",
  order: QuizSortOrder = "desc",
  search: string = "",
  type: QuizFilterType[] = ["mcq", "theory"],
  page: number=1,
  limit: number=20
) => {
    try {
        const params = new URLSearchParams();
        params.append("sortBy", sortBy);
        params.append("order", order);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);
        type.forEach(t => params.append("type", t));

        const res = await regApi.get<QuizResponse[]>(`/quiz?${params.toString()}`);
        return res.data;
    } catch (err) {
        logger.error("Get Quiz", err)
        return []
    }
};
