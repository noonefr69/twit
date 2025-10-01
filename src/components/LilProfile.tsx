import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function LilProfile() {
  const session = await auth();
  if (!session) redirect("/");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });
  const user = await res.json();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-start outline-none border-none hidden md:flex w-full">
        <div className="flex items-center justify-between w-full mb-3 duration-300 hover:bg-[#202020] cursor-pointer rounded-full px-3 py-2">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              src={user.image || "unknown.png"}
              alt="logo.png"
              width={40}
              height={40}
            />
            <div className="lg:flex flex-col hidden">
              <h1 className="text-white text-sm font-semibold">{user.name}</h1>
              <h3 className="text-muted-foreground text-sm">{user.email}</h3>
            </div>
          </div>
          <RxDotsHorizontal className="text-white lg:flex hidden" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black relative rounded-xl -top-2 border-[#202020] shadow-sm shadow-[#ffffff59] outline-none w-72 p-0 m-0 ">
        <DropdownMenuItem className="w-full focus:bg-transparent p-0 m-0">
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="w-full font-bold text-white text-left break-words whitespace-normal py-3 cursor-pointer duration-300 px-3 my-4 hover:bg-[#202020]"
            >
              Log out {user.email}
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
