"use client";

import { handleFollow } from "@/actions/handleFollow";
import { useTransition } from "react";
import { useUserStore } from "@/zustand/userStore";
import { BsPersonFill } from "react-icons/bs";

type ButtonFollowProps = {
  userId: string;
  w?: number;
};

export default function ButtonFollow({ userId, w }: ButtonFollowProps) {
  const [isPending, startTransition] = useTransition();
  const { user, fetchUser } = useUserStore();

  function handleChange() {
    startTransition(async () => {
      try {
        await handleFollow(userId);
        await fetchUser();
        // toast.success("Pots deleted successfully!");
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
        <BsPersonFill
          className={` duration-300 group-hover:text-green-600 group-hover:bg-[#00940f6e] rounded-full ${
            alreadyFollowed ? "text-green-600" : "text-muted-foreground"
          }`}
        />
        {alreadyFollowed ? "Unfollow" : "Follow"}
      </button>
    </form>
  );
}
