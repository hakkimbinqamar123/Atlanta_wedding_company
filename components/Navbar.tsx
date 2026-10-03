"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { luxuryEase } from "@/lib/animations";

const navLinksLeft = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/services" },
];

const navLinksRight = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // The hero section is pinned for 400vh (approx 3.8 * window.innerHeight)
      const heroThreshold = window.innerHeight * 3.8;
      if (window.scrollY > heroThreshold) {
        setIsPastHero(true);
      } else {
        setIsPastHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* MODE 1: AT THE BEGINNING (DURING HERO SECTION SCROLL) */}
      {/* Top Left Logo & Icon */}
      <div
        className={`fixed top-6 left-6 sm:left-10 z-40 transition-all duration-600 flex items-center gap-3.5 ${!isPastHero
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <Link href="/" className="flex items-center gap-3.5 group focus:outline-none">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-108">
            <Image
              src="/images/icon.png"
              alt="Atlanta Wedding Company Logo"
              fill
              sizes="44px"
              className="object-cover p-1.5 rounded-full"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className={`font-serif italic text-xl sm:text-2xl tracking-wide font-light transition-colors group-hover:text-[#C49A45] ${isHomePage ? "text-white" : "text-[#111]"}`}>
              Atlanta Wedding Company
            </span>
            <span className={`font-sans text-[8px] uppercase tracking-[0.38em] font-light ${isHomePage ? "text-white/70" : "text-[#111]/70"}`}>
              Fine Art Cinema
            </span>
          </div>
        </Link>
      </div>

      {/* Top Right Menu Button */}
      <div
        className={`fixed top-6 right-6 sm:right-10 z-40 transition-all duration-600 ${!isPastHero
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-full backdrop-blur-md shadow-xl transition-all duration-300 focus:outline-none ${
            isHomePage
              ? "bg-black/40 hover:bg-white/20 text-white border border-white/30"
              : "bg-white/40 hover:bg-black/5 text-[#111] border border-[#111]/20"
          }`}
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.24em] font-medium">Menu</span>
          <Menu className="w-4 h-4 text-[#C49A45] transition-transform group-hover:rotate-90" />
        </button>
      </div>

      {/* MODE 2: WIDE, COMPACT WHITE-GLASS NAVBAR (AFTER HERO SECTION) */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1480px] z-50 transition-all duration-600 ease-out ${isPastHero
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-16 opacity-0 pointer-events-none"
          }`}
      >
        <div className="w-full bg-white/85 backdrop-blur-lg border border-white/60 shadow-2xl rounded-full px-6 sm:px-10 py-2 flex items-center justify-between min-h-[64px] sm:min-h-[72px]">
          {/* Left Navigation Links (Desktop) */}
          <nav aria-label="Primary Left" className="hidden lg:flex items-center gap-10 flex-1 justify-end pr-10">
            {navLinksLeft.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-sans text-xs uppercase tracking-[0.25em] font-medium text-[#111111] hover:text-[#C49A45] transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C49A45] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Compact Centered Logo with Rounded Circle Icon */}
          <div className="flex-shrink-0 flex items-center gap-3 z-10 px-2">
            <Link
              href="/"
              className="group flex items-center gap-3 focus:outline-none"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#111111]/20 bg-[#111111] flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-106">
                <Image
                  src="/images/icon.png"
                  alt="Atlanta Wedding Company Logo"
                  fill
                  sizes="40px"
                  className="object-cover p-1 rounded-full"
                />
              </div>
              <span className="font-serif italic text-lg sm:text-2xl tracking-wider font-light text-[#111111] transition-colors duration-300 group-hover:text-[#C49A45]">
                Atlanta Wedding Company
              </span>
            </Link>
          </div>

          {/* Right Navigation Links (Desktop) */}
          <nav aria-label="Primary Right" className="hidden lg:flex items-center gap-10 flex-1 justify-start pl-10">
            {navLinksRight.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-sans text-xs uppercase tracking-[0.25em] font-medium text-[#111111] hover:text-[#C49A45] transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C49A45] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button (Compact mode) */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-full text-[#111111] hover:bg-[#111111]/10 transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="fixed inset-0 z-50 bg-[#F0F3EC] pt-28 pb-12 px-8 flex flex-col justify-between overflow-y-auto"
          >
            <div className="absolute top-6 right-6 sm:right-10">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full text-[#111111] hover:bg-[#111111]/10 transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center gap-6 mt-6">
              {[...navLinksLeft, ...navLinksRight].map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 + 0.1, duration: 0.6, ease: luxuryEase }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-3xl sm:text-4xl font-light text-[#111111] hover:text-[#C49A45] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="border-t border-[#111111]/10 pt-8 mt-12 flex flex-col items-center gap-3 text-center"
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#111111]/20 bg-[#111111] flex items-center justify-center shadow-md">
                <Image
                  src="/images/icon.png"
                  alt="Atlanta Wedding Company Logo"
                  fill
                  sizes="56px"
                  className="object-cover p-1.5 rounded-full"
                />
              </div>
              <span className="font-serif italic text-2xl text-[#111111]">Atlanta Wedding Company</span>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#7A736B]">
                Available Worldwide • Luxury Weddings
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

