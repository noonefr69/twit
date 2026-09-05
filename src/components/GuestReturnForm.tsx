"use client";

import { useState, useTransition } from "react";
import { handleGuestReturn } from "@/actions/guestSignIn";
import toast from "react-hot-toast";

export default function GuestReturnForm() {
  const [isPending, startTransition] = useTransition();
  const [showInput, setShowInput] = useState(false);

  async function action(formData: FormData) {
    startTransition(async () => {
      const res = await handleGuestReturn(formData);
      if (res?.error) {
        toast.error(res.error);
      }
    });
  }

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="text-blue-400 text-sm hover:underline cursor-pointer mt-2"
      >
        Have a guest code?
      </button>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-2 w-full max-w-xs md:w-[17rem] mt-2">
      <div className="flex gap-2">
        <input
          name="code"
          type="text"
          placeholder="Enter code (e.g. 7K3F9Q)"
          className="bg-black border border-[#333] text-white rounded-full px-4 py-1 text-sm focus:border-blue-500 outline-none flex-1 uppercase"
          required
        />
        <button
          disabled={isPending}
          type="submit"
          className="bg-white text-black text-xs font-bold px-4 py-1 rounded-full hover:opacity-80 disabled:opacity-50"
        >
          {isPending ? "..." : "Go"}
        </button>
      </div>
      <button
        type="button"
        onClick={() => setShowInput(false)}
        className="text-gray-500 text-xs hover:underline self-start px-2"
      >
        Cancel
      </button>
    </form>
  );
}
