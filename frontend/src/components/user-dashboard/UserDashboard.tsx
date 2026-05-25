"use client";

import Button from "../reusable/Button";
import DashboardStats from "./DashboardStats";
import RecentAttempts from "./RecentAttempts";
import RecentQuizzes from "./RecentQuizzes";
import { useRouter } from "nextjs-toploader/app";

interface MainProps {
  userId: string;
  data: {
    stats: {
      total_quizzes_created: number;
      total_attempts_taken: number;
      average_score: number;
      total_plays_on_user_quizzes: number;
    };
    recentAttempts: {
      attempt_id: string;
      quiz_id: string;
      score: number;
      created_at: string;
      quiz_title: string;
    }[];
    recentQuizzes: {
      quiz_id: string;
      title: string;
      created_at: string;
      status: string;
      visibility: string;
      attempts_count: number;
    }[];
  };
}

const UserDashboard = ({ userId, data }: MainProps) => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-8 lg:gap-10">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold text-(--text-primary-light) mb-2 flex items-center gap-3">
            <span className="text-(--main-primary-light)">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </span>
            Dashboard
          </h1>
          <p className="text-(--text-secondary) text-lg">
            Welcome back! Here&apos;s an overview of your activity.
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
            <Button
              className="py-2.5 px-6 font-semibold"
              attrs={{ onClick: () => router.push(`/${userId}/create`) }}
            >
              + Create New Quiz
            </Button>
        </div>
      </div>

      {/* Stats row */}
      <DashboardStats stats={data.stats} />

      {/* Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <RecentAttempts recentAttempts={data.recentAttempts} userId={userId} />
        <RecentQuizzes recentQuizzes={data.recentQuizzes} userId={userId} />
      </div>

    </div>
  );
};

export default UserDashboard;