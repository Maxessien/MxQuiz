"use client";

import { QuestionResult } from "@/types/types";
import React from "react";
import ResultPerformanceMetrics from "./ResultPerformanceMetrics";
import ResultQuestionReview from "./ResultQuestionReview";

interface ResultProps {
  score: number;
  results: QuestionResult[];
  onRetake?: () => void;
  onBack?: () => void;
}

const Result: React.FC<ResultProps> = ({ score, results, onRetake, onBack }) => {
  const correct = results.filter(
    (q) => q.userAnswer && q.userAnswer === q.answer
  ).length;
  const skipped = results.filter(
    (q) => !q.userAnswer || q.userAnswer.trim() === ""
  ).length;
  const incorrect = results.length - correct - skipped;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Metrics Section */}
      <ResultPerformanceMetrics
        score={score}
        correct={correct}
        incorrect={incorrect}
        skipped={skipped}
        total={results.length}
      />

      {/* Questions Review Section */}
      <ResultQuestionReview results={results} />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-800 gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Dashboard</span>
          </button>
        )}
        
        {onRetake && (
          <button
            onClick={onRetake}
            className="px-6 py-2.5 flex items-center space-x-2 rounded-lg border border-gray-700 hover:bg-gray-800 text-white font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Retake Quiz</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Result;
