import PostFooter from "./PostFooter";
import PostDropDown from "./PostDropDown";
import Image from "next/image";
import { PostTypes, UserType } from "@/types/type";
import { formatDistanceToNow } from "date-fns";
import { timeAgo } from "@/utils/timeChanger";

type ProfileFooterPostsProps = {
  dynamicUser: UserType;
  posts: PostTypes[];
};

export default function ProfileFooterPosts({
  dynamicUser,
  posts,
}: ProfileFooterPostsProps) {
  const userItSelfPosts = posts.filter((post) => {
    return post.user._id == dynamicUser._id;
  });

  return (
    <div>
      {userItSelfPosts.length == 0 ? (
        <div className="text-muted-foreground font-semibold text-center mt-4">
          You don't create any post!
        </div>
      ) : (
        userItSelfPosts.map((post: PostTypes) => {
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
                <PostDropDown post={post} />
              </div>
              <pre className="my-7 whitespace-pre-wrap break-all">
                {post.post}
              </pre>
              <PostFooter post={post} />
            </div>
          );
        })
      )}
    </div>
  );
}
