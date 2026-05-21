import { QuizDetailsResponse } from "@/src/utils/fetchers";
import { useRouter } from "nextjs-toploader/app";
import { FaPlay } from "react-icons/fa";
import Button from "../reusable/Button";

interface Props {
  details: QuizDetailsResponse;
}

const StartQuizAction = ({ details }: Props) => {
  const router = useRouter()
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-(--main-tertiary)/50 border border-(--main-tertiary-light) p-4 sm:p-5 rounded-2xl w-full mt-6">
      <div className="w-full lg:w-auto flex-1 flex justify-center">
         <Button attrs={{onClick: ()=> router.push(`/quiz/${details.quiz_id}/start`)}} color="primary" width="w-full" className="lg:max-w-md py-3.5 shadow-[0_0_20px_-5px_var(--main-primary)] flex-col gap-0.5 justify-center items-center! h-auto!">
           <div className="flex items-center gap-2 text-base">
             <FaPlay className="text-sm" /> Start Quiz Now
           </div>
           <span className="text-[10px] text-white/70 font-medium tracking-wide">
             {details.time_limit ? `${details.time_limit} min • ` : ''} {details.question_count} questions
           </span>
         </Button>
      </div>

    </div>
  );
};

export default StartQuizAction;