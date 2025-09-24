"use server";

import dbConnect from "@/lib/db";
import { auth } from "@/auth";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function handleFollow(userId: string) {
  await dbConnect();

  const session = await auth();
  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) throw new Error("User not found");

  if (user._id.toString() === userId) {
    throw new Error("You cannot follow yourself");
  }

  const targetUser = await User.findById(userId);

  const alreadyFollow = user.following.includes(userId);

  if (alreadyFollow) {
    user.following.pull(userId); // remove user
    targetUser.followers.pull(user._id);
  } else {
    user.following.push(userId); // add user
    targetUser.followers.push(user._id);
  }

  await Promise.all([user.save(), targetUser.save()]);

  revalidatePath(`/home`);
  revalidatePath("/saved");
}
