"use client";

import { UserType } from "@/types/type";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/auth";
import { signOuthandle } from "@/actions/signOuthandle";
import { IoLogOutOutline } from "react-icons/io5";

type SignOutBtnProps = {
  user: UserType;
};

export default function SignOutBtn({ user }: SignOutBtnProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`text-2xl px-3 cursor-pointer py-2 md:hidden rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
      >
        <div className="relative h-8 w-8 rounded-full bg-[#252525]">
          <Image
            src={user?.image || "/unknown.png"}
            alt="userImage"
            fill
            className="rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black relative rounded-xl -top-4 border-[#202020] shadow-sm shadow-[#ffffff59] outline-none w-fit p-0 m-0 ">
        <DropdownMenuItem className="w-full focus:bg-transparent p-0 m-0">
          <form className="w-full" action={signOuthandle}>
            <button
              type="submit"
              className="w-full justify-center flex items-center gap-2 font-bold text-white text-left break-words whitespace-normal py-2 cursor-pointer duration-300 px-3 my-2 hover:bg-[#202020]"
            >
              log out <IoLogOutOutline />
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
