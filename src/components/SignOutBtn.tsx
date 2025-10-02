import { UserType } from "@/types/type";
import Image from "next/image";
import React from "react";

type SignOutBtnProps = {
  user: UserType;
};

export default function SignOutBtn({ user }: SignOutBtnProps) {
  return (
    <div
      className={`text-2xl px-3 py-2 md:hidden rounded-full flex items-center gap-2 text-white w-fit duration-300 hover:bg-[#202020] `}
    >
      <div className="relative h-8 w-8 rounded-full">
        <Image
          src={user?.image || "/unknown.png"}
          alt="userImage"
          fill
          className="rounded-full"
        />
      </div>
    </div>
  );
}
