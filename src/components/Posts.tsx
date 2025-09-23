import React from "react";
import { headers } from "next/headers";
import { PostTypes } from "@/types/type";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import PostDropDown from "./PostDropDown";
import PostFooter from "./PostFooter";
import { auth } from "@/auth";
import User from "@/models/user";
import { timeAgo } from "@/utils/timeChanger";

export default async function Posts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });
  const posts = await res.json();

  return (
    <div className=" ">
      {posts.map((post: PostTypes) => {
        return (
          <div
            key={post._id}
            className="p-5 relative border-b-2 border-b-[#252525]"
          >
            <div className="flex items-start justify-between min-w-0">
              <div className="flex items-start">
                <div className="relative h-10 w-10 rounded-full">
                  <Image
                    src={post?.user?.image}
                    alt={post?.user?.image}
                    fill
                    className="rounded-full"
                  />
                </div>
                <h1 className="font-semibold text-sm mx-2 truncate max-w-[120px]">
                  {post?.user?.name}
                </h1>
                <span className="text-muted-foreground text-sm">
                  {timeAgo(post?.createdAt)}
                </span>
              </div>
              <PostDropDown post={post} />
            </div>
            <pre className="mt-2 whitespace-pre-wrap break-all">
              {post.post}
            </pre>
            <PostFooter post={post} />
          </div>
        );
      })}
    </div>
  );
}
