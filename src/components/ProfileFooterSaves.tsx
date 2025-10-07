"use client";

import { PostTypes } from "@/types/type";
import { useUserStore } from "@/zustand/userStore";
import PostFooter from "./PostFooter";
import PostDropDown from "./PostDropDown";
import Image from "next/image";
import { timeAgo } from "@/utils/timeChanger";
import Link from "next/link";

type PostTypesProps = {
  posts: PostTypes[];
};

export default function ProfileFooterSaves({ posts }: PostTypesProps) {
  const { user } = useUserStore();

  const savedPosts = posts.filter((post) => {
    return user?.savedPost?.includes(post._id);
  });

  return (
    <div className="">
      {savedPosts.length == 0 ? (
        <div className="text-muted-foreground font-semibold text-center mt-4">
          You don&apos;t save any post!
        </div>
      ) : (
        savedPosts.map((savedPost: PostTypes) => {
          return (
            <div
              key={savedPost._id}
              className="md:p-5 px-4 py-5 relative border-b-2 border-b-[#252525] text-white"
            >
              <div className="flex items-start justify-between min-w-0">
                <Link
                  href={`/${savedPost.user._id}`}
                  className="flex items-start group"
                >
                  <div className="relative h-10 w-10 rounded-full">
                    <Image
                      src={savedPost?.user?.image}
                      alt={savedPost?.user?.image}
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <h1 className="font-semibold text-sm mx-2 truncate max-w-[120px] group-hover:underline">
                    {savedPost?.user?.name}
                  </h1>
                  <span className="text-muted-foreground text-sm">
                    {timeAgo(savedPost?.createdAt)}
                  </span>
                </Link>
                <PostDropDown post={savedPost} />
              </div>
              <pre className="my-7 whitespace-pre-wrap break-words">
                {savedPost.post}
              </pre>
              {savedPost.image ? (
                <div className="relative h-96 w-full rounded-md mt-4 bg-[#252525]">
                  <Image
                    src={savedPost.image}
                    alt={savedPost.image}
                    fill
                    className="rounded-md"
                    loading="lazy"
                  />
                </div>
              ) : (
                ""
              )}
              <PostFooter post={savedPost} />
            </div>
          );
        })
      )}
    </div>
  );
}
