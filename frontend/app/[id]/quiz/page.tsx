import { QuizSearchParams } from "@/app/quiz/page";
import { getQuizzes, QuizFilterType } from "@/src/utils/fetchers";


const UserQuizzesPage = async({searchParams}: {searchParams: Promise<QuizSearchParams>}) => {
  const { order, search, sort, type, page } = await searchParams;
  const limit = 20;
  const quizzes = await getQuizzes(
    sort,
    order,
    search,
    type?.split("_") as QuizFilterType[],
    page ? Number(page) : undefined,
    limit,
  );
  const totalPages = Math.ceil((quizzes?.[0]?.total_rows || 0) / limit);
  
  return (
    <div>UserQuizzesPage</div>
  )
}

export default UserQuizzesPage