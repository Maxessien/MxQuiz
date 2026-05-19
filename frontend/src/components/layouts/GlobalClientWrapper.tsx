"use client"

import { auth } from "@/src/fbConfig";
import { useAuthStateChange, useIdTokenChange } from "@/src/hooks/useFbEvents";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";
import Loader from "../reusable/Loader";

const GlobalClientWrapper = ({ children }: { children: ReactNode }) => {
  const { handleChange, isFetching } = useAuthStateChange();
  const {mutateAsync} = useIdTokenChange()

  useEffect(() => {
    const authUnsubscriber = onAuthStateChanged(auth, handleChange);
    const tokenUnsubcriber = onIdTokenChanged(auth, mutateAsync)

    return (() => {
      authUnsubscriber();
      tokenUnsubcriber()
    })();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>
{isFetching && <Loader size="w-screen h-screen" position="top-0 left-0" />}
  {children}
  </>;
};

export default GlobalClientWrapper;
