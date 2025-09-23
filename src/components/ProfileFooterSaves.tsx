"use client";

import { PostTypes } from "@/types/type";
import { useUserStore } from "@/zustand/userStore";
import PostFooter from "./PostFooter";
import PostDropDown from "./PostDropDown";
import Image from "next/image";
import { timeAgo } from "@/utils/timeChanger";

type PostTypesProps = {
  posts: PostTypes[];
};

export default function ProfileFooterSaves({ posts }: PostTypesProps) {
  const { user } = useUserStore();

  const savedPosts = posts.filter((post) => {
    return user?.savedPost?.includes(post._id);
  });

  return (
    <div className="break-all">
      {savedPosts.length == 0 ? (
        <div className="text-muted-foreground font-semibold text-center mt-4">
          You don't save any post!
        </div>
      ) : (
        savedPosts.map((savedPost: PostTypes) => {
          return (
            <div
              key={savedPost._id}
              className="p-5 relative border-b-2 border-b-[#252525] text-white"
            >
              <div className="flex items-start justify-between min-w-0">
                <div className="flex items-start">
                  <div className="relative h-10 w-10 rounded-full">
                    <Image
                      src={savedPost?.user?.image}
                      alt={savedPost?.user?.image}
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <h1 className="font-semibold text-sm mx-2 truncate max-w-[120px]">
                    {savedPost?.user?.name}
                  </h1>
                  <span className="text-muted-foreground text-sm">
                    {timeAgo(savedPost?.createdAt)}
                  </span>
                </div>
                <PostDropDown post={savedPost} />
              </div>
              <pre className="my-7 whitespace-pre-wrap break-all">
                {savedPost.post}
              </pre>
              <PostFooter post={savedPost} />
            </div>
          );
        })
      )}
    </div>
  );
}
