import PublicAppLayout from "@/src/components/layouts/PublicAppLayout";
import Filters from "@/src/components/quizzes-page/Filters";
import HeaderAndSearch from "@/src/components/quizzes-page/HeaderAndSearch";
import QuizCard from "@/src/components/quizzes-page/QuizCard";
import TopFilters from "@/src/components/quizzes-page/TopFilters";
import { QuizCardProps } from "@/types/componentTypes";

const mockQuizzes: QuizCardProps[] = [
  {
    quiz_id: "1",
    title: "Data Structures Practice Test",
    description:
      "Test your knowledge on common data structures like trees, graphs, and hash tables.",
    author: { user_id: "u1", name: "David Okeke" },
    is_ai_generated: false,
    time_limit: 45,
    question_count: 40,
    average_rating: 4.6,
    attempts_count: 12400,
    created_at: new Date().toISOString(),
  },
  {
    quiz_id: "2",
    title: "Calculus I Midterm Prep",
    author: { user_id: "u2", name: "Prof. A. Ibrahim" },
    is_ai_generated: false,
    time_limit: 35,
    question_count: 30,
    average_rating: 4.8,
    attempts_count: 8700,
    created_at: new Date().toISOString(),
  },
  {
    quiz_id: "3",
    title: "Introduction to Operating Systems",
    author: { user_id: "ai1", name: "AI Assistant" },
    is_ai_generated: true,
    time_limit: 40,
    question_count: 35,
    average_rating: 4.5,
    attempts_count: 3200,
    created_at: new Date().toISOString(),
  },
  {
    quiz_id: "4",
    title: "Mechanics Problem Set",
    author: { user_id: "u3", name: "Sarah Johnson" },
    is_ai_generated: false,
    time_limit: 30,
    question_count: 25,
    average_rating: 4.4,
    attempts_count: 6100,
    created_at: new Date().toISOString(),
  },
  {
    quiz_id: "5",
    title: "General Chemistry",
    author: { user_id: "u4", name: "Dr. M. Yusuf" },
    is_ai_generated: false,
    time_limit: 60,
    question_count: 50,
    average_rating: 4.7,
    attempts_count: 9300,
    created_at: new Date().toISOString(),
  },
  {
    quiz_id: "6",
    title: "Photosynthesis & Plant Processes",
    author: { user_id: "ai1", name: "AI Assistant" },
    is_ai_generated: true,
    time_limit: 25,
    question_count: 28,
    average_rating: 4.3,
    attempts_count: 2100,
    created_at: new Date().toISOString(),
  },
];

const QuizzesPage = () => {
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
                {mockQuizzes.map((quiz) => (
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
