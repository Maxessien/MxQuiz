/* eslint-disable react-hooks/incompatible-library */
import { CreateQuizManualForm, GenQuizQuestionsRes } from "@/types/types";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import Button from "../reusable/Button";
import QuizInfoForm from "./QuizInfoForm";
import QuizQuestionForm from "./QuizQuestionForm";

const QuizManualForm = ({initForm}: {initForm: CreateQuizManualForm}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm<CreateQuizManualForm>({
    defaultValues: initForm});

  const addNewQuestion = () => {
    const firstOptId = v4();
    setValue("questions", [
      ...getValues("questions"),
      {
        answer: firstOptId,
        explanation: "",
        options: [{ optionId: firstOptId, value: "" }],
        question_text: "",
        type: "mcq",
      },
    ]);
  };

  const editQuestion = (idx: number, value: GenQuizQuestionsRes) => {
    const questions = getValues("questions");
    questions[idx] = value;
    setValue("questions", questions);
  };

  const questions = watch("questions");

  return (
    // TODO submission logic
    <form onSubmit={handleSubmit(() => null)}>
      <div className="flex flex-col gap-3 items-center md:grid md:grid-cols-[40%_60%]">
        <QuizInfoForm errs={errors} register={register} />
        <section className="w-full rounded-md border-(--text-secondary) space-y-3 px-3 py-5 border-2">
          <h2 className="text-xl font-medium">Add Question</h2>
          {questions.map((q, idx) => {
            return (
              <QuizQuestionForm
                editQuestion={editQuestion}
                question={q}
                key={idx}
                questionIdx={idx}
              />
            );
          })}
          <Button
            attrs={{ type: "button", onClick: addNewQuestion }}
            color="tertiary"
            width="w-full max-w-lg mx-auto"
          >
            Add New Question
          </Button>
        </section>
      </div>
      <Button width="w-full max-w-xl mx-auto">Publish</Button>
    </form>
  );
};

export default QuizManualForm;
