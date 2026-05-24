import { submitCreateQuizForm } from "@/src/utils/regUtils";
import { useAppSelector } from "@/store";
import { CreateQuizForm, GenQuizRes } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../reusable/Button";
import QuizPreferences from "./QuizPreferences";
import UploadPdf from "./UploadPdf";

const GenQuizWithAi = ({switchTab}: {
  switchTab: (data: GenQuizRes) => void;
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<CreateQuizForm>({
    defaultValues: { optCount: 3, qCount: 5, qType: "mcq" },
    mode: "onSubmit",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const qCount = watch("qCount")
  const pdf = watch("pdf")

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
      className="space-y-3 max-w-2xl mx-auto"
      onSubmit={handleSubmit((data) => mutateAsync(data))}
    >
      <div className="w-full p-3 rounded-lg space-y-2 border-(--text-secondary-light) border-2">
        <UploadPdf files={pdf} errs={errors} register={register} />
      </div>

      <QuizPreferences
        errs={errors}
        questionCount={qCount}
        register={register}
        setVal={setValue}
      />

      <div className="w-full flex justify-center">
        <Button
        attrs={{ disabled: isPending, type: "submit" }}
        width="w-full max-w-xl"
        rounded="rounded-md"
      >
        {isPending ? "Generating..." : "Generate Quiz"}
      </Button>
      </div>
    </form>
  );
};

export default GenQuizWithAi;
