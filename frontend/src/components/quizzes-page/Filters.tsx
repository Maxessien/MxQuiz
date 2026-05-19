import { FiSliders } from "react-icons/fi";
import Button from "../reusable/Button";
import { useState } from "react";
import {
  QuizFilterType,
  QuizSortBy,
  QuizSortOrder,
} from "@/src/utils/fetchers";
import { useSearchParams } from "next/navigation";

interface FilterState {
  sort: QuizSortBy;
  order: QuizSortOrder;
  type: QuizFilterType[];
}

const Filters = () => {
  const searchParams = useSearchParams();
  const allowList = {
    sort: ["attempts", "date", "ratings"],
    order: ["asc", "desc"],
    type: ["mcq", "theory"],
  };
  const orderP = searchParams.get("order");
  const sortP = searchParams.get("sort");
  const typeP = searchParams.getAll("type");

  const [filters, setFilters] = useState<FilterState>({
    order: allowList.order.includes(orderP || "")
      ? (orderP as QuizSortOrder)
      : "desc",
    sort: allowList.sort.includes(sortP || "") ? (sortP as QuizSortBy) : "date",
    type: typeP.every((t) => allowList.type.includes(t))
      ? (typeP as QuizFilterType[])
      : ["mcq", "theory"],
  });

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-(--main-secondary-light) pr-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-(--text-primary-light)">Filters</h3>
        <button className="text-(--main-primary-light) text-sm font-medium hover:underline">
          Clear all
        </button>
      </div>

      {/* Excluded Course, Level, and Difficulty as per DB schema limits constraint */}

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-(--text-secondary) mb-3">
          Question Type
        </h4>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="quiz_type"
                defaultChecked
                className="w-4 h-4 accent-(--main-primary)"
              />
              <span className="text-sm text-(--text-primary-light) group-hover:text-white transition-colors">
                All Types
              </span>
            </div>
            <span className="text-xs text-(--text-secondary-light)">1,235</span>
          </label>
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="quiz_type"
                className="w-4 h-4 accent-(--main-primary)"
              />
              <span className="text-sm text-(--text-secondary) group-hover:text-white transition-colors">
                MCQ
              </span>
            </div>
            <span className="text-xs text-(--text-secondary-light)">892</span>
          </label>
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="quiz_type"
                className="w-4 h-4 accent-(--main-primary)"
              />
              <span className="text-sm text-(--text-secondary) group-hover:text-white transition-colors">
                Theory
              </span>
            </div>
            <span className="text-xs text-(--text-secondary-light)">343</span>
          </label>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-semibold text-(--text-secondary) mb-3">
          Sort By
        </h4>
        <div className="relative">
          <select className="w-full bg-(--main-tertiary) border border-(--main-tertiary-light) text-(--text-primary-light) text-sm rounded-lg p-3 outline-none appearance-none cursor-pointer">
            <option value={""}>Most Popular</option>
            <option value={""}>Newest</option>
            <option value={""}>Top Rated</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-(--text-secondary)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-semibold text-(--text-secondary) mb-3">
          Order
        </h4>
        <div className="relative">
          <select className="w-full bg-(--main-tertiary) border border-(--main-tertiary-light) text-(--text-primary-light) text-sm rounded-lg p-3 outline-none appearance-none cursor-pointer">
            <option>Ascending</option>
            <option>Descending</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-(--text-secondary)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <Button
        color="primary"
        width="w-full"
        className="py-3 shadow-lg shadow-(--main-primary)/10"
      >
        <FiSliders className="mr-2" /> Apply Filters
      </Button>
    </aside>
  );
};

// Assuming you have FiSliders installed or used from react-icons earlier

export default Filters;
