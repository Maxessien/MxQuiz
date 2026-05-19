"use client";
import AboutQuiz from "@/src/components/create-quiz/AboutQuiz";
import CreatorCard from "@/src/components/create-quiz/CreatorCard";
import { mockQuizDetails } from "@/src/components/create-quiz/MockData";
import QuizHeader from "@/src/components/create-quiz/QuizHeader";
import QuizTabs from "@/src/components/create-quiz/QuizTabs";
import ReviewsSection from "@/src/components/create-quiz/ReviewsSection";
import StartQuizAction from "@/src/components/create-quiz/StartQuizAction";
import PublicAppLayout from "@/src/components/layouts/PublicAppLayout";
import { useState } from "react";
import { FaUnlock } from "react-icons/fa";

const QuizDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const details = mockQuizDetails;

  return (
    <PublicAppLayout>
      <div className="flex flex-col items-center w-full min-h-screen bg-(--main-secondary-light) text-(--text-primary) font-sans pb-24">
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-12 flex flex-col gap-8">
          {/* Top Header Grid */}
          <QuizHeader details={details} />

          {/* Action Bar / Save Share (Top section actions on desktop) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-(--main-tertiary-light) pb-0">
            <QuizTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              questionsCount={details.stats.question_count}
              reviewsCount={details.stats.reviews_count}
            />

            {/* Quick acts - Hide on mobile */}
            <div className="hidden lg:flex items-center gap-4 pb-4">
              <button className="flex items-center gap-2 text-sm font-semibold text-(--text-secondary) hover:text-(--text-primary-light) transition-colors px-4 py-2 rounded-lg border border-(--main-tertiary-light) bg-(--main-tertiary)/50">
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
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>{" "}
                Save
              </button>
              <button className="flex items-center gap-2 text-sm font-semibold text-(--text-secondary) hover:text-(--text-primary-light) transition-colors px-4 py-2 rounded-lg border border-(--main-tertiary-light) bg-(--main-tertiary)/50">
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
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                  <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                </svg>{" "}
                Share
              </button>
            </div>
          </div>

          {/* Content Layout */}
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Left Main Content */}
            <div className="flex-2 flex flex-col gap-6 min-w-0">
              {activeTab === "overview" && (
                <>
                  <AboutQuiz details={details} />

                  {/* Cost Box */}
                  <div className="flex items-center gap-4 bg-(--main-tertiary)/30 border border-(--main-tertiary-light) rounded-2xl p-5 w-full">
                    <div className="w-10 h-10 rounded-xl bg-(--main-tertiary) border border-(--main-tertiary-light) flex items-center justify-center text-(--text-secondary)">
                      <FaUnlock />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-(--text-primary-light)">
                        Free to attempt
                      </span>
                      <span className="text-xs text-(--text-secondary)">
                        No registration required to start
                      </span>
                    </div>
                  </div>

                  <StartQuizAction details={details} />

                  <ReviewsSection details={details} />
                </>
              )}

              {activeTab === "questions" && (
                <div className="py-20 text-center text-(--text-secondary)">
                  Questions preview rendering...
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="pt-4">
                  <ReviewsSection details={details} />
                </div>
              )}
              {activeTab === "scores" && (
                <div className="py-20 text-center text-(--text-secondary)">
                  Leaderboard rendering...
                </div>
              )}
              {activeTab === "related" && (
                <div className="py-20 text-center text-(--text-secondary)">
                  Related quizzes rendering...
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="flex-1 flex flex-col gap-6 w-full lg:max-w-xs xl:max-w-sm">
              <CreatorCard details={details} />
              {/* Note: Skipped Tags card per schema availability limitations */}
            </div>
          </div>
        </div>
      </div>
    </PublicAppLayout>
  );
};

export default QuizDetailsPage;
