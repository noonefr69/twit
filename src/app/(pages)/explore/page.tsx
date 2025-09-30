import Posts from "@/components/Posts";
import { headers } from "next/headers";
import React, { Suspense } from "react";
import { IoIosSearch } from "react-icons/io";

export default async function Explore() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });
  const posts = await res.json();

  return (
    <div className="text-white flex flex-col mb-16">
      {/* <div className="relative w-full mt-4 px-4 mb-2 ">
        <IoIosSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 w-full rounded-full outline-none border-2 focus:border-[#525252] duration-300 border-[#252525] p-2"
        />
      </div> */}
      <Suspense
        fallback={
          <div className="flex z-30 items-center justify-center p-8">
            <div className="h-7 w-7 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
          </div>
        }
      >
        <Posts posts={posts} />
      </Suspense>
    </div>
  );
}
