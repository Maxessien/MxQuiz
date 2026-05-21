import { FaChartPie, FaLayerGroup, FaRegClock, FaRegFileAlt, FaStar, FaUserFriends } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { QuizDetailsResponse } from "@/src/utils/fetchers";
import Button from "../reusable/Button";

interface Props {
  details: QuizDetailsResponse;
}

const QuizHeader = ({ details }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-between items-start bg-(--main-tertiary)/30 p-6 lg:p-8 rounded-3xl border border-(--main-tertiary-light)">
      
      {/* Left side details */}
      <div className="flex flex-col gap-4 flex-1 w-full lg:max-w-2xl">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-bold shrink-0">
            {details.title.substring(0, 1).toUpperCase()}
          </div>
          
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-(--text-primary-light) leading-tight">
              {details.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm text-(--text-secondary)">
              <span className="flex items-center gap-1.5">
                By {details.author_name} <VscVerifiedFilled className="text-blue-500 text-base" />
              </span>
              <Button size="small" color="tertiary" className="py-1! px-3! text-xs! rounded-md!">
                Follow
              </Button>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold text-(--text-primary-light)">
                  {details.average_rating ? details.average_rating.toFixed(1) : "0.0"}
                </span>
                <span className="text-(--text-secondary-light)">({details.attempts_count})</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-(--text-secondary) mt-2 text-sm sm:text-base leading-relaxed hidden lg:block">
          {details.description.split('\n')[0]} {/* Preview of desc */}
        </p>
      </div>

      {/* Right side stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8 w-full lg:w-auto bg-(--main-tertiary) lg:bg-transparent p-5 lg:p-0 rounded-2xl border lg:border-none border-(--main-tertiary-light)">
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <FaRegFileAlt className="text-(--text-secondary) text-lg mb-1" />
          <span className="text-xs text-(--text-secondary-light)">Questions</span>
          <span className="text-lg font-bold text-(--text-primary-light)">{details.question_count}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <FaRegClock className="text-(--text-secondary) text-lg mb-1" />
          <span className="text-xs text-(--text-secondary-light)">Time</span>
          <span className="text-lg font-bold text-(--text-primary-light)">
            {details.time_limit ? `${details.time_limit} min` : 'N/A'}
          </span>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <FaUserFriends className="text-(--text-secondary) text-lg mb-1" />
          <span className="text-xs text-(--text-secondary-light)">Attempts</span>
          <span className="text-lg font-bold text-(--text-primary-light)">
            {details.attempts_count > 999 
              ? `${(details.attempts_count / 1000).toFixed(1)}K` 
              : details.attempts_count}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <FaChartPie className="text-(--text-secondary) text-lg mb-1" />
          <span className="text-xs text-(--text-secondary-light)">Avg. Score</span>
          <span className="text-lg font-bold text-(--text-primary-light)">
            {details.avg_score ? details.avg_score.toFixed(0) : "0"}%
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 text-center sm:col-span-2 lg:col-span-1">
          <FaLayerGroup className="text-(--text-secondary) text-lg mb-1" />
          <span className="text-xs text-(--text-secondary-light)">Type</span>
          <span className="text-lg font-bold text-(--text-primary-light) capitalize">
            Mixed
          </span>
        </div>
      </div>

    </div>
  );
};

export default QuizHeader;