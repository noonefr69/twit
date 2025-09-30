"use server";

import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Post from "@/models/post";
import User from "@/models/user";
import { revalidatePath } from "next/cache";
import type { UploadApiResponse } from "cloudinary";

export async function handlePost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await dbConnect();

  const post = formData.get("post");
  const image = formData.get("image") as File | null;

  if (!post || typeof post !== "string" || post.trim() === "") {
    throw new Error("Invalid post content");
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) throw new Error("User not found");

  let imageUrl = "";

  // ✅ Upload only if image exists
  if (image && image.size > 0) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error || !result) {
            reject(error || new Error("No result from Cloudinary"));
            return;
          }
          resolve(result);
        })
        .end(buffer);
    });

    imageUrl = result.secure_url;
  }

  await Post.create({
    post,
    user: user._id,
    image: imageUrl,
  });

  revalidatePath("/home");
  revalidatePath("/saved");
}
