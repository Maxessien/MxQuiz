import { FiSearch, FiSliders } from "react-icons/fi";
import Button from "../reusable/Button";

const HeaderAndSearch = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="flex flex-col max-w-2xl">
          <h1 className="text-4xl font-extrabold text-(--text-primary-light) mb-3 flex items-center gap-3">
            <span className="text-(--main-primary-light)">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </span>
            Available Quizzes
          </h1>
          <p className="text-(--text-secondary) text-lg">
            Explore thousands of quizzes created by students, lecturers, and AI.
            Find the perfect quiz to test your knowledge.
          </p>
        </div>

        {/* Create Quiz CTA - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:flex flex-col bg-(--main-tertiary) border border-(--main-tertiary-light) p-5 rounded-2xl w-80 shrink-0">
          <h3 className="text-sm font-bold text-(--text-primary-light) mb-1">Create Your Own Quiz</h3>
          <p className="text-xs text-(--text-secondary) mb-4">
            Upload your lecture notes, PDFs or audio and get a custom quiz in seconds.
          </p>
          <Button size="small" color="primary" className="w-max">
            Generate Quiz ✨
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full items-center">
        <div className="relative w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary) text-lg" />
          <input
            type="text"
            placeholder="Search quizzes by title, description or creator..."
            className="w-full bg-(--main-tertiary) border border-(--main-tertiary-light) focus:border-(--main-primary-light) text-(--text-primary-light) rounded-full py-3 pl-12 pr-6 outline-none transition-colors placeholder:text-(--text-secondary-light)"
          />
        </div>
        <button className="lg:hidden flex shrink-0 items-center justify-center bg-(--main-tertiary) border border-(--main-tertiary-light) w-12 h-12 rounded-xl text-(--text-primary-light)">
          <FiSliders />
        </button>
      </div>
    </div>
  );
};

export default HeaderAndSearch;