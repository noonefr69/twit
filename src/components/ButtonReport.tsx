"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState, useTransition } from "react";
import { MdReport } from "react-icons/md";
import { TbLoaderQuarter } from "react-icons/tb";
import { handleReport } from "@/actions/handleReport";

type Props = {
  postId: string;
};

export default function ButtonReport({ postId }: Props) {
  const [isPending, startTransition] = useTransition();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaInput, setTextAreaInput] = useState(false);
  const [err, setErr] = useState(false);
  const [textAreaLength, setTextAreaLength] = useState(0);
  const [open, setOpen] = useState(false);

  function handleTextArea() {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      setTextAreaLength(textAreaRef.current.value.length);
      setTextAreaInput(textAreaRef.current.value.length > 280);
    }
  }

  function handleChange(formData: FormData) {
    if (textAreaRef.current?.value.trim() == "") {
      setErr(true);
    } else {
      setErr(false);
    }
    startTransition(async () => {
      try {
        await handleReport(formData, postId);
        setOpen(false);
        if (textAreaRef.current) {
          textAreaRef.current.value = "";
          textAreaRef.current.style.height = "auto";
        }
        setTextAreaLength(0);
        setTextAreaInput(false);
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center px-2 gap-2 py-1 cursor-pointer w-full">
        <MdReport /> Report
      </DialogTrigger>
      <DialogContent className="bg-black flex flex-col min-h-64 max-h-[50rem] overflow-y-auto py-10 justify-center border-2 border-[#252525]">
        <DialogHeader>
          <DialogTitle className="text-white flex mb-4 items-center justify-between">
            Why are you reporting this post?
          </DialogTitle>
          <div className="relative">
            {" "}
            <form action={handleChange} className="flex flex-col items-end">
              <textarea
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    // allow space in textarea tnx chatgpt <3
                    e.stopPropagation();
                  }
                }}
                ref={textAreaRef}
                onInput={handleTextArea}
                className="w-full whitespace-pre-wrap duration-300 resize-none overflow-hidden outline-none border-y-2 border-y-[#252525] py-3 font-semibold text-lg bg-transparent text-white"
                required
                placeholder="Reason for reporting"
                name="report"
              />
              <div className="space-x-4 flex items-end">
                <span
                  className={`duration-500 text-red-500 absolute left-0 ${
                    err ? "opacity-100 bottom-4" : "opacity-0 bottom-5"
                  }`}
                >
                  {err ? "Please enter a valid reason!" : ""}
                </span>
                <span
                  className={`duration-300 ${
                    textAreaLength > 280 ? "text-red-700" : "text-white"
                  }`}
                >
                  {textAreaLength > 280
                    ? "-" + (textAreaLength - 280)
                    : 280 - textAreaLength}{" "}
                  / 280
                </span>
                <button
                  disabled={isPending || textAreaInput}
                  type="submit"
                  className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 bg-white duration-300 hover:opacity-70 text-center flex items-center justify-center text-black w-18 h-8 rounded-full font-semibold mt-4"
                >
                  {isPending ? (
                    <TbLoaderQuarter className="animate-spin" size={24} />
                  ) : (
                    "Report"
                  )}
                </button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
