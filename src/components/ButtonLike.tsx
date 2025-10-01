"use client";

import { toggleLike } from "@/actions/handleLike";
import { useUserStore } from "@/zustand/userStore";
import { useTransition } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

type ButtonLikeProp = {
  postId: string;
  postLiked: string[];
};

export default function ButtonLike({ postId, postLiked }: ButtonLikeProp) {
  const [isPending, startTransition] = useTransition();
  const { user } = useUserStore();
  const alreadyLiked = user?._id ? postLiked.includes(user._id) : false;

  function handleClick() {
    startTransition(() => {
      toast.promise(
        toggleLike(postId),
        {
          loading: alreadyLiked ? "Unliking..." : "Liking...",
          success: alreadyLiked ? "Unliked!" : "Liked!",
          error: (err) => err?.message || "Something went wrong",
        }
      );
    });
  }

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className="flex items-center text-sm text-muted-foreground 
                duration-300 disabled:cursor-progress group cursor-pointer"
    >
      <FaHeart
        className={`transition-all duration-300  group-hover:text-red-700 group-hover:bg-[#9400006e] p-[5px] rounded-full h-6 w-6 ${
          alreadyLiked ? "text-red-900" : "text-muted-foreground"
        }`}
      />
      <span
        className={`transition-all font-semibold duration-300 group-hover:text-red-700`}
      >
        {postLiked.length}
      </span>
    </button>
  );
}
