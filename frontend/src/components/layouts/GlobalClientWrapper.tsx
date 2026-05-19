import { auth } from "@/src/fbConfig";
import { useAuthStateChange } from "@/src/hooks/useFbEvents";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";

const GlobalClientWrapper = ({ children }: { children: ReactNode }) => {
  const { handleChange } = useAuthStateChange();
  useEffect(() => {
    const authUnsubscriber = onAuthStateChanged(auth, handleChange);
    const tokenUnsubcriber = onIdTokenChanged(auth, (user)=>{})

    return (() => {
      authUnsubscriber();
    })();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};

export default GlobalClientWrapper;
