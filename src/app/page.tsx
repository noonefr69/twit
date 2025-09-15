import { signIn } from "@/auth";

export default function Home() {
  return (
    <div>
      <form
        className="w-full"
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button
          type="submit"
          className="cursor-pointer w-full flex items-center text-sm lg:text-base justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
