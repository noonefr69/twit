"use server";

import dbConnect from "@/lib/db";
import Post from "@/models/post";
import { auth } from "@/auth";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function handleDeleteComment(postId: string, commentId: string) {
  await dbConnect();

  const session = await auth();
  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) throw new Error("User not found");

  const post = await Post.findOneAndUpdate(
    { _id: postId },
    { $pull: { comments: { _id: commentId, userCom: user._id } } },
    { new: true }
  );

  if (!post) throw new Error("Post or comment not found");

  revalidatePath("/home");
  revalidatePath("/saved");
}
