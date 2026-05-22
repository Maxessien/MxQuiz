import { CreateQuizForm } from "@/types/types";
import { UseFormRegister } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import Button from "../reusable/Button";

const UploadPdf = ({
  register,
}: {
  register: UseFormRegister<CreateQuizForm>;
}) => {
  return (
    <div className="w-full rounded-lg p-4 border-dotted border-2 border-(--main-primary) flex flex-col gap-2 justify-center items-center">
      <h2 className="font-semibold text-xl">Upload Your PDF</h2>
      <label htmlFor="pdf_input">
        <Button width="w-full max-w-lg" rounded="rounded-md">
          <FaUpload /> Choose PDF File
        </Button>
        <input
          className="hidden"
          id="pdf_input"
          type="file"
          {...register("pdf", {
            required: "PDF File is required",
            validate: (pdf) => {
              if (!pdf[0]) return "PDF File is required";
              if (pdf[0]?.size / (1024 * 1024) > 50)
                return "File Size must be less than 50MB";
              if (pdf[0].name.split(".").at(-1)?.toLowerCase() !== "pdf")
                return "Only PDF Files allowed";
              return true;
            },          })}
        />
      </label>
      <p className="text-base text-(--text-secondary) font-medium">
        Supports PDF files up to{" "}
        <span className="text-(--main-primary)">50MB</span>
      </p>
    </div>
  );
};

export default UploadPdf;
