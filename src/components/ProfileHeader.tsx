"use client";

import { useUserStore } from "@/zustand/userStore";
import Image from "next/image";
import Link from "next/link";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import { format } from "date-fns";
import { PostTypes, UserType } from "@/types/type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function formatJoined(dateString: string) {
  if (!dateString) return "";
  return `Joined ${format(new Date(dateString), "MMMM yyyy")}`;
}

type ProfileHeaderProps = {
  dynamicUser: UserType;
  posts: PostTypes[];
};

export default function ProfileHeader({
  dynamicUser,
  posts,
}: ProfileHeaderProps) {
  const { user } = useUserStore();

  const userItSelfPosts = posts.filter((post) => {
    return post.user._id == dynamicUser._id;
  });

  const userItSelf = user?._id == dynamicUser._id;

  return (
    <div>
      <nav className="flex items-center justify-between p-3 text-white">
        <div className="flex items-center">
          <Link href={`/home`}>
            <IoArrowBack size={22} className="mr-4" />
          </Link>
          <h1 className="font-semibold text-sm">{dynamicUser?.name}</h1>
        </div>
        <span className="text-muted-foreground text-sm">{userItSelfPosts.length} posts</span>
      </nav>

      <div className="relative bg-[#252525] w-full h-48">
        {dynamicUser?.cover ? (
          <Image src={dynamicUser?.cover} alt="userCover" fill />
        ) : (
          ""
        )}
      </div>

      <div className="flex items-start justify-between p-5">
        <div className="flex flex-col text-white relative -top-[90px]">
          <div className="relative bg-[#252525] rounded-full shadow-sm shadow-[white] w-32 h-32 cursor-pointer">
            {dynamicUser?.image ? (
              <Image
                className="rounded-full"
                src={dynamicUser?.image}
                alt="userImage"
                fill
              />
            ) : (
              ""
            )}
          </div>
          <div className="mt-5 space-y-2">
            <h1 className="font-semibold">{dynamicUser?.name}</h1>
            <p>{dynamicUser.bio ? dynamicUser.bio : "Enter Bio"}</p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <BsCalendar2WeekFill />
              <span>{formatJoined("2025-09-19T21:20:52.196Z")}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <div>
                <span className="font-semibold text-white">
                  {dynamicUser.following?.length}
                </span>{" "}
                Following
              </div>
              <div>
                <span className="font-semibold text-white">
                  {dynamicUser.followers?.length}
                </span>{" "}
                Followers
              </div>
            </div>
          </div>
        </div>
        {userItSelf ? (
          <Dialog>
            <DialogTrigger className="text-white cursor-pointer rounded-full font-semibold border-2 px-3 duration-300 hover:bg-[#252525] py-1 border-[#ababab]">
              Edit Profile
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
