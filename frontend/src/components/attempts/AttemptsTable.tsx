"use client"

import { useAppSelector } from "@/store";
import { UserAttemptResponse } from "@/types/types";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

interface Props {
  attempts: UserAttemptResponse[];
}

const AttemptsTable = ({ attempts }: Props) => {
    const {userId} = useAppSelector(state=> state.user)
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-(--main-tertiary-light) bg-(--main-tertiary) p-1 shadow-sm">
      <table className="w-full text-left border-collapse min-w-150">
        <thead>
          <tr className="border-b border-(--main-tertiary-light) text-(--text-secondary) text-xs">
            <th className="py-4 px-6 font-medium">Quiz Title</th>
            <th className="py-4 px-6 font-medium">Score</th>
            <th className="py-4 px-6 font-medium">Date</th>
            <th className="py-4 px-6 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {attempts.map((attempt) => {
            const percentage =
              attempt.score !== null ? Math.round(attempt.score) : null;

            const dateObj = new Date(attempt.created_at);
            const dateStr = dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const timeStr = dateObj.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <tr
                key={attempt.attempt_id}
                className="border-b border-(--main-tertiary-light)/50 hover:bg-(--main-tertiary-light) transition-colors last:border-b-0"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-(--main-primary)/20 flex shrink-0 items-center justify-center text-(--main-primary-lighter) font-bold text-xl">
                      {attempt.quiz_title.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium line-clamp-3 min-w-30 text-(--text-primary)">
                        {attempt.quiz_title}
                      </p>
                      <p className="text-xs text-(--text-secondary) mt-0.5">
                        {attempt.questions_count} Questions
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {percentage !== null ? (
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 flex shrink-0 items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            fill="transparent"
                            className="text-(--main-tertiary-light)"
                          />
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            fill="transparent"
                            strokeDasharray={88}
                            strokeDashoffset={88 - (88 * percentage) / 100}
                            className={
                              percentage >= 70
                                ? "text-green-500"
                                : percentage >= 50
                                  ? "text-yellow-500"
                                  : "text-red-500"
                            }
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-(--text-primary)">
                          {percentage}%
                        </p>
                        <p className="text-xs text-(--text-secondary) mt-0.5">
                          {attempt.score}/{attempt.questions_count}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 flex shrink-0 items-center justify-center text-(--text-secondary-light)">
                        --
                      </span>
                      <div>
                        <p className="font-medium text-(--text-secondary)">
                          -%
                        </p>
                        <p className="text-xs text-(--text-secondary-light) mt-0.5">
                          -/{attempt.questions_count}
                        </p>
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm min-w-max text-(--text-primary-light)">
                    {dateStr}
                  </p>
                  <p className="text-xs min-w-max text-(--text-secondary) mt-0.5">
                    {timeStr}
                  </p>
                </td>
                <td className="py-4 px-6">
                  <Link href={`/${userId}/attempts/${attempt.attempt_id}`} className="p-2 min-w-max flex items-center justify-end gap-2 hover:text-(--main-primary) hover:underline cursor-pointer transition-colors">
                    <span>
                      <FiEye size={17} />
                    </span>{" "}
                    <span>View Details</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {attempts.length === 0 && (
        <div className="text-center py-12 text-(--text-secondary)">
          No attempts found.
        </div>
      )}
    </div>
  );
};

export default AttemptsTable;
