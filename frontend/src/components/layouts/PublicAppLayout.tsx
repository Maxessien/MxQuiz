/* eslint-disable @next/next/no-img-element */
"use client";

import { useAppSelector } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { ReactNode, useState } from "react";
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
            className="font-medium cursor-pointer sm:hidden z-999 text-3xl"
          >
            {showNav ? <HiX /> : <HiMenu />}
          </button>
          {(showNav || width > 640) && (
            <div className="flex-1 h-screen w-screen sm:h-max sm:w-max sm:backdrop-blur-none z-99 backdrop-blur-lg fixed sm:relative top-0 left-0 flex justify-start pt-[20vh] items-center sm:justify-end">
              <ul className="sm:w-full w-9/10 bg-(--main-secondary-light) px-3 sm:bg-transparent max-w-xl rounded-md flex-col sm:flex-row flex justify-end items-center gap-4 py-5 sm:p-0 sm:gap-2">
                <li>
                  {!isLoggedIn ? <NavItem location="/" text="Home" /> : <NavItem location={`/${userId}`} text="Dashboard" />}
                </li>
                <li>
                  <NavItem
                    location="/quiz"
                    isActive={pathname.startsWith("/quiz")}
                    text="Quizzes"
                  />
                </li>
                <li>
                  <NavItem location={isLoggedIn ? `/${userId}/create` : "/login"} text="Create Quiz" />
                </li>
                {!isLoggedIn ? (
                  <>
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
                  </>
                ) : (
                  <div className="sm:hidden">
                    <NavItem location="/profile" text="Profile" />
                  </div>
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
            className="sm:flex justify-end hidden cursor-pointer"
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
