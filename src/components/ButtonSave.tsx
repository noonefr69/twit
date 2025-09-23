"use client";

import { toggleLike } from "@/actions/handleLike";
import { handleSave } from "@/actions/handleSave";
import { useUserStore } from "@/zustand/userStore";
import { useTransition } from "react";
import { BsPin } from "react-icons/bs";

type ButtonLikeProp = {
  postId: string;
};

export default function ButtonSave({ postId }: ButtonLikeProp) {
  const [isPending, startTransition] = useTransition();
  const { user, fetchUser } = useUserStore();

  const alreadySaved = user?.savedPost
    ? user.savedPost.includes(postId)
    : false;

  function handleClick() {
    startTransition(async () => {
      try {
        await handleSave(postId);
        await fetchUser();
      } catch (err) {
        console.error(err);
      }
    });
  }

  console.log(alreadySaved);

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className="flex items-center text-sm 
                duration-300 group cursor-pointer disabled:cursor-not-allowed"
    >
      <BsPin
        className={`transition-all duration-300 group-hover:text-cyan-400 group-hover:bg-[#0063946e] p-[4px] rounded-full h-6 w-6 ${
          alreadySaved ? "text-cyan-400" : "text-muted-foreground "
        }`}
      />
    </button>
  );
}
