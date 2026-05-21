"use client";

import { FormFields } from "@/types/types";
import AuthFormWrapper from "./AuthFormWrapper";
import { toast } from "react-toastify";
import { getFirebaseErrorMessage } from "@/src/utils/fbErrors";
import { regApi } from "@/src/utils/api";
import { useRouter } from "nextjs-toploader/app";

const Register = () => {
  const router = useRouter();

  const register = async (data: FormFields) => {
    await regApi.post("/auth", data);
    return;
  };

  return (
    <section className="w-full max-w-md mx-auto mt-12">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-2">
          Create Your Account
        </h2>
        <p className="text-sm md:text-base text-(--text-primary)">
          Sign Up to get started with MxQuiz
        </p>
      </div>

      <AuthFormWrapper
        submitFn={register}
        fieldsToInclude={["email", "name", "password"]}
        type="register"
        mutationOptions={{
          onError: (err) => toast.error(getFirebaseErrorMessage(err)),
          onSuccess: () => {
            toast.success("Account created successfully");
            router.push("/login");
          },
        }}
      />
    </section>
  );
};

export default Register;
