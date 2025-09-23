"use server";

import dbConnect from "@/lib/db";
import Post from "@/models/post";
import { auth } from "@/auth";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string) {
  await dbConnect();

  const session = await auth();
  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) throw new Error("User not found");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const alreadySaved = user.savedPost.includes(postId);

  console.log(alreadySaved);

  //   if (alreadyLiked) {
  //     post.likes.pull(user._id); // remove like
  //   } else {
  //     post.likes.push(user._id); // add like
  //   }

  //   await post.save();

  revalidatePath(`/home`);
}
