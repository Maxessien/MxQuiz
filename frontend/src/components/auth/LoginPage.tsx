"use client";

import { auth } from "@/src/fbConfig";
import { getFirebaseErrorMessage } from "@/src/utils/fbErrors";
import { FormFields } from "@/types/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "react-toastify";
import AuthFormWrapper from "./AuthFormWrapper";

const Login = () => {
  const router = useRouter();

  const login = async (data: FormFields) => {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    return;
  };


  return (
    <section className="w-full max-w-md mx-auto mt-12">
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-(--text-primary) mb-2">
          Welcome Back
        </h2>
        <p className="text-sm md:text-base text-(--text-primary)">
          Please sign in to your account
        </p>
      </div>
      <AuthFormWrapper
        submitFn={login}
        fieldsToInclude={["email", "password"]}
        type="login"
        mutationOptions={{
          onError: (err) => toast.error(getFirebaseErrorMessage(err)),
          onSuccess: () => {
            toast.success("Sign In successful");
            router.replace("/quiz")
          },
        }}
      />
    </section>
  );
};

export default Login;
