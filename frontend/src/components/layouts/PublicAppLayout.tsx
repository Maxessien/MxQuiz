"use client";

import { useAppSelector } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { ReactNode, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Button from "../reusable/Button";

const NavItem = ({
  isActive,
  location,
  text,
}: {
  location: string;
  isActive?: boolean;
  text: string;
}) => {
  const pathname = usePathname();
  const active = isActive || location === pathname;
  return (
    <Link
      className={`text-lg w-full block text-center font-medium hover:bg-(--main-secondary) py-1 px-3 sm:p-2 transition-all ${active ? "border-b-2 rounded-[6px_6px_0px_0px] border-b-(--main-primary)" : "rounded-md"}`}
      href={location}
    >
      {text}
    </Link>
  );
};

const PublicAppLayout = ({ children }: { children: ReactNode }) => {
  const [showNav, setShowNav] = useState(false)
  const pathname = usePathname()
  const {width} = useAppSelector(state=> state.app)
  
  const router = useRouter();
  return (
    <main>
      <header className="w-full bg-(--main-secondary-light) px-3 sm:px-5 lg:px-8 py-4 flex justify-between items-center gap-2">
        <div className="flex-1 flex justify-between items-center gap-2 max-w-5xl">
          <h1 className="text-2xl font-semibold">Max Quiz</h1>
          <button onClick={()=> setShowNav(!showNav)} className="font-medium cursor-pointer sm:hidden z-999 text-3xl">{showNav ? <HiX /> : <HiMenu />}</button> 
          {(showNav || width > 640) &&  <div className="flex-1 h-screen w-screen sm:h-max sm:w-max sm:backdrop-blur-none z-99 backdrop-blur-lg fixed sm:relative top-0 left-0 flex justify-center items-center sm:justify-end">
            <ul className="sm:w-full w-9/10 bg-(--main-secondary-light) px-3 sm:bg-transparent max-w-xl rounded-md flex-col sm:flex-row flex justify-end items-center gap-4 py-5 sm:p-0 sm:gap-2">
              <li>
                <NavItem location="/" text="Home" />
              </li>
              <li>
                <NavItem location="/quiz" isActive={pathname.startsWith("/quiz")} text="Quizzes" />
              </li>
              <li>
                <NavItem location="/quiz/create" text="Create Quiz" />
              </li>
              <Button
                attrs={{ onClick: () => router.push("/login") }}
                color="tertiary"
                rounded="rounded-md"
                width="w-full"
                className="sm:hidden"
              >
                Sign In
              </Button>
              <Button
                attrs={{ onClick: () => router.push("/register") }}
                color="secondary"
                rounded="rounded-md"
                width="w-full"
                className="sm:hidden"
              >
                Sign Up
              </Button>
            </ul>
          </div>}
        </div>
        <div className="hidden md:flex justify-center items-center gap-2">
          <Button
            attrs={{ onClick: () => router.push("/login") }}
            color="tertiary"
            rounded="rounded-md"
          >
            Sign In
          </Button>
          <Button
            attrs={{ onClick: () => router.push("/register") }}
            color="secondary"
            rounded="rounded-md"
          >
            Sign Up
          </Button>
        </div>
      </header>
      <section>{children}</section>
    </main>
  );
};

export default PublicAppLayout;
