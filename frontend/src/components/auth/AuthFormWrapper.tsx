import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Errors, FieldWrapper, Input, Label } from "./AuthFormFields";
import { authFieldsRegisters } from "@/src/utils/regUtils";
import { Fields, FormFields } from "@/types/types";
import Button from "../reusable/Button";

const AuthFormWrapper = ({
  submitFn,
  fieldsToInclude,
  mutationOptions,
}: {
  submitFn: (data: FormFields) => Promise<void>;
  mutationOptions?: UseMutationOptions<void, Error, FormFields, unknown>;
  fieldsToInclude: Fields[];
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: { email: "", name: "", password: "" },
    mode: "onTouched",
  });

  const { mutateAsync, isPending } = useMutation<void, Error, FormFields>({
    mutationFn: (data) => submitFn(data),
    ...mutationOptions,
  });
  return (
    <form
      className="flex flex-col gap-6 w-full max-w-md mx-auto p-6 shadow-[2px_3px_10px_-3px_var(--text-primary-light)] rounded-lg"
      onSubmit={handleSubmit((data) => mutateAsync(data))}
    >
      {fieldsToInclude.includes("name") && (
        <FieldWrapper>
          <Label attrs={{ htmlFor: "name" }}>Name</Label>
          <Input
            attrs={{
              id: "name",
              ...register("name", authFieldsRegisters.name),
            }}
          />
          {errors.name && <Errors error={errors.name.message || ""} />}
        </FieldWrapper>
      )}
      
      {fieldsToInclude.includes("email") && (
        <FieldWrapper>
          <Label attrs={{ htmlFor: "email" }}>Email</Label>
          <Input
            attrs={{
              id: "email",
              ...register("email", authFieldsRegisters.email),
            }}
          />
          {errors.email && <Errors error={errors.email.message || ""} />}
        </FieldWrapper>
      )}
      
      {fieldsToInclude.includes("password") && (
        <FieldWrapper>
          <Label attrs={{ htmlFor: "password" }}>Password</Label>
          <Input
            attrs={{
              id: "password",
              type: "password",
              ...register("password", authFieldsRegisters.password),
            }}
          />
          {errors.password && <Errors error={errors.password.message || ""} />}
        </FieldWrapper>
      )}

      <Button
        attrs={{ type: "submit", disabled: isPending }}
        className="mt-2 w-full"
      >
        {isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default AuthFormWrapper;
