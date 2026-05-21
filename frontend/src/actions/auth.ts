"use server";

import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/src/utils/regUtils";

export const verifyAuthCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.has(SESSION_COOKIE_NAME);
};
