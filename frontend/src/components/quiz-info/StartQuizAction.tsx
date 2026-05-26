import { QuizDetailsResponse } from "@/src/utils/fetchers";
import { useRouter } from "nextjs-toploader/app";
import { FaPlay } from "react-icons/fa";
import Button from "../reusable/Button";
import { useState } from "react";

interface Props {
  details: QuizDetailsResponse;
}

export type QuizMode = "test" | "exam"

const StartQuizAction = ({ details }: Props) => {
  const router = useRouter()

  const [mode, setTestMode] = useState<QuizMode>("exam")
  const [enforceTimeLimit, setEnforceTimeLimit] = useState(true)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-(--main-tertiary)/50 border border-(--main-tertiary-light) p-4 sm:p-5 rounded-2xl w-full mt-6">
      <div className="flex-1 space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider">Quiz Mode</p>
          <div className="flex w-full items-center bg-(--main-tertiary-light) p-1 rounded-xl">
            <button 
              onClick={() => { setTestMode("test"); setEnforceTimeLimit(false); }} 
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === "test" ? "bg-(--main-primary) shadow-md" : "text-(--text-secondary) hover:text-(--text-primary-light)"}`}
            >
              Test
            </button>
            <button 
              onClick={() => { setTestMode("exam"); setEnforceTimeLimit(true); }} 
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === "exam" ? "bg-(--main-primary) shadow-md" : "text-(--text-secondary) hover:text-(--text-primary-light)"}`}
            >
              Exam
            </button>
          </div>
          {mode === "test" && (
            <p className="text-xs text-(--main-primary-lighter) mt-1 flex items-start gap-1.5">
              <span>ℹ</span> 
              <span>Quiz results in test mode will not be recorded.</span>
            </p>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-(--text-primary-light)">Enforce time limit</span>
            <button 
              onClick={() => {
                if (mode === "exam") {
                  setEnforceTimeLimit(!enforceTimeLimit);
                }
              }}
              disabled={mode === "test"}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enforceTimeLimit && mode === "exam" ? "bg-(--main-primary)" : "bg-(--main-tertiary)"} ${mode === "test" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-(--text-primary) transition-transform ${enforceTimeLimit && mode === "exam" ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
          {mode === "test" && (
            <p className="text-xs text-(--text-secondary)">
              Time limits cannot be enforced in test mode.
            </p>
          )}
        </div>
      </div>
      <div className="w-full lg:w-auto flex-1 flex justify-center">
         <Button attrs={{onClick: ()=> router.push(`/quiz/${details.quiz_id}/start?mode=${mode}${enforceTimeLimit ? "&strict=t" : ""}`)}} color="primary" width="w-full" className="lg:max-w-md py-3.5 shadow-[0_0_20px_-5px_var(--main-primary)] flex-col gap-0.5 justify-center items-center! h-auto!">
           <div className="flex items-center gap-2 text-base">
             <FaPlay className="text-sm" /> Start Quiz Now
           </div>
           <span className="text-[10px] font-medium tracking-wide">
             {details.time_limit ? `${details.time_limit} min • ` : ''} {details.question_count} questions
           </span>
         </Button>
      </div>
    </div>
  );
};

export default StartQuizAction;