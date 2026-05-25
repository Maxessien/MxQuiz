"use server";

import { SESSION_COOKIE_NAME } from "@/src/utils/regUtils";
import { cookies } from "next/headers";

export const verifyAuthCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.has(SESSION_COOKIE_NAME);
};

export const setAuthCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    maxAge: 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development",
    sameSite: "lax",
    path: "/",
  });
};

export const removeAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
};

