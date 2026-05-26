"use client";

import { submitQuiz } from "@/src/utils/fetchers";
import { formatTime } from "@/src/utils/regUtils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { FaFlag, FaRegClock } from "react-icons/fa";
import { toast } from "react-toastify";
import { QuestionResult, QuizQuestionsMod } from "../../../types/types";
import QuestionDisplay from "./QuestionDisplay";
import QuizNav from "./QuizNav";
import Result from "./Result";
import { QuizMode } from "../quiz-info/StartQuizAction";

const QuizQuestions = ({
  q,
  token,
  quizId,
}: {
  q: QuizQuestionsMod[];
  token: string;
  quizId: string;
  mode: QuizMode
  enforceTimeLimit: boolean
}) => {
  // Use cache quiz state
  const hasCache = localStorage.getItem(quizId);
  const cache: {
    questions: QuizQuestionsMod[];
    token: string;
    quizId: string;
    timeLeft: number;
  } = hasCache ? JSON.parse(hasCache) : null;

  const [questions, setQuestions] = useState<QuizQuestionsMod[]>(
    cache ? cache.questions : q,
  );
  const [submitted, setSubmitted] = useState<{
    isSubmitted: boolean;
    result: { score: number; val: QuestionResult[] };
  }>({ isSubmitted: false, result: { score: 0, val: [] } });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    cache ? cache.timeLeft : (q[0]?.time_limit || 0) * 60,
  );

  // Example timer logic
  useEffect(() => {
    
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelectOption = (optionId: string | number) => {
    setQuestions((prev) => {
      const newArr = [...prev];
      newArr[currentIdx] = {
        ...newArr[currentIdx],
        is_answered: true,
        answer: String(optionId),
      };
      return newArr;
    });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) setCurrentIdx((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      submitQuiz(
        questions.map(({ answer, question_id }) => ({
          answer_id: answer || "",
          question_id,
        })),
        quizId,
        token,
      ),
    retry: 3,
    onError: () => {
      // Cache quiz attempt for future retries
      localStorage.setItem(
        quizId,
        JSON.stringify({ questions, quizId, token, timeLeft }),
      );
      toast.error("Failed to submit, try again later");
    },

    onSuccess: (data) => {
      // Remove cache when successfully submitted
      localStorage.removeItem(quizId);

      setSubmitted({
        isSubmitted: true,
        result: { score: data.score, val: data.result },
      });
    },
  });

  const router = useRouter();

  if (submitted.isSubmitted)
    return (
      <Result
        onBack={() => {
          router.back()
        }}
        onRetake={() => {
          router.push(`/quiz/${quizId}`)
        }}
        results={submitted.result.val}
        score={submitted.result.score}
      />
    );

  if (!questions.length) return null;

  return (
    <div className="w-full bg-(--main-secondary-light) text-(--text-primary) font-sans">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4">
        {/* Quiz Top Action row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-(--text-primary-light) flex-1 line-clamp-1">
            {questions[currentIdx].title || "Quiz"}
          </h2>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-full text-(--main-primary-light) font-bold font-mono">
              <FaRegClock /> {formatTime(timeLeft)}
            </div>
            <button className="flex items-center justify-center p-2.5 rounded-full bg-(--main-tertiary) border border-(--main-tertiary-light) text-(--text-secondary) hover:text-red-400 transition-colors">
              <FaFlag />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          <QuizNav
            quizzes={questions}
            currentNumber={currentIdx}
            gotoNumber={(num) => setCurrentIdx(num)}
          />

          <QuestionDisplay
            quiz={questions[currentIdx]}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentIdx === 0}
            isLast={currentIdx === questions.length - 1}
            onSubmit={mutateAsync}
            isSubmitting={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;
