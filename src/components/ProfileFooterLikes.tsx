"use client";

import { PostTypes } from "@/types/type";
import { formatDistanceToNow } from "date-fns";
import { useUserStore } from "@/zustand/userStore";
import PostFooter from "./PostFooter";
import PostDropDown from "./PostDropDown";
import Image from "next/image";
import { timeAgo } from "@/utils/timeChanger";
import Link from "next/link";

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
      {likedPosts.length == 0 ? (
        <div className="text-muted-foreground font-semibold text-center mt-4">
          You don't like any post!
        </div>
      ) : (
        likedPosts.map((likedPost: PostTypes) => {
          return (
            <div
              key={likedPost._id}
              className="p-5 relative border-b-2 border-b-[#252525] text-white"
            >
              <div className="flex items-start justify-between min-w-0">
                <Link href={`/${likedPost.user._id}`} className="flex items-start group">
                  <div className="relative h-10 w-10 rounded-full">
                    <Image
                      src={likedPost?.user?.image}
                      alt={likedPost?.user?.image}
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <h1 className="font-semibold text-sm mx-2 truncate max-w-[120px] group-hover:underline">
                    {likedPost?.user?.name}
                  </h1>
                  <span className="text-muted-foreground text-sm">
                    {timeAgo(likedPost?.createdAt)}
                  </span>
                </Link>
                <PostDropDown post={likedPost} />
              </div>
              <pre className="my-7 whitespace-pre-wrap break-all">
                {likedPost.post}
              </pre>
              <PostFooter post={likedPost} />
            </div>
          );
        })
      )}
    </div>
  );
}
