"use client";

import { UserType } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import ButtonFollow from "./ButtonFollow";
import { useUserStore } from "@/zustand/userStore";

type WhoToFollowProps = {
  usersSer: UserType[];
};

export default function WhoToFollow({ usersSer }: WhoToFollowProps) {
  const { user } = useUserStore();

  const filteredUsers = usersSer.filter((u) => u._id !== user?._id);

  return (
    <div className="mt-3 border-2 border-[#252525] rounded-md p-2">
      <h1 className="font-bold">Who to Follow</h1>
      <div className="duration-300 space-y-3 left-0 mt-2 w-full rounded-md shadow-md bg-black max-h-64 overflow-y-auto">
        {filteredUsers
          .map((userSe) => (
            <div
              key={userSe._id}
              className="flex items-center justify-between gap-2 duration-300 hover:bg-[#252525] p-1 rounded-md"
            >
              <Link href={userSe._id} className="flex items-center gap-2">
                <div className="relative bg-[#252525] h-10 w-10 rounded-full">
                  <Image
                    className="rounded-full"
                    src={userSe.image || "/unknown.png"}
                    alt={userSe.name}
                    fill
                  />
                </div>
                <h1 className="font-bold">
                  {userSe.name.length >= 10
                    ? `${userSe.name.slice(0, 10)}...`
                    : userSe.name}
                </h1>
              </Link>
              <ButtonFollow userId={userSe._id} />
            </div>
          ))
          .slice(0, 3)}
      </div>
    </div>
  );
}
