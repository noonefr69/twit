"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Post from "@/models/post";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function handleComment(formData: FormData) {
  await dbConnect();

  const session = await auth();
  if (!session?.user?.email) throw new Error("not sign In");

  const user = await User.findOne({ email: session.user.email });
  if (!user) throw new Error("User not found");

  const comment = formData.get("comment") as String;
  if (!comment || comment.trim() == "") throw new Error("Enter valid value");

  const postId = formData.get("postId") as String;
  if (!postId) throw new Error("Post id not found!");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  await post.comments.push({
    userCom: user._id,
    text: comment,
    createdAt: new Date(),
  });

  await post.save();

  await post.populate("comments.userCom", "name image");

  revalidatePath("/home");
  revalidatePath("/saved");
}
