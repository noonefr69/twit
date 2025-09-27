"use client";

import { UserType } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { format } from "date-fns";
import { useRef, useState } from "react";

type SearchInputProps = {
  users: UserType[];
};

function formatJoined(dateString: string) {
  if (!dateString) return "";
  return `Joined ${format(new Date(dateString), "MMMM yyyy")}`;
}

export default function SearchInput({ users }: SearchInputProps) {
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filterUsers =
    inputVal.trim() === ""
      ? users
      : users.filter((user) =>
          user.name.toLowerCase().includes(inputVal.toLowerCase())
        );

  function handleUserClick() {
    setInputVal("");
    inputRef.current?.blur();
  }

  return (
    <div className="relative w-full max-w-sm group">
      <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        ref={inputRef}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        type="text"
        placeholder="Search"
        className="pl-10 w-full rounded-full outline-none border-2 focus:border-[#525252] duration-300 border-[#252525] p-2"
      />
      <div className="hidden duration-300 space-y-3 group-focus-within:block absolute top-full min-h-fit left-0 mt-2 w-full rounded-md shadow-md z-40 bg-black border-2 border-[#252525] p-2 max-h-64 overflow-y-auto">
        {filterUsers.map((user) => (
          <Link
            key={user._id}
            href={user._id}
            onClick={handleUserClick}
            className="flex items-center gap-2 duration-300 hover:bg-[#252525] p-1 rounded-md"
          >
            <div className="relative bg-[#252525] h-10 w-10 rounded-full">
              <Image
                className="rounded-full"
                src={user.image || "/unknown.png"}
                alt={user.name}
                fill
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold">{user.name}</h1>
              <h1 className="text-sm text-muted-foreground">
                {formatJoined(user.createdAt!)}
              </h1>
            </div>
          </Link>
        ))}
        {filterUsers.length === 0 && (
          <p className="text-center text-muted-foreground py-2">
            No users found
          </p>
        )}
      </div>
    </div>
  );
}
