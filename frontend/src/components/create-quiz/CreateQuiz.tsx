"use client"

import { useState } from "react";
import GenQuizWithAi from "./GenQuizWithAi";
import QuizManualForm from "./QuizManualForm";
import { CreateQuizManualForm } from "@/types/types";

const CreateQuiz = () => {
  const [tab] = useState<"ai" | "manual">("ai");
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
  return tab === "ai" ? (
    <GenQuizWithAi
      switchTab={(data) =>
        setInitForm({ ...data.quizInfo, questions: data.questions })
      }
    />
  ) : (
    <QuizManualForm initForm={initForm} />
  );
};

export default CreateQuiz;
