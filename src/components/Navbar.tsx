import Link from "next/link";
import React from "react";
import LilProfile from "./LilProfile";
import { Newsreader } from "next/font/google";
import { MdHomeFilled } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";

const newsreader = Newsreader({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const navLinks = [
  {
    label: "Home",
    href: "/home",
    icon: <MdHomeFilled />,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: <IoIosSearch />,
  },
  {
    label: "notifications",
    href: "/notifications",
    icon: <IoMdNotificationsOutline />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <BsPerson />,
  },
];

export default function Navbar() {
  return (
    <nav className="flex flex-col justify-between h-screen">
      <div className="space-y-2">
        {" "}
        <Link
          href={`/home`}
          className={`text-2xl relative font-semibold  px-3 py-2 rounded-full mt-3 flex items-center justify-center duration-300 hover:bg-[#202020] text-white w-fit ${newsreader.className}`}
        >
          <span className="relative top-1">TWIT</span>
        </Link>
        {navLinks.map((navLink, index) => {
          return (
            <Link
              key={index}
              className={`text-2xl px-3 py-2 rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
              href={navLink.href}
            >
              {navLink?.icon} {navLink.label}
            </Link>
          );
        })}
      </div>
      <LilProfile />
    </nav>
  );
}
