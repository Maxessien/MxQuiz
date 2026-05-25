"use client";

import Link from "next/link";
import { FaUserFriends, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface QuizProps {
  recentQuizzes: {
    quiz_id: string;
    title: string;
    created_at: string;
    status: string;
    visibility: string;
    attempts_count: number;
  }[];
  userId: string;
}

const RecentQuizzes = ({ recentQuizzes, userId }: QuizProps) => {
  return (
    <div className="bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-xl overflow-hidden flex flex-col w-full h-full">
      <div className="p-6 border-b border-(--main-tertiary-light) flex justify-between items-center">
        <h2 className="text-xl font-bold text-(--text-primary-light)">My Recent Quizzes</h2>
        <Link href={`/${userId}/quiz`} className="text-sm text-(--main-primary-light) hover:underline">
          View all
        </Link>
      </div>
      
      {recentQuizzes.length > 0 ? (
        <div className="flex flex-col">
          {recentQuizzes.map((quiz) => (
            <div 
              key={quiz.quiz_id} 
              className="px-6 py-4 border-b border-(--main-tertiary-light) last:border-0 hover:bg-(--main-tertiary-light)/50 transition-colors flex justify-between items-center"
            >
              <div className="flex flex-col max-w-[60%]">
                <Link href={`/quiz/${quiz.quiz_id}`} className="font-semibold text-(--text-primary-light) line-clamp-1 hover:text-(--main-primary-light) transition-colors">
                  {quiz.title}
                </Link>
                <div className="flex items-center gap-3 mt-2 text-xs text-(--text-secondary)">
                  <span>{new Date(quiz.created_at).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1">
                    {quiz.visibility === 'public' ? (
                      <><FaRegEye className="text-(--text-secondary-light)"/> Public</>
                    ) : (
                      <><FaRegEyeSlash className="text-(--text-secondary-light)"/> Private</>
                    )}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-sm font-medium bg-(--main-tertiary-light) px-3 py-1.5 rounded-lg text-(--text-primary-light)">
                  <FaUserFriends className="text-(--main-primary-light)" />
                  {quiz.attempts_count}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 flex flex-col items-center justify-center text-center">
          <p className="text-(--text-secondary)">You haven&apos;t created any quizzes yet.</p>
          <Link href={`/${userId}/create`} className="mt-4 text-(--main-primary-light) hover:underline text-sm gap-1 flex items-center">
            <span>+</span> Create a Quiz
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentQuizzes;