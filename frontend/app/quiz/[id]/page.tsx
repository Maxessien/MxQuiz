import PublicAppLayout from "@/src/components/layouts/PublicAppLayout";
import QuizInfo from "@/src/components/quiz-info/QuizInfo";
import { getQuizDetails } from "@/src/utils/fetchers";
import { notFound } from "next/navigation";

const QuizDetailsPage = async({params}: {params: Promise<{id: string}>}) => {
  const details = await getQuizDetails("public", (await params).id);

  if(!details) return notFound()

  console.log(details)

  return (
    <PublicAppLayout>
      <QuizInfo details={details} />
    </PublicAppLayout>
  );
};

export default QuizDetailsPage;
