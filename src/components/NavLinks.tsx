"use client";

import { MdHomeFilled } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { Newsreader } from "next/font/google";
import { useUserStore } from "@/zustand/userStore";
import { useEffect } from "react";
import Link from "next/link";
import ButtonAddPostFromNavbar from "./ButtonAddPostFromNavbar";

const newsreader = Newsreader({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function NavLinks() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="space-y-2">
      {" "}
      <Link
        href={`/home`}
        className={`text-2xl relative font-semibold  px-3 py-2 rounded-full mt-3 flex items-center justify-center duration-300 hover:bg-[#202020] text-white w-fit ${newsreader.className}`}
      >
        <span className="relative top-1">TWIT</span>
      </Link>
      <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/home`}
      >
        <MdHomeFilled /> Home
      </Link>
      <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/explore`}
      >
        <IoIosSearch /> Explore
      </Link>
      <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/notifications`}
      >
        <IoMdNotificationsOutline /> Notifications
      </Link>
      <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/${user?.name}`}
      >
        <BsPerson /> Profile
      </Link>
      <ButtonAddPostFromNavbar />
    </div>
  );
}
