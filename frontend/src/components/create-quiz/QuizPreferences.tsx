import { CreateQuizForm } from "@/types/types";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuizPreferences = ({
  register,
  questionCount,
  setVal,
  errs
}: {
  register: UseFormRegister<CreateQuizForm>;
  questionCount: number;
  setVal: UseFormSetValue<CreateQuizForm>;
  errs: FieldErrors<CreateQuizForm>
}) => {
  return (
    <div className="w-full p-5 rounded-xl border border-(--text-secondary-light)/30 bg-(--main-tertiary) space-y-5 shadow-lg">
      <h3 className="font-bold text-xl md:text-2xl text-left text-(--text-primary)">
        Quiz Preferences
      </h3>
      
      <div className="flex gap-6 items-start flex-wrap">
        {/* Quiz Type Selection */}
        <div className="space-y-3 flex-1 min-w-70">
          <h4 className="text-sm md:text-base text-left font-semibold uppercase tracking-wider text-(--text-secondary)">
            Quiz Type
          </h4>
          <div className="w-full flex flex-wrap gap-2">
            {/* MCQ Option */}
            <label
              className="flex-1 min-w-20 rounded-lg px-3 py-2.5 border-2 font-medium text-center text-base cursor-pointer transition-all duration-200
              border-(--text-secondary-light)/40 hover:border-(--main-primary-light)
              has-checked:border-(--main-primary) has-checked:bg-(--main-primary)/10 has-checked:text-(--text-primary-light)"
              htmlFor="quiz_type_1"
            >
              <input
                defaultChecked
                {...register("qType", {
                  required: "A quiz type is required",
                  validate: (val) => ["mcq", "theory", "both"].includes(val) || "Invalid quiz type",
                })}
                className="hidden"
                type="radio"
                id="quiz_type_1"
                value="mcq"
              />
              <span>MCQ</span>
            </label>

            {/* Theory Option (Disabled) */}
            <label
              className="flex-1 min-w-20 rounded-lg px-3 py-2.5 border-2 font-medium text-center text-base opacity-40 cursor-not-allowed border-(--text-secondary-light)/20"
              htmlFor="quiz_type_2"
            >
              <input
                disabled
                {...register("qType")}
                className="hidden"
                type="radio"
                id="quiz_type_2"
                value="theory"
              />
              <span>Theory</span>
            </label>

            {/* Mixed Option (Disabled) */}
            <label
              className="flex-1 min-w-20 rounded-lg px-3 py-2.5 border-2 font-medium text-center text-base opacity-40 cursor-not-allowed border-(--text-secondary-light)/20"
              htmlFor="quiz_type_3"
            >
              <input
                disabled
                {...register("qType")}
                className="hidden"
                type="radio"
                id="quiz_type_3"
                value="both"
              />
              <span>Mixed</span>
            </label>
          </div>
          {errs.qType && (
            <p className="text-xs text-(--text-errors) font-medium mt-1">{errs.qType.message}</p>
          )}
        </div>

        {/* Number of Questions Counter */}
        <div className="flex-1 min-w-70 space-y-3">
          <h4 className="text-sm md:text-base text-left font-semibold uppercase tracking-wider text-(--text-secondary)">
            Number of Questions
          </h4>
          <div className="flex w-full max-w-xs h-11 items-center rounded-lg border-2 border-(--text-secondary-light)/40 overflow-hidden focus-within:border-(--main-primary) transition-colors">
            <button
              type="button"
              disabled={questionCount <= 1}
              onClick={() => setVal("qCount", Math.max(1, Number(questionCount) - 1))}
              className="text-sm bg-(--main-tertiary-light) hover:bg-(--text-secondary-light)/20 disabled:opacity-30 disabled:hover:bg-transparent h-full px-4 text-(--text-primary) transition-colors border-r border-(--text-secondary-light)/20"
            >
              <FaMinus />
            </button>            
            <input
              className="w-full h-full bg-transparent text-center text-lg font-bold text-(--text-primary) focus:outline-none"
              type="text"
              readOnly
              {...register("qCount", {
                required: "Question count is required",
                max: { value: 20, message: "Maximum is 20 questions" },
                min: { value: 1, message: "Minimum is 1 question" },
              })}
            />
            <button
              type="button"
              disabled={questionCount >= 20}
              onClick={() => setVal("qCount", Math.min(20, Number(questionCount) + 1))}
              className="text-sm bg-(--main-tertiary-light) hover:bg-(--text-secondary-light)/20 disabled:opacity-30 disabled:hover:bg-transparent h-full px-4 text-(--text-primary) transition-colors border-l border-(--text-secondary-light)/20"
            >
              <FaPlus />
            </button>          
          </div>
          {errs.qCount && (
            <p className="text-xs text-(--text-errors) font-medium mt-1">{errs.qCount.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPreferences;
