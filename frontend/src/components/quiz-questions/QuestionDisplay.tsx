import { useState } from "react";
import { QuizQuestionsMod } from "../../../types/types";
import { QuizMode } from "../quiz-info/StartQuizAction";
import Button from "../reusable/Button";

interface Props {
  quiz: QuizQuestionsMod;
  onSelectOption: (optionId: string | number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
  mode: QuizMode;
}

const QuestionDisplay = ({
  quiz,
  onSelectOption,
  onNext,
  onPrev,
  isFirst,
  isLast,
  onSubmit,
  isSubmitting,
  mode,
}: Props) => {
  const [explanationExpanded, setExplanationExpanded] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-(--main-tertiary)/30 border border-(--main-tertiary-light) rounded-3xl p-2 md:p-5 lg:p-7 w-full relative">
      {/* Question Block */}
      <div className="flex flex-col gap-6 mb-8">
        <h3 className="text-base md:text-xl leading-relaxed text-(--text-primary-light) font-medium">
          {quiz.question_text}
        </h3>

        <div className="flex flex-col gap-4 mt-4">
          {quiz.options.map((opt) => {
            const isUserAnswer = quiz.userAnswer === String(opt.optionId);
            const isCorrectAnswer = quiz.answer === String(opt.optionId);

            let btnClasses =
              "bg-(--main-tertiary)/50 border-(--main-tertiary-light) text-(--text-secondary) hover:border-(--main-primary)/50 hover:bg-(--main-tertiary)";
            let circleClasses = "border-(--text-secondary-light)";
            let textClasses = "text-(--text-secondary)";
            let showDot = false;

            if (mode === "test" && quiz.is_answered) {
              if (isCorrectAnswer) {
                btnClasses =
                  "bg-green-500/10 border-green-500 text-green-500 shadow-[0_0_15px_-5px_rgba(34,197,94,0.3)]";
                circleClasses = "border-green-500 bg-green-500";
                textClasses = "text-green-500 font-semibold";
                if (isUserAnswer) showDot = true;
              } else if (isUserAnswer) {
                btnClasses =
                  "bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]";
                circleClasses = "border-red-500 bg-red-500";
                textClasses = "text-red-500 font-semibold";
                showDot = true;
              }
            } else {
              if (isUserAnswer) {
                btnClasses =
                  "bg-(--main-primary)/10 border-(--main-primary-light) text-(--main-primary-lighter) shadow-[0_0_15px_-5px_var(--main-primary)]";
                circleClasses =
                  "border-(--main-primary-light) bg-(--main-primary-light)";
                textClasses = "text-(--text-primary-light) font-semibold";
                showDot = true;
              }
            }

            return (
              <button
                key={opt.optionId}
                onClick={() => onSelectOption(opt.optionId)}
                className={`flex items-start gap-4 p-2 rounded-2xl border text-left transition-all duration-200 ${btnClasses}`}
              >
                <div
                  className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center mt-0.5 ${circleClasses}`}
                >
                  {showDot && (
                    <span className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
                <span className={`text-base md:text-lg ${textClasses}`}>
                  {opt.value}
                </span>
              </button>
            );
          })}
        </div>

        {quiz.is_answered &&
          mode === "test" &&
          quiz.explanation &&
          quiz.explanation.length > 0 && (
            <div className="mt-4 rounded-2xl border border-(--main-tertiary-light) bg-(--main-tertiary)/30 overflow-hidden transition-all">
              <button
                onClick={() => setExplanationExpanded(!explanationExpanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-(--main-tertiary)/60 transition-colors"
              >
                <span className="text-(--text-primary-light) font-semibold text-base md:text-lg">
                  Explanation
                </span>
                <span className="text-(--text-secondary-light) cursor-pointer text-xs">
                  {explanationExpanded ? "▲" : "▼"}
                </span>
              </button>
              {explanationExpanded && (
                <div className="p-4 border-t border-(--main-tertiary-light) text-(--text-secondary) text-sm md:text-base leading-relaxed bg-(--main-tertiary)/20">
                  {quiz.explanation}
                </div>
              )}
            </div>
          )}
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
          <Button color="primary" attrs={{ onClick: onNext }} className="px-10">
            Next Question
          </Button>
        ) : (
          <Button
            color="primary"
            attrs={{ onClick: onSubmit }}
            className="px-10 shadow-[0_0_20px_-5px_var(--main-primary)]"
          >
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
