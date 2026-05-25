"use client"

import { useRouter } from "nextjs-toploader/app";
import Button from "../reusable/Button";

const UserQuizzesHeader = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold text-(--text-primary-light) mb-2 flex items-center gap-3">
            <span className="text-(--main-primary-light)">
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
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </span>
            My Quizzes
          </h1>
          <p className="text-(--text-secondary) text-lg">
            Manage your created quizzes here.
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
            <Button
              className="py-2.5 px-6 font-semibold"
              attrs={{ onClick: () => router.push(`/${id}/create`) }}
            >
              + Create New Quiz
            </Button>
        </div>
      </div>
    </div>
  );
};

export default UserQuizzesHeader;