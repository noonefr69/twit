import ProfileFooterSaves from "@/components/ProfileFooterSaves";
import { headers } from "next/headers";

export default async function Saved() {
  const res = await fetch("http://localhost:3000/api/posts", {
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
