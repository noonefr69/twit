"use server";

import { signOut } from "@/auth";

export async function signOuthandle() {
  await signOut();
}
