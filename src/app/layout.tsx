import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twit Clone",
  description: "A modern Twitter clone app. Share posts, follow users, and explore trending content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black mx-4`}>{children}</body>
    </html>
  );
}
