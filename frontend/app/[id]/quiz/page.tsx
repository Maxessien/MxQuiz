import { QuizSearchParams } from "@/app/quiz/page";
import UserQuizzes from "@/src/components/user-quizzes/UserQuizzes";
import { getQuizzes, QuizFilterType } from "@/src/utils/fetchers";
import { SESSION_COOKIE_NAME } from "@/src/utils/regUtils";
import { cookies } from "next/headers";

const UserQuizzesPage = async({params, searchParams}: {params: Promise<{id: string}>, searchParams: Promise<QuizSearchParams>}) => {
  const { id } = await params;
  const { order, search, sort, type, page } = await searchParams;
  
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);
  
  const limit = 20;
  const quizzes = await getQuizzes(
    sort,
    order,
    search,
    type?.split("_") as QuizFilterType[],
    page ? Number(page) : undefined,
    limit,
    token?.value
  );
  const totalPages = Math.ceil((quizzes?.[0]?.total_rows || 0) / limit);
  
  return (
    <UserQuizzes 
      quizzes={quizzes || []} 
      page={page ? Number(page) : 1} 
      totalPages={totalPages} 
      userId={id} 
    />
  )
}

export default UserQuizzesPage