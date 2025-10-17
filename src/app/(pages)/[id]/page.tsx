import ProfileFooter from "@/components/ProfileFooter";
import ProfileHeader from "@/components/ProfileHeader";
import { headers } from "next/headers";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;

  const post = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${id}`
  ).then((res) => res.json());

  return {
    title: post.name,
    description:
      post.bio ||
      `Profile page for ${post.name}. View bio, followers, following, and posts.`,
    openGraph: {
      images: [{ url: post.image }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // userDynamic Data
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${id}`,
    {
      cache: "no-store",
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
    }
  );
  const user = await userRes.json();

  if (!user || user.error) {
    notFound();
  }

  // All Posts
  const postsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`,
    {
      cache: "no-store",
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
    }
  );
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
