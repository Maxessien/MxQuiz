/* eslint-disable react-hooks/incompatible-library */
import { CreateQuizManualForm, GenQuizQuestionsRes } from "@/types/types";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import Button from "../reusable/Button";
import QuizInfoForm from "./QuizInfoForm";
import QuizQuestionForm from "./QuizQuestionForm";

const QuizManualForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch
  } = useForm<CreateQuizManualForm>({
    defaultValues: {
      description: "",
      isAiGen: false,
      author: "",
      questions: [],
      status: "draft",
      time: 10,
      title: "",
      visibility: "private",
    },
  });

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

  const questions = watch("questions")

  return (
    // TODO submission logic
    <form onSubmit={handleSubmit(() => null)}>
      <QuizInfoForm errs={errors} register={register} />
      <section>
        <h2>Add Question</h2>
        {questions.map((q, idx) => {
          return (
            <QuizQuestionForm
              editQuestion={editQuestion}
              question={q}
              key={idx}
              questionIdx={idx}
            />
          );
        })}      </section>
      <Button attrs={{type: "button", onClick: addNewQuestion}} color="tertiary" width="w-full max-w-lg mx-auto">Add New Question</Button>    </form>
  );
};

export default QuizManualForm;
