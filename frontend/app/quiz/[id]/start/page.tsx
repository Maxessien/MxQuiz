import PublicAppLayout from "@/src/components/layouts/PublicAppLayout";
import QuizQuestions from "@/src/components/quiz-questions";
import { getQuizQuestions } from "@/src/utils/fetchers";
import { notFound } from "next/navigation";


const QuizQuestionPage = async({params}: {params: Promise<{id: string}>}) => {
  const par = await params
  const questions = await getQuizQuestions("public", par.id)

  if (!questions) return notFound()
  
  return (
    <PublicAppLayout>
      <QuizQuestions quizId={par.id} token={questions.attempt_token} q={questions.questions.map((q)=> ({...q, is_answered: false, answer: null}))} />
    </PublicAppLayout>
  );
};

export default QuizQuestionPage;
