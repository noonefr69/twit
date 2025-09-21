import { headers } from "next/headers";
import PostFooter from "./PostFooter";
import PostDropDown from "./PostDropDown";
import Image from "next/image";
import { PostTypes } from "@/types/type";
import { formatDistanceToNow } from "date-fns";
import { auth } from "@/auth";
import User from "@/models/user";

function timeAgo(dateString?: string) {
  if (!dateString) return "";
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export default async function ProfileFooterPosts() {
  const res = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });
  const posts = await res.json();

  return (
    <div>
      {posts.map((post: PostTypes) => {
        return (
          <div
            key={post._id}
            className="p-5 relative border-b-2 border-b-[#252525] text-white"
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
              <PostDropDown />
            </div>
            <pre className="my-7 whitespace-pre-wrap break-all">
              {post.post}
            </pre>
            <PostFooter post={post} />
          </div>
        );
      })}
    </div>
  );
}
