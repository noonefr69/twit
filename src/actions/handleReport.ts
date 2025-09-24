"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Post from "@/models/post";
import Report from "@/models/report";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function handleReport(formData: FormData, postId: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await dbConnect();

  const reportTxt = formData.get("report") as string;
  if (!reportTxt || reportTxt.trim() == "") {
    throw new Error("Invalid post content");
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) throw new Error("User not found");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  await Report.create({
    reportTxt,
    post: post._id,
    user: user._id,
  });

  revalidatePath("/home");
  revalidatePath("/saved");
}
