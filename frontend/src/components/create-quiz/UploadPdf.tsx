import { CreateQuizForm } from "@/types/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

const UploadPdf = ({
  register,
  errs, files
}: {
  register: UseFormRegister<CreateQuizForm>;
  errs: FieldErrors<CreateQuizForm>;
  files: FileList
}) => {
  return (
    <div className="w-full space-y-2">
      <label 
        htmlFor="pdf_input" 
        className="group relative w-full rounded-xl p-8 border-2 border-dashed border-(--main-primary)/40 bg-(--main-tertiary) hover:bg-(--main-tertiary-light) hover:border-(--main-primary) flex flex-col gap-3 justify-center items-center cursor-pointer transition-all duration-200 shadow-md"
      >
        {/* Decorative background pulse icon on hover */}
        <div className="p-4 rounded-full bg-(--main-primary)/10 text-(--main-primary) group-hover:scale-110 group-hover:bg-(--main-primary)/20 transition-transform duration-200">
          <FaUpload className="text-xl md:text-2xl" />
        </div>

        <div className="text-center space-y-1">
          <h2 className="font-bold text-lg md:text-xl text-(--text-primary)">
            Upload Your PDF
          </h2>
          <p className="text-sm text-(--text-secondary) font-medium">
            Drag and drop or <span className="text-(--main-primary-light) font-semibold group-hover:underline">browse your files</span>
          </p>
        </div>

        {files?.length > 0 && <p className="w-full text-center text-base font-medium text-ellipsis">{files[0].name}</p>}

        <input
          className="hidden"
          id="pdf_input"
          type="file"
          accept="application/pdf"
          {...register("pdf", {
            required: "PDF File is required",
            validate: (pdf) => {
              if (!pdf || !pdf[0]) return "PDF File is required";
              if (pdf[0]?.size / (1024 * 1024) > 50)
                return "File Size must be less than 50MB";
              if (pdf[0].name.split(".").at(-1)?.toLowerCase() !== "pdf")
                return "Only PDF Files allowed";
              return true;
            },
          })}
        />

        <div className="pt-2 border-t border-(--text-secondary-light)/10 w-full text-center">
          <p className="text-xs text-(--text-secondary-light) font-medium">
            Supports PDF files up to <span className="text-(--text-secondary) font-semibold">50MB</span>
          </p>
        </div>
      </label>

      {/* Dynamic validation error display */}
      {errs.pdf && (
        <p className="text-xs text-(--text-errors) font-medium text-left pl-1">
          {errs.pdf.message}
        </p>
      )}
    </div>
  );
};

export default UploadPdf;
