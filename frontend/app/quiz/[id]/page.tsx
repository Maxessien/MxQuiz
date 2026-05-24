import PublicAppLayout from "@/src/components/layouts/PublicAppLayout";
import QuizInfo from "@/src/components/quiz-info/QuizInfo";
import { getQuizDetails } from "@/src/utils/fetchers";
import { SESSION_COOKIE_NAME } from "@/src/utils/regUtils";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const QuizDetailsPage = async({params}: {params: Promise<{id: string}>}) => {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)
  const details = await getQuizDetails("public", (await params).id, token?.value);

  if(!details) return notFound()

  console.log(details)

  return (
    <PublicAppLayout>
      <QuizInfo details={details} />
    </PublicAppLayout>
  );
};

export default QuizDetailsPage;
