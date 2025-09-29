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

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const comment = post.comments.id(commentId);
  if (!comment) throw new Error("Comment not found");

  const isCommentOwner = comment.userCom.toString() === user._id.toString();
  const isPostOwner = post.user.toString() === user._id.toString();

  if (!isCommentOwner && !isPostOwner) {
    throw new Error("Not allowed to delete this comment");
  }

  // remove comment
  comment.deleteOne();
  await post.save();

  revalidatePath("/home");
  revalidatePath("/saved");
}
