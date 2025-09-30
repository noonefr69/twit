"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error); 
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="bg-[#252525] dark:bg-[#1c1c1c] shadow-xl flex flex-col rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center text-red-500 mb-4">
          <AlertTriangle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-500 dark:text-white">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-100 dark:text-gray-600 mb-6">
          We encountered an unexpected error. Please try again or contact{" "}
          <Link className="text-blue-500 font-semibold hover:underline" href={`https://github.com/noonefr69`}>
            support{" "}
          </Link>{" "}
          if the issue persists. {error.message}
        </p>
        <button
          onClick={() => reset()}
          className="text-center cursor-pointer flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
