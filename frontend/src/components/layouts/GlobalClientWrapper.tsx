"use client"

import { auth } from "@/src/fbConfig";
import { useAuthStateChange, useIdTokenChange } from "@/src/hooks/useFbEvents";
import { setWindowSize } from "@/store/slices/appSlice";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../reusable/Loader";

const GlobalClientWrapper = ({ children }: { children: ReactNode }) => {
  const { handleChange, isFetching } = useAuthStateChange();
  const {mutateAsync} = useIdTokenChange()
  const dispatch = useDispatch()

  useEffect(() => {
    const authUnsubscriber = onAuthStateChanged(auth, handleChange);
    const tokenUnsubcriber = onIdTokenChanged(auth, mutateAsync)

    const handleResize = ()=>{
      dispatch(setWindowSize({height: window.innerHeight, width: window.innerWidth}))
    }

    window.addEventListener("resize", ()=>handleResize())

    handleResize()

    return (() => {
      authUnsubscriber();
      tokenUnsubcriber()
      window.removeEventListener("resize", ()=>handleResize())
    })();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>
{isFetching && <Loader size="w-screen h-screen" position="top-0 left-0" />}
  {children}
  </>;
};

export default GlobalClientWrapper;
