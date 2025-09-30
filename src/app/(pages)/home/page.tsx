import { auth } from "@/auth";
import AddPost from "@/components/AddPost";
import Posts from "@/components/Posts";
import PostsFollowing from "@/components/PostsFollowing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/");

  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });
  const posts = await res.json();

  return (
    <div className="text-white">
      <div className="">
        <Tabs defaultValue="forYou" className="w-full gap-0">
          <TabsList className="w-full bg-[#000000e0] m-0 p-0 h-fit rounded-none sticky top-0 z-30">
            <TabsTrigger
              className="cursor-pointer transition-all duration-300 py-4 data-[state=active]:hover:bg-[#252525] hover:bg-[#252525] rounded-none border-b-2 data-[state=active]:border-b-blue-200 text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:font-bold"
              value="forYou"
            >
              For you
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer transition-all duration-300 py-4 data-[state=active]:hover:bg-[#252525] hover:bg-[#252525] rounded-none border-b-2 data-[state=active]:border-b-blue-200 text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:font-bold"
              value="following"
            >
              Following
            </TabsTrigger>
          </TabsList>
          <div className="">
            <AddPost />
            <TabsContent value="forYou">
              <Posts posts={posts} />
              <span className="text-muted-foreground text-center w-full flex items-center justify-center my-4">
                End of the road
              </span>
            </TabsContent>
            <TabsContent value="following">
              <PostsFollowing posts={posts} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
