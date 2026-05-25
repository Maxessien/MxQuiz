import { CreateQuizManualForm } from "@/types/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  Errors,
  FieldWrapper,
  Input,
  Label,
  Select,
  TextArea,
} from "../auth/FormFields";

const QuizInfoForm = ({
  register,
  errs,
}: {
  register: UseFormRegister<CreateQuizManualForm>;
  errs: FieldErrors<CreateQuizManualForm>;
}) => {
  const visibilityOpts: {
    val: CreateQuizManualForm["visibility"];
    text: string;
  }[] = [
    { text: "Public", val: "public" },
    { text: "Private", val: "private" },
  ];

  return (
    <div className="w-full rounded-xl border border-(--text-secondary-light)/30 bg-(--main-tertiary) space-y-5 p-5 md:p-6 shadow-lg">
      <div className="pb-2 border-b border-(--text-secondary-light)/20">
        <h2 className="text-xl font-bold text-(--text-primary)">
          Quiz Metadata
        </h2>
      </div>

      <div className="space-y-4">
        <FieldWrapper>
          <Label
            attrs={{ htmlFor: "quiz_title" }}
            extraClassNames="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)"
          >
            Title
          </Label>
          <Input
            attrs={{
              id: "quiz_title",
              placeholder: "Enter an engaging quiz name",
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
          <Label
            attrs={{ htmlFor: "quiz_desc" }}
            extraClassNames="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)"
          >
            Description
          </Label>
          <TextArea
            attrs={{
              id: "quiz_desc",
              placeholder: "What will this quiz cover?",
              ...register("description", {
                required: "Description is required",
                minLength: {
                  value: 2,
                  message: "Quiz description cannot be less than 2 characters",
                },
              }),
            }}
          />
          {errs.description && (
            <Errors error={errs.description.message || ""} />
          )}
        </FieldWrapper>

        <FieldWrapper>
          <Label
            attrs={{ htmlFor: "quiz_time" }}
            extraClassNames="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)"
          >
            Time Limit (Minutes)
          </Label>
          <Input
            attrs={{
              type: "number",
              id: "quiz_time",
              placeholder: "e.g. 30",
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
        </FieldWrapper>

        <FieldWrapper>
          <Label attrs={{ htmlFor: "quiz_visibility" }}>Visibility</Label>
          <Select
            attrs={{
              ...register("visibility", { required: "Visibility is required" }),
            }}
            options={visibilityOpts}
          />
          {errs.visibility && <Errors error={errs.visibility.message || ""} />}
        </FieldWrapper>
      </div>
    </div>
  );
};

export default QuizInfoForm;
