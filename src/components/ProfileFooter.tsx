import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileFooterPosts from "./ProfileFooterPosts";

export default function ProfileFooter() {
  return (
    <Tabs defaultValue="posts" className="w-full gap-0 relative -top-[90px]">
      <TabsList className="w-full bg-black m-0 p-0 h-fit rounded-none border-b-2 border-b-[#252525]">
        <TabsTrigger
          className="cursor-pointer transition-all duration-300 py-4 data-[state=active]:hover:bg-[#252525] hover:bg-[#252525] rounded-none border-b-2 data-[state=active]:border-b-blue-200 text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:font-bold"
          value="posts"
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer transition-all duration-300 py-4 data-[state=active]:hover:bg-[#252525] hover:bg-[#252525] rounded-none border-b-2 data-[state=active]:border-b-blue-200 text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:font-bold"
          value="likes"
        >
          Likes
        </TabsTrigger>
        <TabsTrigger
          className="cursor-pointer transition-all duration-300 py-4 data-[state=active]:hover:bg-[#252525] hover:bg-[#252525] rounded-none border-b-2 data-[state=active]:border-b-blue-200 text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:font-bold"
          value="saved"
        >
          Saved
        </TabsTrigger>
      </TabsList>
      <div className="">
        <TabsContent value="posts">
          <ProfileFooterPosts />{" "}
        </TabsContent>
        <TabsContent value="likes">Change your password here.</TabsContent>
        <TabsContent value="saved">Change your password here.</TabsContent>
      </div>
    </Tabs>
  );
}
