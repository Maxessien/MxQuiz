import { BsListUl } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { QuizDetailsProps } from "../../../types/componentTypes";
import Button from "../reusable/Button";

interface Props {
  details: QuizDetailsProps;
}

const StartQuizAction = ({ details }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-(--main-tertiary)/50 border border-(--main-tertiary-light) p-4 sm:p-5 rounded-2xl w-full mt-6">
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 w-full lg:w-auto">
        <div className="flex items-center gap-4 border border-(--main-tertiary-light) bg-(--main-tertiary) p-3 px-5 rounded-xl text-sm font-semibold text-(--text-secondary) shadow-sm w-full sm:w-auto shrink-0 justify-center cursor-pointer hover:text-(--text-primary-light) transition-colors">
          <BsListUl className="text-lg" />
          View Questions
        </div>
      </div>

      <div className="w-full lg:w-auto flex-1 flex justify-end">
         <Button color="primary" width="w-full" className="lg:max-w-md py-3.5 shadow-[0_0_20px_-5px_var(--main-primary)] flex-col gap-0.5 justify-center items-center! h-auto!">
           <div className="flex items-center gap-2 text-base">
             <FaPlay className="text-sm" /> Start Quiz Now
           </div>
           <span className="text-[10px] text-white/70 font-medium tracking-wide">
             {details.time_limit ? `${details.time_limit} min • ` : ''} {details.stats.question_count} questions
           </span>
         </Button>
      </div>

    </div>
  );
};

export default StartQuizAction;