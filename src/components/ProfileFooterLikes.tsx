"use client";

import { PostTypes } from "@/types/type";
import { formatDistanceToNow } from "date-fns";
import { useUserStore } from "@/zustand/userStore";
import PostFooter from "./PostFooter";
import PostDropDown from "./PostDropDown";
import Image from "next/image";

function timeAgo(dateString?: string) {
  if (!dateString) return "";
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

type PostTypesProps = {
  posts: PostTypes[];
};

export default function ProfileFooterLikes({ posts }: PostTypesProps) {
  const { user } = useUserStore();

  const likedPosts = user?._id
    ? posts.filter((post) => post.likes.includes(user._id!))
    : [];

  return (
    <div className="break-all">
      {likedPosts.length == 0
        ? "ssss"
        : likedPosts.map((likedPost: PostTypes) => {
            return (
              <div
                key={likedPost._id}
                className="p-5 relative border-b-2 border-b-[#252525] text-white"
              >
                <div className="flex items-start justify-between min-w-0">
                  <div className="flex items-start">
                    <div className="relative h-10 w-10 rounded-full">
                      <Image
                        src={likedPost?.user?.image}
                        alt={likedPost?.user?.image}
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <h1 className="font-semibold text-sm mx-2 truncate max-w-[120px]">
                      {likedPost?.user?.name}
                    </h1>
                    <span className="text-muted-foreground text-sm">
                      {timeAgo(likedPost?.createdAt)}
                    </span>
                  </div>
                  <PostDropDown post={likedPost} />
                </div>
                <pre className="my-7 whitespace-pre-wrap break-all">
                  {likedPost.post}
                </pre>
                <PostFooter post={likedPost} />
              </div>
            );
          })}
    </div>
  );
}
