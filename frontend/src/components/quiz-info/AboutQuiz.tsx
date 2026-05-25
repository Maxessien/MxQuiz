import { QuizDetailsResponse } from "@/src/utils/fetchers";
import { FaFlag, FaGlobe, FaRegCalendarAlt, FaRegCheckCircle, FaRegFileAlt, FaSyncAlt } from "react-icons/fa";

interface Props {
  details: QuizDetailsResponse;
}

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const AboutQuiz = ({ details }: Props) => {
  return (
    <div className="flex flex-col gap-6 bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-2xl p-6 lg:p-8">
      <div className="flex items-center gap-2 text-lg font-bold text-(--text-primary-light) mb-2">
        <FaRegFileAlt className="text-(--main-primary-light)" />
        <h2>About this Quiz</h2>
      </div>

      <div className="text-sm text-(--text-secondary) leading-relaxed whitespace-pre-line">
        {details.description}
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {/* Dynamic bullets based on available DB schema data */}
        <div className="flex items-center gap-3 text-sm text-(--text-secondary)">
          <FaRegCheckCircle className="text-(--main-primary-light)" />
          {details.question_count} carefully crafted questions
        </div>
        {details.is_ai_generated && (
          <div className="flex items-center gap-3 text-sm text-(--text-secondary)">
            <FaRegCheckCircle className="text-(--main-primary-light)" />
            AI Generated content and explanations
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6 pt-6 border-t border-(--main-tertiary-light)">
        <div className="flex gap-3">
          <div className="mt-0.5 text-(--text-secondary-light)"><FaRegCalendarAlt /></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-(--text-secondary-light) font-semibold">Created</span>
            <span className="text-xs text-(--text-primary-light) font-medium">{formatDate(details.created_at)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="mt-0.5 text-(--text-secondary-light)"><FaSyncAlt /></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-(--text-secondary-light) font-semibold">Last Updated</span>
            <span className="text-xs text-(--text-primary-light) font-medium">{formatDate(details.created_at)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="mt-0.5 text-(--text-secondary-light)"><FaGlobe /></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-(--text-secondary-light) font-semibold">Language</span>
            <span className="text-xs text-(--text-primary-light) font-medium">English</span>
          </div>
        </div>

        <div className="flex gap-3 cursor-pointer group">
          <div className="mt-0.5 text-(--text-secondary-light) group-hover:text-red-400 transition-colors"><FaFlag /></div>
          <div className="flexflex-col">
            <span className="text-[10px] uppercase tracking-wider text-(--text-secondary-light) font-semibold group-hover:text-red-400 transition-colors">Report Quiz</span>
            <span className="text-xs text-(--text-secondary) group-hover:text-red-300 transition-colors block">Inappropriate content</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutQuiz;