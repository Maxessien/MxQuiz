"use client";

import { QuestionResult } from "@/types/types";
import React, { useState } from "react";

type FilterType = "all" | "correct" | "incorrect" | "skipped";

interface ResultQuestionReviewProps {
  results: QuestionResult[];
}

const ResultQuestionReview: React.FC<ResultQuestionReviewProps> = ({
  results,
}) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStatus = (q: QuestionResult) => {
    if (!q.userAnswer || q.userAnswer.trim() === "") return "skipped";
    if (q.userAnswer === q.answer) return "correct";
    return "incorrect";
  };

  const filteredResults = results.filter((q) => {
    if (filter === "all") return true;
    return getStatus(q) === filter;
  });

  const correctCount = results.filter((q) => getStatus(q) === "correct").length;
  const incorrectCount = results.filter((q) => getStatus(q) === "incorrect").length;
  const skippedCount = results.filter((q) => getStatus(q) === "skipped").length;

  return (
    <div className="bg-[#1C1E26] rounded-xl border border-gray-800 p-6">
      <h3 className="text-xl font-bold text-white mb-6">Question Review</h3>

      <div className="flex space-x-2 mb-6 border-b border-gray-800 pb-2">
        <FilterButton
          label={`All (${results.length})`}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterButton
          label={`Correct (${correctCount})`}
          active={filter === "correct"}
          onClick={() => setFilter("correct")}
        />
        <FilterButton
          label={`Incorrect (${incorrectCount})`}
          active={filter === "incorrect"}
          onClick={() => setFilter("incorrect")}
        />
        <FilterButton
          label={`Skipped (${skippedCount})`}
          active={filter === "skipped"}
          onClick={() => setFilter("skipped")}
        />
      </div>

      <div className="space-y-4">
        {filteredResults.map((q, index) => {
          const status = getStatus(q);
          const isExpanded = expandedId === q.question_id;

          return (
            <div
              key={q.question_id}
              className="border border-gray-800 rounded-lg bg-[#14151C] overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-800/50 transition-colors"
                onClick={() =>
                  setExpandedId(isExpanded ? null : q.question_id)
                }
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-300">
                    Q{index + 1}
                  </div>
                  <p className="text-white text-sm md:text-base font-medium">
                    {q.question_text}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-sm font-medium capitalize ${
                      status === "correct"
                        ? "text-green-500"
                        : status === "incorrect"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {status}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 border-t border-gray-800 bg-[#1A1C23]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">
                        Your Answer
                      </span>
                      <div
                        className={`p-3 rounded border ${
                          status === "correct"
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : status === "skipped"
                            ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                            : "bg-red-500/10 border-red-500/30 text-red-400"
                        }`}
                      >
                        {status === "skipped" ? "Skipped" : q.userAnswer}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">
                        Correct Answer
                      </span>
                      <div className="p-3 rounded border bg-green-500/10 border-green-500/30 text-green-400">
                        {q.answer}
                      </div>
                    </div>
                  </div>

                  {q.explanation && (
                    <div className="mt-4">
                      <span className="text-xs font-semibold text-indigo-400 mb-1 block">
                        Explanation
                      </span>
                      <p className="text-sm text-gray-300 bg-[#16181E] p-3 rounded border border-gray-800">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredResults.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No questions found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

const FilterButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
      active
        ? "bg-indigo-600 text-white"
        : "text-gray-400 hover:text-white hover:bg-gray-800"
    }`}
  >
    {label}
  </button>
);

export default ResultQuestionReview;
