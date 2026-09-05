"use server";

import { signIn } from "@/auth";
import dbConnect from "@/lib/db";
import { generateGuestEmail, generateGuestName, generateGuestToken } from "@/lib/guest";
import User from "@/models/user";

export async function handleGuestJoin() {
  await dbConnect();
  
  const name = generateGuestName();
  const email = generateGuestEmail();
  const token = generateGuestToken();
  
  await User.create({
    name,
    email,
    guestToken: token,
    isGuest: true,
  });
  
  await signIn("guest", { 
    code: token, 
    redirectTo: `/home?guestcode=${token}` 
  });
}

export async function handleGuestReturn(formData: FormData) {
  const code = (formData.get("code") as string)?.trim().toUpperCase();
  
  if (!code) {
    return { error: "Please enter a guest code" };
  }
  
  try {
    await signIn("guest", { 
      code, 
      redirectTo: "/home" 
    });
    return { success: true };
  } catch {
    return { error: "Invalid guest code" };
  }
}
