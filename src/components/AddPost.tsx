"use client";

import { handlePost } from "@/actions/handlePost";
import { useRef, useState, useTransition } from "react";
import { TbLoaderQuarter } from "react-icons/tb";

export default function AddPost() {
  const [isPending, startTransition] = useTransition();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaInput, setTextAreaInput] = useState(false);
  const [err, setErr] = useState(false);
  const [textAreaLenght, tsetTextAreaLenght] = useState(0);

  function handleTextArea() {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      tsetTextAreaLenght(textAreaRef.current.value.length);
      if (textAreaRef.current?.value.length > 280) {
        setTextAreaInput(true);
      } else {
        setTextAreaInput(false);
      }
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
        await handlePost(formData);
        if (textAreaRef.current) {
          textAreaRef.current.value = "";
          textAreaRef.current.style.height = "auto";
        }
        tsetTextAreaLenght(0);
        setTextAreaInput(false);
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <div className="relative">
      {isPending ? (
        <div className="flex z-30 items-center absolute left-0 right-0 top-0 bottom-0 justify-center p-5 bg-[#25252589]">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
        </div>
      ) : (
        ""
      )}{" "}
      <div className="border-y-[#252525] border-y-2 px-10 py-4 relative">
        <form action={handleChange} className="flex flex-col items-end ">
          <textarea
            ref={textAreaRef}
            onInput={handleTextArea}
            className="w-full duration-300 resize-none overflow-hidden outline-none border-b-2 border-b-[#252525] py-3 font-semibold text-lg bg-transparent text-white"
            required
            placeholder="What's happening?"
            name="post"
          />
          <div className="space-x-4 flex items-end">
            <span
              className={`duration-500 text-red-500 absolute left-0 px-10 ${
                err ? "opacity-100 bottom-4" : "opacity-0 bottom-5"
              }`}
            >
              {err ? "Please Enter a valid Post!" : ""}
            </span>
            <span
              className={`duration-300 ${
                textAreaLenght > 280 ? "text-red-700" : "text-white"
              }`}
            >
              {textAreaLenght > 280
                ? "-" + (textAreaLenght - 280)
                : 280 - textAreaLenght}{" "}
              / 280
            </span>
            <button
              disabled={textAreaInput}
              type="submit"
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 bg-white duration-300 hover:opacity-70 text-center flex items-center justify-center text-black w-14 h-8 rounded-full font-semibold mt-4"
            >
              {isPending ? (
                <TbLoaderQuarter className="animate-spin" size={24} />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
