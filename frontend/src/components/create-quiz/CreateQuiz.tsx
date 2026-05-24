"use client";

import { CreateQuizManualForm } from "@/types/types";
import { useState } from "react";
import { FaPen, FaRobot } from "react-icons/fa";
import GenQuizWithAi from "./GenQuizWithAi";
import QuizManualForm from "./QuizManualForm";

const CreateQuiz = () => {
  const [tab, setTab] = useState<"ai" | "manual">("manual");
  const [initForm, setInitForm] = useState<CreateQuizManualForm>({
    description: "",
    isAiGen: false,
    author: "",
    questions: [],
    status: "published",
    time: 10,
    title: "",
    visibility: "public",
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Centered Dashboard Header block */}
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight text-(--text-primary)">
          Create New Quiz
        </h1>
        <p className="text-sm md:text-base text-(--text-secondary) font-medium">
          Choose between generating an automated quiz using AI parameters or crafting specific questions manually.
        </p>

        {/* Pill-track Layout Navigation Switcher */}
        <div className="w-full max-w-md mx-auto p-1.5 flex gap-1 rounded-xl bg-(--main-tertiary) border border-(--text-secondary-light)/10 shadow-inner">
          <button
            type="button"
            onClick={() => setTab("ai")}
            className={`flex-1 flex items-center justify-center gap-2 font-semibold text-sm md:text-base text-center px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer
              ${tab === "ai"
                ? "bg-(--main-primary) text-(--text-primary-light) shadow-md"
                : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--main-tertiary-light)/50"
              }`}
          >
            <FaRobot className={`text-base ${tab === "ai" ? "text-white" : "text-(--text-secondary-light)"}`} />
            <span>AI Generator</span>
          </button>
          
          <button
            type="button"
            onClick={() => setTab("manual")}
            className={`flex-1 flex items-center justify-center gap-2 font-semibold text-sm md:text-base text-center px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer
              ${tab === "manual"
                ? "bg-(--main-primary) text-(--text-primary-light) shadow-md"
                : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--main-tertiary-light)/50"
              }`}
          >
            <FaPen className={`text-xs ${tab === "manual" ? "text-white" : "text-(--text-secondary-light)"}`} />
            <span>Manual Build</span>
          </button>
        </div>
      </header>

      {/* Primary Dynamic Context Stage Container */}
      <div className="w-full">
        {tab === "ai" ? (
          <GenQuizWithAi
            switchTab={(data) => {
              setInitForm({ ...data.quizInfo, questions: data.questions });
              setTab("manual");
            }}
          />
        ) : (
          <QuizManualForm initForm={initForm} />
        )}
      </div>
    </section>
  );
};

export default CreateQuiz;
