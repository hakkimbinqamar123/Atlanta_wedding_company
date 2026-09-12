"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2E2A27] text-white py-20 md:py-28 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center">
        {/* Minimal Centered Logo with Brand Icon inside Circle */}
        <Link
          href="#home"
          onClick={scrollToTop}
          className="group flex flex-col items-center mb-12 focus:outline-none"
        >
          <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] mb-4 rounded-full overflow-hidden border border-white/20 bg-black/30 flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-108">
            <Image
              src="/images/icon.png"
              alt="Atlanta Wedding Company Logo"
              fill
              sizes="72px"
              className="object-cover p-1.5 rounded-full"
            />
          </div>
          <span className="font-serif italic text-3xl sm:text-5xl font-light tracking-wide transition-transform duration-500 group-hover:scale-105">
            Atlanta Wedding Company
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.42em] text-[#B8926A] mt-1.5">
            Fine Art Wedding Cinema
          </span>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-14">
          {[
            { name: "Home", href: "#home" },
            { name: "About", href: "#about" },
            { name: "Portfolio", href: "#portfolio" },
            { name: "Stories", href: "#portfolio" },
            { name: "Testimonials", href: "#testimonials" },
            { name: "Contact", href: "#contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-sans text-xs uppercase tracking-[0.25em] text-white/80 hover:text-[#B8926A] transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Social & Direct Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 mb-16 pt-8 border-t border-white/10 w-full max-w-2xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-sans text-xs uppercase tracking-[0.22em] text-white/90 hover:text-[#B8926A] transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-[#B8926A]" />
            <span>Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="mailto:inquire@atlantaweddingcompany.com"
            className="group flex items-center gap-2 font-sans text-xs uppercase tracking-[0.22em] text-white/90 hover:text-[#B8926A] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#B8926A]" />
            <span>inquire@atlantaweddingcompany.com</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Copyright & Location Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-8 border-t border-white/10 text-white/50 font-sans text-[11px] uppercase tracking-[0.2em] gap-4">
          <p>© {new Date().getFullYear()} Atlanta Wedding Company. All rights reserved.</p>
          <p className="text-[#B8926A]/80">Available Worldwide • Crafted with Devotion</p>
        </div>
      </div>
    </footer>
  );
}
