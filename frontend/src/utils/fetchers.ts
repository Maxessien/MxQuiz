import axios from "axios";
import logger from "./logger";
import { QuizCardProps } from "@/types/componentTypes";

export type QuizSortBy = "ratings" | "date" | "attempts"
export type QuizSortOrder = "asc" | "desc"
export type QuizFilterType = "mcq" | "theory"

export const getQuizzes = async (
  sortBy: QuizSortBy = "date",
  order: QuizSortOrder = "desc",
  search: string = "",
  type: QuizFilterType[] = ["mcq", "theory"]
) => {
    try {
        const params = new URLSearchParams();
        params.append("sortBy", sortBy);
        params.append("order", order);
        if (search) params.append("search", search);
        type.forEach(t => params.append("type", t));

        const res = await axios.get<QuizCardProps[]>(`/quiz?${params.toString()}`);
        return res.data;
    } catch (err) {
        logger.error("Get Quiz", err)
        return []
    }
};
