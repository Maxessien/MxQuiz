import { CreateQuizManualForm } from "@/types/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Errors, FieldWrapper, Input, Label } from "../auth/AuthFormFields";

const QuizInfoForm = ({
  register,
  errs,
}: {
  register: UseFormRegister<CreateQuizManualForm>;
  errs: FieldErrors<CreateQuizManualForm>;
}) => {
  return (
    <div className="w-full rounded-md border-(--text-secondary) space-y-3 px-3 py-5 border-2">
      <h2 className="text-xl font-medium">Quiz Info</h2>

      <FieldWrapper>
        <Label attrs={{ htmlFor: "quiz_title" }}>Title</Label>
        <Input
          attrs={{
            id: "quiz_title",
            ...register("title", {
              required: "Title is required",
              minLength: {
                value: 2,
                message: "Quiz title cannot be less than 2 characters",
              },
            }),
          }}
        />
        {errs.title && <Errors error={errs.title.message || ""} />}
      </FieldWrapper>

      <FieldWrapper>
        <Label attrs={{ htmlFor: "quiz_desc" }}>Description</Label>
        <Input
          attrs={{
            id: "quiz_desc",
            ...register("description", {
              required: "Description is required",
              minLength: {
                value: 2,
                message: "Quiz description cannot be less than 2 characters",
              },
            }),
          }}
        />
        {errs.description && <Errors error={errs.description.message || ""} />}
      </FieldWrapper>

      <FieldWrapper>
        <Label attrs={{ htmlFor: "quiz_time" }}>Time (in mins)</Label>
        <Input
          attrs={{
            type: "number",
            id: "quiz_time",
            ...register("time", {
              required: "Time is required",
              min: {
                value: 1,
                message: "Quiz time must be at least 1 minute",
              },
              max: {
                value: 300,
                message: "Quiz time cannot exceed 300 minutes",
              },
            }),
          }}
        />
        {errs.time && <Errors error={errs.time.message || ""} />}
      </FieldWrapper>    </div>
  );
};

export default QuizInfoForm;
