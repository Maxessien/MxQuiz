import { authFieldsRegisters } from "@/src/utils/regUtils";
import { AuthFormType, Fields, FormFields } from "@/types/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../reusable/Button";
import { Errors, FieldWrapper, Input, Label } from "./FormFields";

const AuthFormWrapper = ({
  submitFn,
  fieldsToInclude,
  mutationOptions,
  type,
}: {
  submitFn: (data: FormFields) => Promise<void>;
  mutationOptions?: UseMutationOptions<void, Error, FormFields, unknown>;
  fieldsToInclude: Fields[];
  type: AuthFormType;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: { email: "", name: "", password: "" },
    mode: "onTouched",
  });

  const typeMappings: Record<
    AuthFormType,
    { active: string; inActive: string }
  > = {
    login: { inActive: "Sign In", active: "Signing In..." },
    register: { inActive: "Sign Up", active: "Signing Up..." },
  };

  const { mutateAsync, isPending } = useMutation<void, Error, FormFields>({
    mutationFn: (data) => submitFn(data),
    ...mutationOptions,
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="flex flex-col gap-5 w-full bg-(--main-tertiary) border border-(--main-tertiary-light) p-8 sm:p-10 rounded-2xl shadow-xl"
      onSubmit={handleSubmit((data) => mutateAsync(data))}
    >
      {fieldsToInclude.includes("name") && (
        <FieldWrapper>
          <Label attrs={{ htmlFor: "name" }}>Name</Label>
          <Input
            attrs={{
              id: "name",
              ...register("name", authFieldsRegisters.name[type]),
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
              ...register("email", authFieldsRegisters.email[type]),
            }}
          />
          {errors.email && <Errors error={errors.email.message || ""} />}
        </FieldWrapper>
      )}

      {fieldsToInclude.includes("password") && (
        <FieldWrapper>
          <Label attrs={{ htmlFor: "password" }}>Password</Label>
          <div className="relative w-full">
            <Input
              attrs={{
                id: "password",
                type: !showPassword ? "password" : "text",
                placeholder: "••••••••",
                ...register("password", authFieldsRegisters.password[type]),
              }}
              extraClassNames="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 text-(--text-secondary) hover:text-(--text-primary-light) transition-colors -translate-y-1/2 flex items-center justify-center p-1"
            >
              {!showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {errors.password && <Errors error={errors.password.message || ""} />}
        </FieldWrapper>
      )}

      <Button
        attrs={{ type: "submit", disabled: isPending }}
        className="mt-6 mx-auto py-3 font-semibold text-[15px]"
        width="w-full"
      >
        {isPending ? typeMappings[type].active : typeMappings[type].inActive}
      </Button>
    </form>
  );
};

export default AuthFormWrapper;
