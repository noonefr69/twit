import { auth, signIn } from "@/auth";
import Image from "next/image";
import { Newsreader, Open_Sans } from "next/font/google";
import { BsGithub, BsGoogle, BsGooglePlay } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { redirect } from "next/navigation";
import User from "@/models/user";

const newsreader = Newsreader({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }
  return (
    <div className="h-screen bg-black flex items-center justify-center max-w-[1440px] mx-auto">
      <div
        className={`text-[10rem] font-semibold text-white w-1/2 h-screen flex items-center justify-center ${newsreader.className} antialiased`}
      >
        TWIT
      </div>
      <div className={`w-1/2 ${openSans.className} antialiased`}>
        <h1 className={`text-white text-7xl font-bold mb-10`}>Happening now</h1>
        <h3 className="text-white text-4xl font-bold mb-7">Join today.</h3>
        <div className=" space-y-5">
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="bg-white flex items-center gap-2 rounded-full w-[17rem] justify-center py-2 cursor-pointer duration-300 hover:opacity-70"
            >
              <FcGoogle size={19} /> Sign in with Google
            </button>
          </form>
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button
              type="submit"
              className="bg-white flex items-center gap-2 rounded-full w-[17rem] justify-center py-2 cursor-pointer duration-300 hover:opacity-70"
            >
              <BsGithub size={19} /> Sign in with Github
            </button>
          </form>
        </div>
        <p className="text-muted-foreground text-[11px] w-[17rem] my-4">
          By signing up, you agree to the{" "}
          <Link
            className="hover:underline text-blue-400"
            href={`https://x.com/tos`}
          >
            Terms of Service{" "}
          </Link>
          and{" "}
          <Link
            className="hover:underline text-blue-400"
            href={`https://x.com/privacy`}
          >
            Privacy Policy
          </Link>
          , including{" "}
          <Link
            className="hover:underline text-blue-400"
            href={`https://help.x.com/rules-and-policies/twitter-cookies`}
          >
            Cookie Use
          </Link>
          .
        </p>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-muted-foreground text-sm">
        @{new Date().getFullYear()} — This is a personal demo project and is not
        affiliated with Twitter / X or its affiliates.
      </div>
    </div>
  );
}
