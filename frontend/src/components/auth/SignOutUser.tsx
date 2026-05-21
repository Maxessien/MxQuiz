"use client";

import { auth } from "@/src/fbConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";

const SignOutUser = () => {
  const router = useRouter();

  useEffect(() => {
    signOut(auth).then(() => router.push("/"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default SignOutUser;
