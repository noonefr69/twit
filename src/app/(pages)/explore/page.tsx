import ExplorePosts from "@/components/ExplorePosts";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Discover trending posts and new users. Explore what's happening now.",
};

export default async function Explore() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });
  const posts = await res.json();

  return (
    <div className="text-white flex flex-col mb-16">
      <ExplorePosts posts={posts}/>
    </div>
  );
}
