import PostFooter from "./PostFooter";
import PostDropDown from "./PostDropDown";
import Image from "next/image";
import { PostTypes, UserType } from "@/types/type";
import { timeAgo } from "@/utils/timeChanger";
import Link from "next/link";

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
          You don&apos;t create any post!
        </div>
      ) : (
        userItSelfPosts.map((post: PostTypes) => {
          return (
            <div
              key={post._id}
              className="md:p-5 py-5 relative border-b-2 border-b-[#252525] text-white"
            >
              <div className="flex items-start justify-between min-w-0">
                <Link
                  href={`/${post.user._id}`}
                  className="flex items-start group"
                >
                  <div className="relative h-10 w-10 rounded-full">
                    <Image
                      src={post?.user?.image}
                      alt={post?.user?.image}
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <h1 className="font-semibold text-sm mx-2 truncate max-w-[120px] group-hover:underline">
                    {post?.user?.name}
                  </h1>
                  <span className="text-muted-foreground text-sm">
                    {timeAgo(post?.createdAt)}
                  </span>
                </Link>
                <PostDropDown post={post} />
              </div>
              <pre className="my-7 whitespace-pre-wrap break-all">
                {post.post}
              </pre>
              {post.image ? (
                <div className="relative h-96 w-full rounded-md mt-4 bg-[#252525]">
                  <Image
                    src={post.image}
                    alt={post.image}
                    fill
                    className="rounded-md"
                  />
                </div>
              ) : (
                ""
              )}
              <PostFooter post={post} />
            </div>
          );
        })
      )}
    </div>
  );
}
