import ProfileFooterSaves from "@/components/ProfileFooterSaves";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Saved",
  description: "View and manage posts you've saved for later.",
};

export default async function Saved() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });
  const posts = await res.json();
  return (
    <div>
        <ProfileFooterSaves posts={posts} />
    </div>
  );
}
