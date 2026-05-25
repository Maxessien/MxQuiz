/* eslint-disable @next/next/no-img-element */
"use client";

import { auth } from "@/src/fbConfig";
import { useAppSelector } from "@/store";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { ReactNode, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import {
  HiBookOpen,
  HiCheckCircle,
  HiCollection,
  HiHome,
  HiMenu,
  HiPencilAlt,
  HiX,
} from "react-icons/hi";
import Button from "../reusable/Button";

// ─── Shared avatar component ──────────────────────────────────────────────────

const UserAvatar = ({
  avatarUrl,
  size = "w-9 h-9",
}: {
  avatarUrl: string;
  size?: string;
}) => {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt="avatar"
        className={`${size} rounded-full object-cover border-2 border-(--main-primary)`}
      />
    );
  }
  return (
    <div
      className={`${size} rounded-full border-2 border-(--text-primary-light) flex items-center justify-center shrink-0`}
    >
      <FaUser />
    </div>
  );
};

// ─── Mobile / top-bar nav item (unchanged) ────────────────────────────────────

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

// ─── Desktop sidebar nav item ─────────────────────────────────────────────────

const SideNavItem = ({
  icon,
  isActive,
  location,
  text,
}: {
  location: string;
  isActive?: boolean;
  text: string;
  icon: ReactNode;
}) => {
  const pathname = usePathname();
  const active = isActive || location === pathname;
  return (
    <Link
      href={location}
      className={`flex items-center gap-3 w-full text-base font-medium px-4 py-3 rounded-md transition-all border-l-4 hover:bg-(--main-tertiary-light) ${
        active
          ? "border-l-(--main-primary) bg-(--main-tertiary-light) text-(--main-primary-lighter)"
          : "border-l-transparent"
      }`}
    >
      <span className="text-xl shrink-0">{icon}</span>
      {text}
    </Link>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────

const PublicAppLayout = ({ children }: { children: ReactNode }) => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const { width } = useAppSelector((state) => state.app);
  const { isLoggedIn, avatarUrl, name, userId } = useAppSelector(
    (state) => state.user,
  );
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  useEffect(() => {
    const closeNav = () => {
      setShowNav(false);
    };

    closeNav();
  }, [pathname]);

  return (
    <main className="flex flex-col min-h-screen md:flex-row">
      {/* ── Desktop sidebar (md and above) ───────────────────────────────── */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-60 bg-(--main-secondary-light) border-r border-(--main-tertiary-light) z-40">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-(--main-tertiary-light)">
          <h1 className="text-2xl font-semibold">Max Quiz</h1>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
          {!isLoggedIn ? (
            <SideNavItem location="/" text="Home" icon={<HiHome />} />
          ) : (
            <SideNavItem
              location={`/${userId}`}
              text="Dashboard"
              icon={<HiHome />}
            />
          )}
          <SideNavItem
            location="/quiz"
            text="Quizzes"
            icon={<HiCollection />}
            isActive={pathname.startsWith("/quiz")}
          />
          <SideNavItem
            location={isLoggedIn ? `/${userId}/create` : "/login"}
            text="Create Quiz"
            icon={<HiPencilAlt />}
          />
          {isLoggedIn && (
            <>
              <SideNavItem
                location={`/${userId}/quiz`}
                icon={<HiBookOpen />}
                text="My Quizzes"
              />
              <SideNavItem
                location={`/${userId}/attempts`}
                icon={<HiCheckCircle />}
                text="My Attempts"
              />
            </>
          )}
        </nav>

        {/* User / auth section pinned to bottom */}
        <div className="p-4 border-t border-(--main-tertiary-light)">
          {isLoggedIn ? (
            <div className="flex flex-col gap-2">
              <Link
                href={`/${userId}/profile`}
                className="flex items-center gap-3 hover:bg-(--main-tertiary-light) rounded-md p-2 transition-all"
              >
                <UserAvatar avatarUrl={avatarUrl} size="w-9 h-9" />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold truncate">
                    {name || "My Account"}
                  </span>
                  <span className="text-xs text-(--text-secondary)">
                    View Profile
                  </span>
                </div>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-center px-4 py-2 mt-1 text-sm font-medium text-(--text-errors) border border-(--text-errors)/20 hover:bg-(--text-errors)/10 rounded-md transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                attrs={{ onClick: () => router.push("/login") }}
                color="tertiary"
                rounded="rounded-md"
                width="w-full"
              >
                Sign In
              </Button>
              <Button
                attrs={{ onClick: () => router.push("/register") }}
                color="secondary"
                rounded="rounded-md"
                width="w-full"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Mobile header (below md, unchanged) ──────────────────────────── */}
      <header className="md:hidden w-full bg-(--main-secondary-light) px-3 sm:px-5 py-4 flex justify-between items-center gap-2">
        <div className="flex-1 flex justify-between items-center gap-2 max-w-5xl">
          <h1 className="text-2xl font-semibold">Max Quiz</h1>
          <button
            onClick={() => setShowNav(!showNav)}
            className="font-medium cursor-pointer md:hidden z-999 text-3xl"
          >
            {showNav ? <HiX /> : <HiMenu />}
          </button>
          {(showNav || width > 768) && (
            <div className="flex-1 h-screen w-screen md:h-max md:w-max md:backdrop-blur-none z-99 backdrop-blur-lg fixed md:relative top-0 left-0 flex justify-center pt-[20vh] items-start md:justify-end">
              <ul className="md:w-full w-9/10 bg-(--main-secondary-light) px-3 md:bg-transparent max-w-xl rounded-md flex-col md:flex-row flex justify-end items-center gap-4 py-5 md:p-0 md:gap-2">
                <li className="w-full">
                  {!isLoggedIn ? (
                    <NavItem location="/" text="Home" />
                  ) : (
                    <NavItem location={`/${userId}`} text="Dashboard" />
                  )}
                </li>
                <li className="w-full">
                  <NavItem
                    location="/quiz"
                    isActive={pathname.startsWith("/quiz")}
                    text="Quizzes"
                  />
                </li>
                <li className="w-full">
                  <NavItem
                    location={isLoggedIn ? `/${userId}/create` : "/login"}
                    text="Create Quiz"
                  />
                </li>
                {!isLoggedIn ? (
                  <>
                    <Button
                      attrs={{ onClick: () => router.push("/login") }}
                      color="tertiary"
                      rounded="rounded-md"
                      width="w-full"
                      className="md:hidden"
                    >
                      Sign In
                    </Button>
                    <Button
                      attrs={{ onClick: () => router.push("/register") }}
                      color="secondary"
                      rounded="rounded-md"
                      width="w-full"
                      className="md:hidden"
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <>
                    <NavItem location={`/${userId}/quiz`} text="My Quizzes" />
                    <NavItem
                      location={`/${userId}/attempts`}
                      text="My Attempts"
                    />
                    <div className="md:hidden w-full md:w-auto flex flex-col gap-2 mt-2 pt-4 border-t border-(--main-tertiary-light)">
                      <NavItem location={`/${userId}/profile`} text="Profile" />
                      <button
                        onClick={handleSignOut}
                        className="text-lg w-full block text-center font-medium text-(--text-errors) hover:bg-(--text-errors)/10 py-2 px-3 rounded-md transition-all cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Right side of mobile header */}
        {!isLoggedIn ? (
          <div className="hidden sm:flex justify-center items-center gap-2">
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
        ) : (
          <button
            onClick={() => router.push(`/${userId}`)}
            className="md:flex justify-end hidden cursor-pointer"
          >
            <UserAvatar avatarUrl={avatarUrl} size="w-10 h-10" />
          </button>
        )}
      </header>

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <section className="flex-1 md:ml-60">{children}</section>
    </main>
  );
};

export default PublicAppLayout;
