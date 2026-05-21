import React from "react";

interface ResultPerformanceMetricsProps {
  score: number; // percentage
  correct: number;
  incorrect: number;
  skipped: number;
  total: number;
}

const ResultPerformanceMetrics: React.FC<ResultPerformanceMetricsProps> = ({
  score,
  correct,
  incorrect,
  skipped,
  total,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {/* Score Card */}
      <div className="bg-[#1C1E26] rounded-xl p-6 flex items-center justify-between border border-gray-800">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="absolute inset-0 w-32 h-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="rgb(55, 65, 81)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="rgb(34, 197, 94)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="text-center z-10 flex flex-col justify-center bg-[#1C1E26] rounded-full w-24 h-24">
            <span className="text-2xl font-bold text-white">{Math.round(score)}%</span>
            <span className="text-xs text-gray-400">Your Score</span>
          </div>
        </div>
        <div className="text-left ml-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center">
            Excellent Performance <span className="ml-2">✨</span>
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            You completed the quiz successfully.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1C1E26] rounded-xl p-4 flex flex-col items-center justify-center border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
              ✓
            </div>
            <span className="text-3xl font-bold text-white">{correct}</span>
          </div>
          <span className="text-xs text-gray-400 mt-2">Correct</span>
        </div>

        <div className="bg-[#1C1E26] rounded-xl p-4 flex flex-col items-center justify-center border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
              ✕
            </div>
            <span className="text-3xl font-bold text-white">{incorrect}</span>
          </div>
          <span className="text-xs text-gray-400 mt-2">Incorrect</span>
        </div>

        <div className="bg-[#1C1E26] rounded-xl p-4 flex flex-col items-center justify-center border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
              -
            </div>
            <span className="text-3xl font-bold text-white">{skipped}</span>
          </div>
          <span className="text-xs text-gray-400 mt-2">Skipped</span>
        </div>

        <div className="bg-[#1C1E26] rounded-xl p-4 flex flex-col items-center justify-center border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4zm0 6a2 2 0 100 4h12a2 2 0 100-4H4zm0 6a2 2 0 100 4h12a2 2 0 100-4H4z" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">{total}</span>
          </div>
          <span className="text-xs text-gray-400 mt-2">Total Questions</span>
        </div>
      </div>
    </div>
  );
};

export default ResultPerformanceMetrics;
