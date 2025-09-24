import ProfileFooter from "@/components/ProfileFooter";
import ProfileHeader from "@/components/ProfileHeader";
import { headers } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieHeader = (await headers()).get("cookie") || "";

  const postRes = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
    headers: {
      cookie: cookieHeader,
    },
  });
  if (!postRes.ok) {
    throw new Error("Failed to fetch user");
  }

  const posts = await postRes.json();

  return (
    <div className="">
      <ProfileHeader />
      <ProfileFooter />
    </div>
  );
}
