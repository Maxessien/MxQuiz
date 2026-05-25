"use client";

import { regApi } from "@/src/utils/api";
import { getFirebaseErrorMessage } from "@/src/utils/fbErrors";
import { FormFields } from "@/types/types";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "react-toastify";
import AuthFormWrapper from "./AuthFormWrapper";

const Register = () => {
  const router = useRouter();

  const register = async (data: FormFields) => {
    await regApi.post("/auth", data);
    return;
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] py-12 px-4 sm:px-6">
      <div className="w-full max-w-110 flex flex-col items-center">
        <div className="w-16 h-16 bg-(--main-primary-light)/20 text-(--main-primary-light) rounded-2xl flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>

        <div className="text-center mb-8 w-full">
          <h2 className="text-3xl font-extrabold text-(--text-primary-light) mb-2.5">
            Create Your Account
          </h2>
          <p className="text-(--text-secondary) text-base">
            Sign Up to get started with MxQuiz
          </p>
        </div>

        <div className="w-full text-left">
          <AuthFormWrapper
            submitFn={register}
            fieldsToInclude={["name", "email", "password"]}
            type="register"
            mutationOptions={{
              onSuccess: () => {
                toast.success("Successfully registered");
                router.push("/login");
              },
              onError: (err) => {
                toast.error(
                  err?.message ||
                    getFirebaseErrorMessage(err?.message) ||
                    "Registration failed"
                );
              },
            }}
          />
        </div>

        <p className="mt-8 text-sm text-(--text-secondary)">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-(--main-primary-light) font-semibold hover:underline transition-all"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
