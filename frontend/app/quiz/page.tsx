import PublicAppLayout from "@/src/components/layouts/PublicAppLayout";
import Quizzes from "@/src/components/quizzes-page";
import {
  getQuizzes,
  QuizFilterType,
  QuizSortBy,
  QuizSortOrder,
} from "@/src/utils/fetchers";

export interface QuizSearchParams {
    sort?: QuizSortBy;
    order?: QuizSortOrder;
    type?: string;
    search?: string;
    page?: number;
  }

const QuizzesPage = async ({
  searchParams,
}: {
  searchParams: Promise<QuizSearchParams>;
}) => {
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
    <PublicAppLayout>
      <div className="flex flex-col items-center w-full min-h-screen text-(--text-primary) font-sans pb-24 lg:pb-12">
        <Quizzes page={page} quizzes={quizzes} totalPages={totalPages} />
      </div>
    </PublicAppLayout>
  );
};

export default QuizzesPage;
