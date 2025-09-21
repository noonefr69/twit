"use client";

import { useUserStore } from "@/zustand/userStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

export default function ProfileHeader() {
  const { user, error, loading, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      <nav className="flex items-center justify-between p-3 text-white">
        <div className="flex items-center">
          <Link href={`/home`}>
            <IoArrowBack size={22} className="mr-4" />
          </Link>
          <h1 className="font-semibold text-sm">{user?.name}</h1>
        </div>
        <span className="text-muted-foreground text-sm">0 posts</span>
      </nav>

      <div className="relative bg-[#252525] w-full h-48">
        {user?.cover ? <Image src={user?.cover} alt="userCover" fill /> : ""}
      </div>

      <div className="flex items-start justify-between p-5">
        <div className="flex flex-col text-white relative -top-[90px]">
          <div className="relative bg-[#252525] rounded-full shadow-sm shadow-[white] w-32 h-32 cursor-pointer">
            {user?.image ? (
              <Image
                className="rounded-full"
                src={user?.image}
                alt="userImage"
                fill
              />
            ) : (
              ""
            )}
          </div>
          <div className="mt-5 space-y-2">
            <h1 className="font-semibold">{user?.name}</h1>
            {/* <h1 className="font-semibold">{user?.email}</h1> */}
            <p>bio</p>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <BsCalendar2WeekFill />
              <span>
                {/* Joined {format(new Date(user?.createdAt), "MMMM yyyy")} */}
              </span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <div>
                <span className="font-semibold text-white">0</span> Following
              </div>
              <div>
                <span className="font-semibold text-white">0</span> Followers
              </div>
            </div>
          </div>
        </div>
        <button className="text-white cursor-pointer rounded-full font-semibold border-2 px-3 duration-300 hover:bg-[#252525] py-1 border-[#ababab]">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
