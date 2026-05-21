"use client";

import { submitQuiz } from "@/src/utils/fetchers";
import { formatTime } from "@/src/utils/regUtils";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaFlag, FaRegClock } from "react-icons/fa";
import { QuizQuestionsMod } from "../../../types/types";
import QuestionDisplay from "./QuestionDisplay";
import QuizNav from "./QuizNav";
import { toast } from "react-toastify";


const QuizQuestions = ({
  q,
  token,
  quizId,
}: {
  q: QuizQuestionsMod[];
  token: string;
  quizId: string;
}) => {
  const [questions, setQuestions] = useState<QuizQuestionsMod[]>(q);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState((q[0]?.time_limit || 0) * 60);

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

  const {mutateAsync, isPending} = useMutation({
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
    onError: ()=> toast.error("Failed to submit, try again later")
  });
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
