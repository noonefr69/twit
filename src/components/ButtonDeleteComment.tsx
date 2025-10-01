"use client";

import { handleDeleteComment } from "@/actions/handleDeleteComment";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";

type ButtonDeleteCommentProps = {
  commentId: string;
  postId: string;
};

export default function ButtonDeleteComment({
  commentId,
  postId,
}: ButtonDeleteCommentProps) {
  const [isPending, startTransition] = useTransition();

  function handleChange() {
    startTransition(async () => {
      try {
        await handleDeleteComment(postId, commentId);
        toast.success("Comment deleted successfully!");
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
          toast.error(err.message);
        } else {
          console.error("Something went wrong");
        }
      }
    });
  }

  return (
    <form
      className="flex items-center gap-2 cursor-pointer group w-full"
      action={handleChange}
    >
      <button
        disabled={isPending}
        type="submit"
        className="flex items-center gap-2 disabled:cursor-not-allowed cursor-pointer px-2 py-1 w-full"
      >
        <FaRegTrashAlt size={20} />
        Delete
      </button>
    </form>
  );
}
