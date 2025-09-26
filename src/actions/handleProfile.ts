"use server";

import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

/**
 * Uploads a file to Cloudinary and returns the secure URL.
 */
async function uploadToCloudinary(file: File | null): Promise<string> {
  if (!file || file.size === 0) return "";

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      })
      .end(buffer);
  });
}

export async function handleProfile(formData: FormData) {
  await dbConnect();

  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const userName = (formData.get("userName") as string)?.trim();
  if (!userName) {
    throw new Error("Name cannot be empty");
  }

  const userBio = (formData.get("userBio") as string)?.trim() || "";

  const userCover = formData.get("userCover") as File | null;
  const userProfileImage = formData.get("userProfileImage") as File | null;

  const [coverUrl, profileImageUrl] = await Promise.all([
    uploadToCloudinary(userCover),
    uploadToCloudinary(userProfileImage),
  ]);

  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      name: userName,
      bio: userBio,
      ...(coverUrl && { cover: coverUrl }),
      ...(profileImageUrl && { image: profileImageUrl }),
    },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found");
  }

  revalidatePath(`/profile/${user._id}`);
  revalidatePath(`/home`);
}
