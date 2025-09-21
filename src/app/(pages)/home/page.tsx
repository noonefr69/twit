import { auth } from "@/auth";
import AddPost from "@/components/AddPost";
import Posts from "@/components/Posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="text-white ">
      <div className="min-h-screen border-x-2 border-x-[#252525]">
        <Tabs defaultValue="forYou" className="w-full gap-0">
          <TabsList className="w-full bg-black m-0 p-0 h-fit rounded-none ">
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
              <Posts />
              <span className="text-muted-foreground">End Of the Road</span>
            </TabsContent>
            <TabsContent value="following">
              Change your password here.
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
