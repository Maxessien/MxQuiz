"use client";

import Link from "next/link";

interface TryProps {
  recentAttempts: {
    attempt_id: string;
    quiz_id: string;
    score: number;
    created_at: string;
    quiz_title: string;
  }[];
  userId: string;
}

const RecentAttempts = ({ recentAttempts, userId }: TryProps) => {
  return (
    <div className="bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-xl overflow-hidden flex flex-col w-full h-full">
      <div className="p-6 border-b border-(--main-tertiary-light) flex justify-between items-center">
        <h2 className="text-xl font-bold text-(--text-primary-light)">Recent Taken</h2>
        <Link href={`/${userId}/attempts`} className="text-sm text-(--main-primary-light) hover:underline">
          View all
        </Link>
      </div>
      
      {recentAttempts.length > 0 ? (
        <div className="flex flex-col">
          {recentAttempts.map((attempt) => (
            <Link 
              key={attempt.attempt_id} 
              href={`/${userId}/attempts/${attempt.attempt_id}`}
              className="px-6 py-4 border-b border-(--main-tertiary-light) last:border-0 hover:bg-(--main-tertiary-light)/50 transition-colors flex justify-between items-center"
            >
              <div className="flex flex-col">
                <h3 className="font-semibold text-(--text-primary-light) line-clamp-1">{attempt.quiz_title}</h3>
                <span className="text-xs text-(--text-secondary) mt-1">
                  {new Date(attempt.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center">
                <span className={`font-bold ${attempt.score >= 50 ? 'text-[#10b981]' : 'text-(--text-errors)'}`}>
                  {attempt.score}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-10 flex flex-col items-center justify-center text-center">
          <p className="text-(--text-secondary)">No recent attempts found.</p>
          <Link href="/quiz" className="mt-4 text-(--main-primary-light) hover:underline text-sm">
            Find some quizzes to take
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentAttempts;