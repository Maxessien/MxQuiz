"use client";

import { useEffect, useState } from "react";
import { QuizQuestionsMod } from "../../../types/types";
import QuestionDisplay from "./QuestionDisplay";
import QuizNav from "./QuizNav";


const QuizQuestions = ({q}: {q: QuizQuestionsMod[]}) => {
  const [questions, setQuestions] = useState<QuizQuestionsMod[]>(q);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState((q[0]?.time_limit || 0) * 60);

  // Example timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelectOption = (optionId: string | number) => {
    setQuestions(prev => {
      const newArr = [...prev];
      newArr[currentIdx] = {
        ...newArr[currentIdx],
        is_answered: true,
        answer: String(optionId)
      };
      return newArr;
    });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) setCurrentIdx(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(prev => prev - 1);
  };

  const handleSubmit = () => {
    alert("Quiz sumbitted! Handling results logic...");
  };

  if (!questions.length) return null;

  return (
    <div className="w-full min-h-screen bg-(--main-secondary-light) text-(--text-primary) font-sans">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-(--text-secondary) mb-8">
          <span className="hover:text-(--text-primary-light) cursor-pointer">Quizzes</span>
          <span className="text-(--text-secondary-light)">&gt;</span>
          <span className="text-(--main-primary-light)">{questions[0].title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          
          <QuizNav 
             quizzes={questions}
             currentNumber={currentIdx}
             gotoNumber={(num) => setCurrentIdx(num)}
          />

          <QuestionDisplay 
            quiz={questions[currentIdx]}
            timeRemaining={timeLeft}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentIdx === 0}
            isLast={currentIdx === questions.length - 1}
            onSubmit={handleSubmit}
          />

        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;