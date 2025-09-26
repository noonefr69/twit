"use client";

import { useUserStore } from "@/zustand/userStore";
import Image from "next/image";
import Link from "next/link";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import { format } from "date-fns";
import { PostTypes, UserType } from "@/types/type";
import { useTransition } from "react";
import { handleFollow } from "@/actions/handleFollow";
import { TbLoaderQuarter } from "react-icons/tb";
import ProfileEdit from "./ProfileEdit";

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
  const { user, fetchUser } = useUserStore();
  const [isPending, startTransition] = useTransition();

  function handleChange() {
    startTransition(async () => {
      try {
        await handleFollow(dynamicUser?._id);
        await fetchUser();
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
          //   toast.error(err.message);
        } else {
          console.error("Something went wrong");
        }
      }
    });
  }

  const alreadyFollowed = user?.following?.includes(dynamicUser._id);

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
        <span className="text-muted-foreground text-sm">
          {userItSelfPosts.length} posts
        </span>
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
            <pre>{dynamicUser.bio ? dynamicUser.bio : ""}</pre>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <BsCalendar2WeekFill />
              <span>{formatJoined(dynamicUser?.createdAt!)}</span>
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
          <ProfileEdit userData={dynamicUser} />
        ) : (
          <form action={handleChange}>
            <button
              disabled={isPending}
              className="text-white disabled:cursor-not-allowed transition-all cursor-pointer text-center flex items-center justify-center rounded-full font-semibold border-2 w-36 duration-300 hover:bg-[#252525] py-1 border-[#ababab]"
              type="submit"
            >
              {isPending ? (
                <TbLoaderQuarter className="animate-spin" size={24} />
              ) : alreadyFollowed ? (
                "Unfollow"
              ) : (
                "Follow"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
