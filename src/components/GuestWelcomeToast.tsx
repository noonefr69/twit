"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function GuestWelcomeToast() {
  const searchParams = useSearchParams();
  const hasShown = useRef(false);

  useEffect(() => {
    const code = searchParams.get("guestcode");
    if (code && !hasShown.current) {
      hasShown.current = true;

      toast(
        `^-^ Welcome guest! Save your recovery code to return later: ${code}`,
        {
          duration: 10000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        },
      );

      // Strip the query param without refreshing the page
      const url = new URL(window.location.href);
      url.searchParams.delete("guestcode");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  return null;
}
