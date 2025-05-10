import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quria Playground - Next.js",
  description: "A playground for testing Next.js with Quria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="max-w-5xl mx-auto px-5 pt-16 md:pt-18 lg:pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
