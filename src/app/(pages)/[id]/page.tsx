import ProfileFooter from "@/components/ProfileFooter";
import ProfileHeader from "@/components/ProfileHeader";
import { headers } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // userDynamic Data
  const userRes = await fetch(`http://localhost:3000/api/user/${id}`, {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });
  const user = await userRes.json();

  // All Posts
  const postsRes = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });
  const posts = await postsRes.json();

  // user post
  // const postRes = await fetch(`http://localhost:3000/api/post`, {
  //   cache: "no-store",
  //   headers: {
  //     cookie: (await headers()).get("cookie") || "",
  //   },
  // });
  // const post = await postRes.json();

  return (
    <div className="">
      <ProfileHeader dynamicUser={user} posts={posts} />
      <ProfileFooter dynamicUser={user} posts={posts} />
    </div>
  );
}
