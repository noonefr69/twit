import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/auth";

export default async function LilProfile() {
  const cookieHeader = (await headers()).get("cookie") || "";

  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
    headers: {
      cookie: cookieHeader,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const user = await res.json();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-start outline-none border-none">
        <div className="flex items-center justify-between mb-3 duration-300 hover:bg-[#202020] cursor-pointer rounded-full px-3 py-2">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              src={user.image || "unknown.png"}
              alt="logo.png"
              width={40}
              height={40}
            />
            <div>
              <h1 className="text-white text-sm font-semibold">{user.name}</h1>
              <h3 className="text-muted-foreground text-sm">{user.email}</h3>
            </div>
          </div>
          <RxDotsHorizontal className="text-white" />
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
