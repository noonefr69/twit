"use client";

import { MdPerson } from "react-icons/md";
import { RiPushpin2Line } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoIosSearch, IoMdNotifications } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { Newsreader } from "next/font/google";
import { useUserStore } from "@/zustand/userStore";
import { useEffect } from "react";
import Link from "next/link";
import ButtonAddPostFromNavbar from "./ButtonAddPostFromNavbar";
import { RiPushpin2Fill } from "react-icons/ri";
import { usePathname } from "next/navigation";

const newsreader = Newsreader({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function NavLinks() {
  const { user, fetchUser } = useUserStore();
  const pathName = decodeURIComponent(usePathname());

  console.log(pathName);

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
        className={`text-2xl px-3 py-2 transition-all rounded-full text-white flex items-center gap-2 w-fit duration-300 hover:bg-[#202020]`}
        href={`/home`}
      >
        <span
          className={`items-center flex gap-2 ${
            pathName == "/home" ? "hidden" : "flex"
          }`}
        >
          <GoHome /> Home
        </span>
        <span
          className={`items-center font-bold gap-2 ${
            pathName == "/home" ? "flex" : "hidden"
          }`}
        >
          <GoHomeFill /> Home
        </span>
      </Link>
      <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/explore`}
      >
        <span
          className={`items-center flex gap-2 ${
            pathName == "/explore" ? "hidden" : "flex"
          }`}
        >
          <IoIosSearch /> Explore
        </span>
        <span
          className={`items-center font-bold gap-2 ${
            pathName == "/explore" ? "flex" : "hidden"
          }`}
        >
          <FaSearch /> Explore
        </span>
      </Link>
      <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/notifications`}
      >
        <span
          className={`items-center flex gap-2 ${
            pathName == "/notifications" ? "hidden" : "flex"
          }`}
        >
          <IoMdNotificationsOutline /> Notifications
        </span>
        <span
          className={`items-center font-bold gap-2 ${
            pathName == "/notifications" ? "flex" : "hidden"
          }`}
        >
          <IoMdNotifications /> Notifications
        </span>
      </Link>
      <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/saved`}
      >
        <span
          className={`items-center flex gap-2 ${
            pathName == "/saved" ? "hidden" : "flex"
          }`}
        >
          <RiPushpin2Line /> Saved
        </span>
        <span
          className={`items-center font-bold gap-2 ${
            pathName == "/saved" ? "flex" : "hidden"
          }`}
        >
          <RiPushpin2Fill /> Saved
        </span>
      </Link>
      <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/${user?.name}`}
      >
        <span
          className={`items-center flex gap-2 ${
            pathName == `/${user?.name}` ? "hidden" : "flex"
          }`}
        >
          <BsPerson /> Profile
        </span>
        <span
          className={`items-center font-bold gap-2 ${
            pathName == `/${user?.name}` ? "flex" : "hidden"
          }`}
        >
          <MdPerson /> Profile
        </span>
      </Link>
      <ButtonAddPostFromNavbar />
    </div>
  );
}
