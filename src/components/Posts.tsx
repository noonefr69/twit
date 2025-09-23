import React from "react";
import { headers } from "next/headers";
import { PostTypes } from "@/types/type";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import PostDropDown from "./PostDropDown";
import PostFooter from "./PostFooter";
import { auth } from "@/auth";
import User from "@/models/user";

function timeAgo(dateString: string) {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export default async function Posts() {
  const cookieHeader = (await headers()).get("cookie") || "";

  const postRes = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
    headers: {
      cookie: cookieHeader,
    },
  });
  if (!postRes.ok) {
    throw new Error("Failed to fetch user");
  }

  const posts = await postRes.json();

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
