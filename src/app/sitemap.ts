import { MetadataRoute } from "next";
// import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
//     cache: "no-store",
//     headers: {
//       cookie: (await headers()).get("cookie") || "",
//     },
//   });
//   const posts = await res.json();

//   const postEnteries: MetadataRoute.Sitemap = posts.map(())

  return [
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/explore`,
    },
  ];
}
