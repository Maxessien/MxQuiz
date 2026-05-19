import PublicAppLayout from "@/src/components/layouts/PublicAppLayout";
import Filters from "@/src/components/quizzes-page/Filters";
import HeaderAndSearch from "@/src/components/quizzes-page/HeaderAndSearch";
import QuizCard from "@/src/components/quizzes-page/QuizCard";
import TopFilters from "@/src/components/quizzes-page/TopFilters";
import { getQuizzes, QuizFilterType, QuizSortBy, QuizSortOrder } from "@/src/utils/fetchers";
import { QuizType } from "@/types/types";

const QuizzesPage = async ({searchParams}: {
  searchParams: Promise<{
    sort?: QuizSortBy;
    order?: QuizSortOrder;
    type?: string;
    search?: string;
  }>;
}) => {
  const {order, search, sort, type} = await searchParams
  const quizzes = await getQuizzes(sort, order, search, type?.split("_") as QuizFilterType[]);

  return (
    <PublicAppLayout>
      <div className="flex flex-col items-center w-full min-h-screen text-(--text-primary) font-sans pb-24 lg:pb-12">
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-12 py-10 flex flex-col gap-10 lg:gap-14">
          {/* Header Section */}
          <HeaderAndSearch />

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
            {/* Sidebar Filters */}
            <Filters />

            {/* Quizzes List & Top Filters */}
            <div className="flex-1 w-full min-w-0 flex flex-col">
              <TopFilters />

              <p className="text-sm text-(--text-secondary) mb-5">
                1,235 quizzes found
              </p>

              {/* Quizzes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
                {quizzes.map((quiz) => (
                  <QuizCard key={quiz.quiz_id} {...quiz} />
                ))}
              </div>

              {/* Pagination / View More Mock */}
              <div className="flex items-center justify-center gap-2 mt-12 w-full">
                <button className="w-8 h-8 rounded bg-(--main-tertiary) text-(--text-secondary) flex items-center justify-center border border-(--main-tertiary-light) hover:text-white">
                  &lt;
                </button>
                <button className="w-8 h-8 rounded bg-(--main-primary) text-white flex items-center justify-center">
                  1
                </button>
                <button className="w-8 h-8 rounded bg-(--main-tertiary) text-(--text-secondary) flex items-center justify-center border border-(--main-tertiary-light) hover:text-white">
                  2
                </button>
                <button className="w-8 h-8 rounded bg-(--main-tertiary) text-(--text-secondary) flex items-center justify-center border border-(--main-tertiary-light) hover:text-white">
                  3
                </button>
                <span className="text-(--text-secondary)">...</span>
                <button className="w-8 h-8 rounded bg-(--main-tertiary) text-(--text-secondary) flex items-center justify-center border border-(--main-tertiary-light) hover:text-white">
                  25
                </button>
                <button className="w-8 h-8 rounded bg-(--main-tertiary) text-(--text-secondary) flex items-center justify-center border border-(--main-tertiary-light) hover:text-white">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicAppLayout>
  );
};

export default QuizzesPage;
