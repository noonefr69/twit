"use client";

import { handleDelete } from "@/actions/handleDelete";
import { useTransition } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

type ButtonDeleteProps = {
  postId: string;
};

export default function ButtonDelete({ postId }: ButtonDeleteProps) {
  const [isPending, startTransition] = useTransition();

  function handleChange() {
    startTransition(async () => {
      try {
        await handleDelete(postId);
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

  return (
    <form
      className="flex items-center gap-2 cursor-pointer group"
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
