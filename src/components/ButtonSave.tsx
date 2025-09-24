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
    <form
      style={{ width: `${w}%` }}
      className="flex items-center gap-2 cursor-pointer group"
      action={handleClick}
    >
      <button
        disabled={isPending}
        type="submit"
        className="flex items-center gap-2 disabled:cursor-not-allowed cursor-pointer px-2 py-1 w-full"
      >
        <RiPushpin2Fill
          style={{ padding: `${p}px` }}
          className={`transition-all duration-300 group-hover:text-cyan-400 group-hover:bg-[#0063946e] rounded-full h-6 w-6 ${
            alreadySaved ? "text-cyan-400" : "text-muted-foreground "
          }`}
        />{" "}
        {label}
      </button>
    </form>
  );
}
