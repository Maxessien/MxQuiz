"use client";

import { auth } from "@/src/fbConfig";
import { getFirebaseErrorMessage } from "@/src/utils/fbErrors";
import { FormFields } from "@/types/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
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
    <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] py-12 px-4 sm:px-6">
      <div className="w-full max-w-110 flex flex-col items-center">
        <div className="w-16 h-16 bg-(--main-primary-light)/20 text-(--main-primary-light) rounded-2xl flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </div>
        
        <div className="text-center mb-8 w-full">
          <h2 className="text-3xl font-extrabold text-(--text-primary-light) mb-2.5">
            Welcome Back
          </h2>
          <p className="text-(--text-secondary) text-base">
            Please sign in to continue your quiz journey
          </p>
        </div>
        
        <div className="w-full text-left">
          <AuthFormWrapper
            submitFn={login}
            fieldsToInclude={["email", "password"]}
            type="login"
            mutationOptions={{
              onSuccess: () => {
                toast.success("Successfully logged in");
                router.push("/");
              },
              onError: (err) => {
                toast.error(getFirebaseErrorMessage(err?.message) || "Authentication failed");
              },
            }}
          />
        </div>
        
        <p className="mt-8 text-sm text-(--text-secondary)">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-(--main-primary-light) font-semibold hover:underline transition-all">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
