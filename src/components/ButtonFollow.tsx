"use client";

import { handleFollow } from "@/actions/handleFollow";
import { useTransition } from "react";
import { useUserStore } from "@/zustand/userStore";
import { BsPersonFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { TbLoaderQuarter } from "react-icons/tb";

type ButtonFollowProps = {
  userId: string;
  w?: number;
};

export default function ButtonFollow({ userId, w }: ButtonFollowProps) {
  const [isPending, startTransition] = useTransition();
  const { user, fetchUser } = useUserStore();

  function handleChange() {
    startTransition(() => {
      toast.promise(
        (async () => {
          await handleFollow(userId);
          await fetchUser();
        })(),
        {
          loading: alreadyFollowed ? "Unfollowing..." : "Following...",
          success: alreadyFollowed ? "Unfollowed!" : "Followed!",
          error: (err) => err?.message || "Something went wrong",
        }
      );
    });
  }

  const alreadyFollowed = user?.following?.includes(userId);

  return (
    <form
      style={{ width: `${w}%` }}
      className="flex items-center gap-2 cursor-pointer group "
      action={handleChange}
    >
      <button
        disabled={isPending}
        type="submit"
        className="flex items-center gap-2 disabled:cursor-not-allowed cursor-pointer w-full px-2 py-1 "
      >
        {isPending ? (
          <TbLoaderQuarter className="animate-spin" size={24} />
        ) : alreadyFollowed ? (
          <>
            <BsPersonFill
              className={` duration-300 group-hover:text-green-600 group-hover:bg-[#00940f6e] rounded-full ${
                alreadyFollowed ? "text-green-600" : "text-muted-foreground"
              }`}
            />
            Unfollow
          </>
        ) : (
          <>
            <BsPersonFill
              className={` duration-300 group-hover:text-green-600 group-hover:bg-[#00940f6e] rounded-full ${
                alreadyFollowed ? "text-green-600" : "text-muted-foreground"
              }`}
            />
            Follow
          </>
        )}
      </button>
    </form>
  );
}
