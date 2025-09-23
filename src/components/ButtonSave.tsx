"use client";

import { handleSave } from "@/actions/handleSave";
import { useUserStore } from "@/zustand/userStore";
import { useTransition } from "react";
import { RiPushpin2Fill } from "react-icons/ri";

type ButtonLikeProp = {
  postId: string;
  p?: number;
  w?: number;
  label?: string;
};

export default function ButtonSave({ postId, p, label, w }: ButtonLikeProp) {
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

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      style={{ width: `${w}%` }}
      className="flex items-center
                duration-300 group cursor-pointer disabled:cursor-not-allowed p-2 px-2 gap-2"
    >
      <RiPushpin2Fill
        style={{ padding: `${p}px` }}
        className={`transition-all duration-300 group-hover:text-cyan-400 group-hover:bg-[#0063946e] rounded-full h-6 w-6 ${
          alreadySaved ? "text-cyan-400" : "text-muted-foreground "
        }`}
      />
      {label}
    </button>
  );
}
