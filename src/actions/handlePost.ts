"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Post from "@/models/post";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function handlePost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await dbConnect();

  const post = formData.get("post");
  if (!post || typeof post !== "string" || post.trim() == "") {
    throw new Error("Invalid post content");
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) throw new Error("User not found");

  await Post.create({
    post,
    user: user._id,
  });

  revalidatePath("/home");
}
