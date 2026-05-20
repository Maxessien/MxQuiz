"use client"

import {
  QuizFilterType,
  QuizSortBy,
  QuizSortOrder,
} from "@/src/utils/fetchers";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { FiSliders } from "react-icons/fi";
import Button from "../reusable/Button";

interface FilterState {
  sort: QuizSortBy;
  order: QuizSortOrder;
  type: QuizFilterType[];
}

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const allowList = {
    sort: ["attempts", "date", "ratings"],
    order: ["asc", "desc"],
    type: ["mcq", "theory"],
  };
  const orderP = searchParams.get("order");
  const sortP = searchParams.get("sort");
  const typeP = searchParams.getAll("type");
  const hasSearch = searchParams.get("search");

  const [filters, setFilters] = useState<FilterState>({
    order: allowList.order.includes(orderP || "")
      ? (orderP as QuizSortOrder)
      : "desc",
    sort: allowList.sort.includes(sortP || "") ? (sortP as QuizSortBy) : "date",
    type: typeP.every((t) => allowList.type.includes(t)) && typeP.length > 0
      ? (typeP as QuizFilterType[])
      : ["mcq", "theory"],
  });

  const applyFilters = () => {
    router.push(
      `/quiz?sort=${filters.sort}&type=${filters.type.join("_")}&order=${filters.order}${hasSearch ? `&search${hasSearch}` : ""}`,
    );
  };

  return (
    <aside className="flex flex-col w-full max-w-xl mx-auto lg:w-64 shrink-0 bg-(--main-secondary-light) pr-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-(--text-primary-light)">Filters</h3>
        <Link href={"/quiz"} className="text-(--main-primary-light) cursor-pointer text-sm font-medium hover:underline">
          Clear all
        </Link>
      </div>

      <div className="flex flex-wrap justify-between items-start lg:block gap-3">
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
                checked={filters.type.includes("mcq") && filters.type.includes("theory")}
                onChange={()=> setFilters((state) => ({ ...state, type: ["mcq", "theory"] }))}
              />
              <span className="text-sm text-(--text-primary-light) group-hover:text-white transition-colors">
                All Types
              </span>
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="quiz_type"
                className="w-4 h-4 accent-(--main-primary)"
                checked={filters.type.includes("mcq") && filters.type.length === 1}
                onChange={() =>
                  setFilters((state) => ({ ...state, type: ["mcq"] }))
                }
              />
              <span className="text-sm text-(--text-secondary) group-hover:text-white transition-colors">
                MCQ
              </span>
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="quiz_type"
                className="w-4 h-4 accent-(--main-primary)"
                checked={filters.type.includes("theory") && filters.type.length === 1}
                onChange={() =>
                  setFilters((state) => ({ ...state, type: ["theory"] }))
                }
              />
              <span className="text-sm text-(--text-secondary) group-hover:text-white transition-colors">
                Theory
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-semibold text-(--text-secondary) mb-3">
          Sort By
        </h4>
        <div className="relative">
          <select
            defaultValue={filters.sort}
            onChange={(e) =>
              setFilters((state) => ({
                ...state,
                sort: e.target.value as QuizSortBy,
              }))
            }
            className="w-full bg-(--main-tertiary) border border-(--main-tertiary-light) text-(--text-primary-light) text-sm rounded-lg p-3 outline-none appearance-none cursor-pointer"
          >
            <option value={"date"}>Date Added</option>
            <option value={"attempts"}>Attempts</option>
            <option value={"ratings"}>Ratings</option>
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
          <select
            defaultValue={filters.order}
            onChange={(e) =>
              setFilters((state) => ({
                ...state,
                order: e.target.value as QuizSortOrder,
              }))
            }
            className="w-full bg-(--main-tertiary) border border-(--main-tertiary-light) text-(--text-primary-light) text-sm rounded-lg p-3 outline-none appearance-none cursor-pointer"
          >
            <option value={"asc"}>Ascending</option>
            <option value={"desc"}>Descending</option>
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
      </div>

      <Button
        color="primary"
        width="w-full max-w-120 mx-auto"
        className="py-3 shadow-lg shadow-(--main-primary)/10"
        attrs={{ onClick: applyFilters }}
      >
        <FiSliders className="mr-2" /> Apply Filters
      </Button>
    </aside>
  );
};

export default Filters;
