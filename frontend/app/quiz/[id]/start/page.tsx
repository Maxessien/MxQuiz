import PublicAppLayout from "@/src/components/layouts/PublicAppLayout";
import { QuizMode } from "@/src/components/quiz-info/StartQuizAction";
import QuizQuestions from "@/src/components/quiz-questions";
import { getQuizQuestions } from "@/src/utils/fetchers";
import { SESSION_COOKIE_NAME } from "@/src/utils/regUtils";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

const QuizQuestionPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode: QuizMode; strict?: string }>;
}) => {
  const par = await params;
  const sPar = await searchParams;
  
  const modes: QuizMode[] = ["exam", "test"]

  if (!sPar.mode || !modes.includes(sPar.mode)) redirect(`/quiz/${par.id}/start?mode=exam`)

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);

  const includeAnswers = sPar.mode === "test";

  const questions = await getQuizQuestions("public", par.id, token?.value, {
    val: includeAnswers,
    apiKey: process.env.INTERNAL_API_KEY || "",
  });

  if (!questions) return notFound();

  console.log(questions)

  return (
    <PublicAppLayout>
      <QuizQuestions
        quizId={par.id}
        token={questions.attempt_token}
        q={questions.questions?.map((q) => ({
          ...q,
          is_answered: false,
          userAnswer: null
        }))}
        mode={sPar.mode}
        enforceTimeLimit={sPar.strict ? true : false}
      />
    </PublicAppLayout>
  );
};

export default QuizQuestionPage;
