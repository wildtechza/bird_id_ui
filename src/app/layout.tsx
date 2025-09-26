import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../context/CentralDataContext";
import Image from "next/image";
import { Suspense } from "react";
import { CentralDataProvider } from "../context/CentralDataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bird Id",
  description: "Test your bird identification skills!"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full flex justify-center items-center mb-4">
          {/* Light mode logo */}
          <Image
            src="/bird_id.svg"
            alt="Bird Id"
            width={400}
            height={180}
            priority
            className="block dark:hidden"
          />
          {/* Dark mode logo */}
          <Image
            src="/bird_id_dark.svg"
            alt="Bird Id (Dark)"
            width={400}
            height={180}
            priority
            className="hidden dark:block"
          />
        </header>
        <CentralDataProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </CentralDataProvider>
      </body>
    </html>
  );
}
