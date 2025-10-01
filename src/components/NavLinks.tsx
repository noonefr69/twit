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

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="flex md:flex-col flex-row md:relative md:bg-transparent bg-[black] border-2 md:border-transparent z-[9999] border-[#252525] p-2 rounded-t-xl fixed bottom-0 left-0 right-0 justify-between space-y-2">
      {" "}
      <Link
        href={`/home`}
        className={`text-2xl relative font-semibold hidden md:flex px-3 py-2 rounded-full mt-3 items-center justify-center duration-300 hover:bg-[#202020] text-white w-fit ${newsreader.className}`}
      >
        <span className="relative top-1 flex">
          T <span className="hidden lg:flex">WIT</span>
        </span>
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
          <GoHome /> <span className="lg:flex hidden">Home</span>
        </span>
        <span
          className={`items-center font-bold gap-2 ${
            pathName == "/home" ? "flex" : "hidden"
          }`}
        >
          <GoHomeFill /> <span className="lg:flex hidden">Home</span>
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
          <IoIosSearch /> <span className="hidden lg:flex">Explore</span>
        </span>
        <span
          className={`items-center font-bold gap-2 ${
            pathName == "/explore" ? "flex" : "hidden"
          }`}
        >
          <FaSearch /> <span className="hidden lg:flex">Explore</span>
        </span>
      </Link>
      {/* <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/notifications`}
      >
        <span
          className={`items-center flex gap-2 ${
            pathName == "/notifications" ? "hidden" : "flex"
          }`}
        >
          <IoMdNotificationsOutline />{" "}
          <span className="hidden lg:flex">Notifications</span>
        </span>
        <span
          className={`items-center font-bold gap-2 ${
            pathName == "/notifications" ? "flex" : "hidden"
          }`}
        >
          <IoMdNotifications />{" "}
          <span className="hidden lg:flex">Notifications</span>
        </span>
      </Link> */}
      <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/saved`}
      >
        <span
          className={`items-center flex gap-2 ${
            pathName == "/saved" ? "hidden" : "flex"
          }`}
        >
          <RiPushpin2Line /> <span className="hidden lg:flex">Saved</span>
        </span>
        <span
          className={`items-center font-bold gap-2 ${
            pathName == "/saved" ? "flex" : "hidden"
          }`}
        >
          <RiPushpin2Fill /> <span className="hidden lg:flex">Saved</span>
        </span>
      </Link>
      <Link
        className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
        href={`/${user?._id}`}
      >
        <span
          className={`items-center flex gap-2 ${
            pathName == `/${user?._id}` ? "hidden" : "flex"
          }`}
        >
          <BsPerson /> <span className="hidden lg:flex">Profile</span>
        </span>
        <span
          className={`items-center font-bold gap-2 ${
            pathName == `/${user?._id}` ? "flex" : "hidden"
          }`}
        >
          <MdPerson /> <span className="hidden lg:flex">Profile</span>
        </span>
      </Link>
      <ButtonAddPostFromNavbar />
    </div>
  );
}
