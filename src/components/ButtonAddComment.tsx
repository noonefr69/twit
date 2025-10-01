"use client";

import { handleComment } from "@/actions/handleComment";
import { PostTypes } from "@/types/type";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { TbLoaderQuarter } from "react-icons/tb";

type ButtonAddCommentProps = {
  post: PostTypes;
};

export default function ButtonAddComment({ post }: ButtonAddCommentProps) {
  const [isPending, startTransition] = useTransition();

  function handleChange(formData: FormData) {
    startTransition(async () => {
      try {
        await handleComment(formData);
        toast.success("Comment added successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Somthing went wrong!");
      }
    });
  }
  return (
    <form action={handleChange} className="relative pb-14">
      <textarea
        className="w-full duration-300 resize-none overflow-hidden outline-none border-b-2 border-b-[#252525] py-3 font-semibold text-lg bg-transparent text-white"
        required
        placeholder="Enter your comment"
        name="comment"
      />
      <input type="hidden" name="postId" id="postId" defaultValue={post._id} />
      <button
        disabled={isPending}
        type="submit"
        className="cursor-pointer absolute right-0 disabled:cursor-not-allowed disabled:opacity-60 bg-white duration-300 hover:opacity-70 flex items-center justify-center text-black w-14 h-8 rounded-full font-semibold mt-4"
      >
        {isPending ? (
          <TbLoaderQuarter className="animate-spin" size={24} />
        ) : (
          "Post"
        )}
      </button>
    </form>
  );
}
