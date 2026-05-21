import SignOutUser from "@/src/components/auth/SignOutUser";
import { getUserServerSide } from "@/src/utils/fetchers";
import { SESSION_COOKIE_NAME } from "@/src/utils/regUtils";
import { cookies } from "next/headers";
import { ReactNode } from "react";

const UserLayoutPage = async ({children}: {children: ReactNode}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);

  const user = await getUserServerSide(token)
	console.log(user)

  if (!user) return <SignOutUser />

  return children;
};

export default UserLayoutPage;
