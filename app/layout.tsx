import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Atlanta Wedding Company | Luxury Wedding Films & Photography",
  description:
    "Capturing authentic, timeless, and cinematic love stories across the globe. Luxury editorial wedding films and fine-art photography by Atlanta Wedding Company.",
  keywords: [
    "Atlanta Wedding Company",
    "Luxury Wedding Photographer",
    "Wedding Videographer",
    "Editorial Wedding Photography",
    "Jose Villa inspired",
    "Destination Wedding Photographer",
    "Cinematic Wedding Films",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Favicon & Brand Icon */}
        <link rel="icon" href="/images/icon.png" />
        {/* High-priority preloading before React mounts */}
        <link
          rel="preload"
          href="/video/hero.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/images/hero-poster.jpg"
          as="image"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F5F1] text-[#2E2A27] selection:bg-[#B8926A]/20 selection:text-[#2E2A27]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
