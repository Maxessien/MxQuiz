import { useForm } from "react-hook-form";
import UploadPdf from "./UploadPdf";
import { CreateQuizForm, GenQuizRes } from "@/types/types";
import QuizPreferences from "./QuizPreferences";
import { useMutation } from "@tanstack/react-query";
import { submitCreateQuizForm } from "@/src/utils/regUtils";
import { useAppSelector } from "@/store";
import Button from "../reusable/Button";
import { toast } from "react-toastify";

const GenQuizWithAi = ({switchTab}: {
  switchTab: (data: GenQuizRes) => void;
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<CreateQuizForm>({
    defaultValues: { optCount: 3, qCount: 5, qType: "mcq" },
    mode: "onSubmit",
  });

  const { idToken } = useAppSelector((state) => state.user);

  const { mutateAsync, isPending } = useMutation<
    GenQuizRes,
    Error,
    CreateQuizForm
  >({
    mutationFn: (data) => submitCreateQuizForm(data, idToken),
    onSuccess: (data)=> switchTab(data),
    onError: ()=>toast.error("Failed to generate quiz, try again later")
  });
  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit((data) => mutateAsync(data))}
    >
      <div className="w-full p-3 rounded-lg space-y-2 border-(--text-secondary-light) border-2">
        <UploadPdf register={register} />
        {errors.pdf && (
          <p className="text-base text-(--text-errors) font-medium">
            {errors.pdf.message}
          </p>
        )}
      </div>

      <QuizPreferences
        errs={errors}
        questionCount={getValues("qCount")}
        register={register}
        setVal={setValue}
      />

      <Button
        attrs={{ disabled: isPending }}
        width="w-full max-w-xl mx-auto"
        rounded="rounded-md"
      >
        {isPending ? "Generating..." : "Generate Quiz"}
      </Button>
    </form>
  );
};

export default GenQuizWithAi;
