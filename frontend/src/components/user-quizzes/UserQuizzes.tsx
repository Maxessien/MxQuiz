"use client";

import { QuizCardProps } from "@/types/componentTypes";
import QuizCard from "../quizzes-page/QuizCard";
import QuizPagination from "../quizzes-page/QuizPagination";
import UserQuizzesFilters from "./UserQuizzesFilters";
import UserQuizzesHeader from "./UserQuizzesHeader";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/src/utils/api";
import { useAppSelector } from "@/store";
import { toast } from "react-toastify";
import { useState } from "react";

const UserQuizzes = ({
  quizzes,
  page,
  totalPages,
  userId,
}: {
  quizzes: QuizCardProps[];
  page?: number;
  totalPages: number;
  userId: string;
}) => {
    const {idToken} = useAppSelector(state=> state.user)

    const [available, setAvailable] = useState(quizzes)

    const {mutateAsync, isPending} = useMutation({
        mutationFn: async(id: string)=>{
            await authApi(idToken).delete(`/quiz/${id}`)
            return id
        },
        onError: ()=> toast.error("Failed to delete quiz, try again later"),
        onSuccess: (id)=> {
            toast.success("Quiz deleted")
            setAvailable(state => state.filter(({quiz_id})=> quiz_id !== id))
        }
    })

  return (
    <div className="w-full flex flex-col gap-8 lg:gap-10">
      <UserQuizzesHeader id={userId} />

      <div className="flex flex-col gap-6 w-full">
        <UserQuizzesFilters id={userId} />

        {/* Quizzes Grid */}
        {quizzes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-2">
            {available.map((quiz) => (
              <div className="space-y-2" key={quiz.quiz_id}>
                <QuizCard {...quiz} />
                <button onClick={()=> mutateAsync(quiz.quiz_id)} disabled={isPending} className="flex justify-center disabled:opacity-65 bg-red-600 rounded-md px-3 py-2 w-full items-center gap-2">
                  <FaTrash /> <span>{isPending ? "Deleting..." : "Delete"}</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-2xl w-full">
            <div className="w-20 h-20 bg-(--main-tertiary-light) rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-(--text-secondary)"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <p className="text-xl text-(--text-primary-light) font-semibold">
              No Quizzes Found
            </p>
            <p className="text-(--text-secondary) mt-2 max-w-sm text-center">
              You haven&apos;t created any quizzes that match the current
              filters.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-4">
            <QuizPagination
              currentPage={page ? Number(page) : 1}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuizzes;
