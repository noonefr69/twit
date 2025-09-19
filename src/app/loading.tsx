import { Newsreader } from "next/font/google";
import React from "react";

const newsreader = Newsreader({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Loading() {
  return (
    <div
      className={`text-[7rem] cursor-default animate-pulse font-semibold text-white h-screen flex items-center justify-center ${newsreader.className} antialiased`}
    >
      TWIT
    </div>
  );
}
