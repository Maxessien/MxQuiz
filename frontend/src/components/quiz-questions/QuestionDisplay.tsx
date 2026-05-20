import { FaFlag, FaRegClock } from "react-icons/fa";
import { QuizQuestionsMod } from "../../../types/types";
import Button from "../reusable/Button";


interface Props {
  quiz: QuizQuestionsMod;
  timeRemaining?: number; // In seconds
  onSelectOption: (optionId: string | number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSubmit: () => void;
}

const QuestionDisplay = ({
  quiz,
  timeRemaining,
  onSelectOption,
  onNext,
  onPrev,
  isFirst,
  isLast,
  onSubmit
}: Props) => {
  const formatTime = (seconds?: number) => {
    if (seconds === undefined) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-(--main-tertiary)/30 border border-(--main-tertiary-light) rounded-3xl p-6 md:p-8 lg:p-10 w-full relative">
      
      {/* Quiz Top Action row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-(--text-primary-light) flex-1 line-clamp-1">
          {quiz.title || "Quiz"}
        </h2>
        
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-full text-(--main-primary-light) font-bold font-mono">
            <FaRegClock /> {formatTime(timeRemaining)}
          </div>
          <button className="flex items-center justify-center p-2.5 rounded-full bg-(--main-tertiary) border border-(--main-tertiary-light) text-(--text-secondary) hover:text-red-400 transition-colors">
            <FaFlag />
          </button>
        </div>
      </div>

      {/* Question Block */}
      <div className="flex flex-col gap-6 mb-10">
         <h3 className="text-xl md:text-2xl leading-relaxed text-(--text-primary-light) font-medium">
           {quiz.question_text}
         </h3>

         <div className="flex flex-col gap-4 mt-4">
           {quiz.options.map((opt) => (
             <button
               key={opt.option_id}
               onClick={() => onSelectOption(opt.option_id)}
               className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-200
                 ${quiz.answer === opt.option_id 
                   ? "bg-(--main-primary)/10 border-(--main-primary-light) text-(--main-primary-lighter) shadow-[0_0_15px_-5px_var(--main-primary)]" 
                   : "bg-(--main-tertiary)/50 border-(--main-tertiary-light) text-(--text-secondary) hover:border-(--main-primary)/50 hover:bg-(--main-tertiary)"
                 }`}
             >
                <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center mt-0.5
                  ${quiz.answer === opt.option_id 
                    ? "border-(--main-primary-light) bg-(--main-primary-light)" 
                    : "border-(--text-secondary-light)"
                  }`}
                >
                  {quiz.answer === opt.option_id && <span className="w-2.5 h-2.5 bg-white rounded-full" />}
                </div>
                <span className={`text-base md:text-lg ${quiz.answer === opt.option_id ? "text-(--text-primary-light) font-semibold" : "text-(--text-secondary)"}`}>
                  {opt.value}
                </span>
             </button>
           ))}
         </div>
      </div>

      {/* Bottom Nav Buttons */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-(--main-tertiary-light)">
         <Button
           color="tertiary" 
           attrs={{ disabled: isFirst, onClick: onPrev }}
           className="border-(--main-tertiary-light)! text-(--text-secondary)! hover:text-(--text-primary-light)! hover:bg-(--main-tertiary)! px-8"
         >
           Previous
         </Button>
         
         {!isLast ? (
           <Button color="primary" attrs={{onClick: onNext}} className="px-10">
             Next Question
           </Button>
         ) : (
           <Button color="primary" attrs={{onClick: onSubmit}} className="px-10 shadow-[0_0_20px_-5px_var(--main-primary)]">
             Submit Quiz
           </Button>
         )}
      </div>

    </div>
  );
};

export default QuestionDisplay;