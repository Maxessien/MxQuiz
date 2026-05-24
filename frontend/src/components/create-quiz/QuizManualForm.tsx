/* eslint-disable react-hooks/incompatible-library */
import { submitQuizQuestions } from "@/src/utils/regUtils";
import { useAppSelector } from "@/store";
import { CreateQuizManualForm, GenQuizQuestionsRes } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import Button from "../reusable/Button";
import QuizInfoForm from "./QuizInfoForm";
import QuizQuestionForm from "./QuizQuestionForm";

const QuizManualForm = ({ initForm }: { initForm: CreateQuizManualForm }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm<CreateQuizManualForm>({
    defaultValues: initForm,
  });

  const {idToken} = useAppSelector(state=> state.user)

  const { append, update, remove } = useFieldArray({ control, name: "questions" });

  const addNewQuestion = useCallback(() => {
    const firstOptId = v4();
    append({
      answer: firstOptId,
      explanation: "",
      options: [{ optionId: firstOptId, value: "" }],
      question_text: "",
      type: "mcq",
    });
  }, [append]);

  const questions = watch("questions");

  const editQuestion = (idx: number, value: GenQuizQuestionsRes) => {
    update(idx, value);
  };

  const deleteQuestion = (idx: number)=>{
    if (questions.length <= 1){
      toast.warn("Quiz must have at least one question")
      return
    }
    remove(idx)
  }

  useEffect(() => {
    addNewQuestion();
  }, [addNewQuestion]);

  const router = useRouter()

  const {mutateAsync, isPending} = useMutation<void, Error, CreateQuizManualForm>({
    mutationFn: (data)=> submitQuizQuestions(data, idToken),
    onSuccess: ()=>{
      toast.success("Quiz Created")
      router.push("/quiz")
    },
    onError: ()=> toast.error("Failed to create quiz, try again later")
  })

  return (
    <form
      onSubmit={handleSubmit((data) => mutateAsync(data))}
      className="w-full space-y-6 max-w-7xl mx-auto px-4"
    >
      <div className="flex flex-col gap-6 items-start md:grid md:grid-cols-[38%_62%]">
        {/* Left Panel: Configuration Info */}
        <QuizInfoForm errs={errors} register={register} />

        {/* Right Panel: Content Builder */}
        <section className="w-full rounded-xl border border-(--text-secondary-light)/30 bg-(--main-tertiary) space-y-5 p-5 md:p-6 shadow-lg">
          <div className="flex justify-between items-center pb-2 border-b border-(--text-secondary-light)/20">
            <h2 className="text-xl font-bold text-(--text-primary)">
              Quiz Questions
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-(--main-primary)/10 text-(--main-primary-light)">
              Total: {questions.length}
            </span>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 scrollbar-hide">
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-(--main-tertiary-light) border border-(--text-secondary-light)/10"
              >
                <QuizQuestionForm
                  editQuestion={editQuestion}
                  deleteQuestion={deleteQuestion}
                  question={q}
                  questionIdx={idx}
                />
              </div>
            ))}
          </div>

          <Button
            attrs={{ type: "button", onClick: addNewQuestion }}
            color="tertiary"
            width="w-full"
          >
            + Add New Question
          </Button>
        </section>
      </div>

      {/* Form Submission Action Area */}
      <div className="pt-4 border-t border-(--text-secondary-light)/10 flex justify-center">
        <Button attrs={{type: "submit", disabled: isPending}} width="w-full max-w-lg">{isPending ? "Publishing..." : "Publish Quiz"}</Button>
      </div>
    </form>
  );
};

export default QuizManualForm;
