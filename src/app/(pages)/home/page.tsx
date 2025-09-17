import { auth, signOut } from "@/auth";
import Navbar from "@/components/Navbar";
import dbConnect from "@/lib/db";
import User from "@/models/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const session = await auth();

  await dbConnect();
  const user = await User.findOne({ email: session?.user?.email });
  if (!user) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-12">
      <div className="grid col-span-3">
        <Navbar />
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
