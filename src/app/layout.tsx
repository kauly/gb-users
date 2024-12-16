import "./globals.css";
import { Toaster } from "react-hot-toast";

import { Providers } from "@/app/providers";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Github Users and Repos",
  description: "Search for users and repos on Github",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-gradient-to-r from-slate-500 to-stone-700 antialiased dark scrollbar-hide"
    >
      <body className="mx-auto   max-w-screen-2xl ">
        <Toaster position="bottom-center" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
