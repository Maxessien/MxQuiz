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
    <div className="w-full p-3 rounded-lg border-(--text-secondary-light) border-2">
      <h3 className="font-semibold text-xl md:text-2xl text-left">
        Quiz Preferences
      </h3>
      <div className="flex gap-3 items-center flex-wrap">
        <div className="space-y-3 flex-1">
          <h4 className="text-lg md:text-xl text-left font-medium">
            Quiz Type
          </h4>
          <div className="w-full flex-wrap justify-center flex gap-2 items-center">
            <label
              className="rounded-md flex-1 px-2 py-2 border-2 font-medium text-center text-base md:text-lg border-(--text-secondary)"
              htmlFor="quiz_type_1"
            >
              <input
                defaultChecked
                {...register("qType", {
                  required: "A quiz type is required",
                  validate: (val) => {
                    const allowedVals = ["mcq", "theory", "both"];
                    if (!allowedVals.includes(val)) return "Invalid quiz type";
                    return true;
                  },
                })}
                className="hidden"
                type="radio"
                id="quiz_type_1"
                value={"mcq"}
              />
              <span>MCQ</span>
            </label>
            <label
              className="rounded-md flex-1 px-2 py-2 border-2 font-medium text-center text-base md:text-lg border-(--text-secondary)"
              htmlFor="quiz_type_2"
            >
              <input
                disabled
                {...register("qType", {
                  required: "A quiz type is required",
                  validate: (val) => {
                    const allowedVals = ["mcq", "theory", "both"];
                    if (!allowedVals.includes(val)) return "Invalid quiz type";
                    return true;
                  },
                })}
                className="hidden"
                type="radio"
                id="quiz_type_2"
                value={"theory"}
              />
              <span>Theory</span>
            </label>
            <label
              className="rounded-md flex-1 px-2 py-2 border-2 font-medium text-center text-base md:text-lg border-(--text-secondary)"
              htmlFor="quiz_type_3"
            >
              <input
                disabled
                {...register("qType", {
                  required: "A quiz type is required",
                  validate: (val) => {
                    const allowedVals = ["mcq", "theory", "both"];
                    if (!allowedVals.includes(val)) return "Invalid quiz type";
                    return true;
                  },
                })}
                className="hidden"
                type="radio"
                id="quiz_type_3"
                value={"both"}
              />
              <span>Mixed</span>
            </label>
          </div>
          {errs.qType && <p className="text-sm text-(--text-errors) font-medium">{errs.qType.message}</p>}
        </div>

        <div className="flex-1 space-y-2">
          <h4 className="text-lg md:text-xl text-left font-medium">
            Number of Questions
          </h4>
          <div className="flex w-full mx-auto max-w-90 justify-center items-center">
            <button
              onClick={() => {
                if (questionCount <= 1) return;
                setVal("qCount", Number(questionCount) - 1);
              }}
              className="text-xl bg-(--text-secondary-light) h-full px-3 font-semibold flex justify-center items-center"
            >
              <FaMinus />
            </button>            
            <input
              className="flex-1 px-3 py-2 text-center text-base font-semibold focus:border-2 focus:border-(--main-primary)"
              type="text"
              {...register("qCount", {
                required: "Question count is required",
                max: { value: 20, message: "Question count cannot exceed 20" },
                min: { value: 1, message: "Question count cannot be below 1" },
              })}
            />
            <button
              onClick={() => {
                if (questionCount >= 20) return;
                setVal("qCount", Number(questionCount) + 1);
              }}
              className="text-xl h-full bg-(--text-secondary-light) px-3 font-semibold flex justify-center items-center"
            >
              <FaPlus />
            </button>          
            </div>
          {errs.qCount && <p className="text-sm text-(--text-errors) font-medium">{errs.qCount.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default QuizPreferences;
