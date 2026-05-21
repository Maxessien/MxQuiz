"use client";

import { FormFields } from "@/types/types";
import AuthFormWrapper from "./AuthFormWrapper";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/fbConfig";
import { getFirebaseErrorMessage } from "@/src/utils/fbErrors";
import { useAppSelector } from "@/store";
import { useRouter } from "nextjs-toploader/app";
import {useEffect} from "react"

const Login = () => {
  const { userId, isLoggedIn } = useAppSelector((state) => state.user);

  const router = useRouter();

  const login = async (data: FormFields) => {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    return;
  };

	useEffect(()=>{
		if (isLoggedIn) router.push(`/${userId}`);
    
	}, [isLoggedIn, userId, router])

  return (
    <section className="w-full max-w-md mx-auto mt-12">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-2">
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
          },
        }}
      />
    </section>
  );
};

export default Login;
