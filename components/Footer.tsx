"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { luxuryEase } from "@/lib/animations";

const EMAIL = "inquire@atlantaweddingcompany.com";

const nav = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/contact" },
];

const marquee = ["Fine Art Cinema", "Destination Weddings", "Editorial Portraiture", "Wedding Films", "Available Worldwide"];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");

  // Giant wordmark rises into place as the footer scrolls into view
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);

  // Live Atlanta time (set after mount to avoid hydration mismatch)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/New_York",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={ref} className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,183,146,0.12),transparent_60%)]" />

      {/* 1. Call to action */}
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 text-center sm:px-10 md:pb-28 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          className="mb-8 font-sans text-xs uppercase tracking-[0.4em] text-[#E6C15C]"
        >
          Now booking 2027 &amp; 2028
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: luxuryEase }}
          className="mx-auto max-w-4xl font-serif text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-8xl"
        >
          Let&rsquo;s tell <span className="italic text-[#E6C15C]">your</span> story
        </motion.h2>
        <motion.a
          href={`mailto:${EMAIL}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: luxuryEase }}
          className="group mt-14 inline-flex items-center gap-4 rounded-full border border-white/20 py-4 pl-8 pr-4 font-sans text-xs uppercase tracking-[0.25em] transition-colors duration-500 hover:border-[#E6C15C] hover:bg-[#E6C15C] hover:text-[#111]"
        >
          <span className="break-all text-left">Inquire for your date</span>
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/10 transition-colors duration-500 group-hover:bg-[#111]/10">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </motion.a>
      </div>

      {/* 2. Scrolling services ticker */}
      <div className="relative overflow-hidden border-y border-white/10 py-5" aria-hidden>
        <motion.div
          className="flex w-max gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-12 font-serif text-xl italic text-white/40 sm:text-2xl">
              {m}
              <span className="h-1 w-1 rounded-full bg-[#E6C15C]" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3. Link columns */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-14 px-6 py-20 sm:px-10 md:grid-cols-12 md:py-24">
        <div className="col-span-2 md:col-span-5">
          <p className="font-serif text-2xl font-light leading-snug text-white/90 sm:text-3xl">
            Destination wedding photographers &amp; filmmakers, documenting love stories with an editorial,
            romantic eye.
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h3 className="mb-6 font-sans text-[10px] uppercase tracking-[0.35em] text-[#E6C15C]">Explore</h3>
          <ul className="space-y-4">
            {nav.map((n) => (
              <li key={n.name}>
                <Link
                  href={n.href}
                  className="group relative inline-block font-sans text-sm text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {n.name}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#E6C15C] transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="mb-6 font-sans text-[10px] uppercase tracking-[0.35em] text-[#E6C15C]">Connect</h3>
          <ul className="space-y-4">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-sans text-sm text-white/70 transition-colors hover:text-white"
              >
                Instagram
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="break-all font-sans text-sm text-white/70 transition-colors hover:text-white">
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 4. Bottom bar */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/10 px-6 py-8 font-sans text-[10px] uppercase tracking-[0.25em] text-white/40 sm:flex-row sm:px-10">
        <p>&copy; {new Date().getFullYear()} Atlanta Wedding Company</p>
        <p className="flex items-center gap-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E6C15C] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E6C15C]" />
          </span>
          Atlanta, GA {time && <span className="tabular-nums text-[#E6C15C]/80">{time}</span>}
        </p>
        <button
          onClick={toTop}
          className="group flex items-center gap-3 uppercase tracking-[0.25em] transition-colors hover:text-white"
        >
          Back to top
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-[#E6C15C]">
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" />
          </span>
        </button>
      </div>

      {/* 5. Giant wordmark, cropped at the bottom edge */}
      <div className="relative h-[17vw] max-h-[15rem] select-none overflow-hidden" aria-hidden>
        <motion.div style={{ y: wordY }} className="text-center">
          <span className="block bg-gradient-to-b from-white/30 to-white/0 bg-clip-text font-serif text-[min(24vw,26rem)] font-light leading-[0.85] tracking-tighter text-transparent">
            ATLANTA
          </span>
        </motion.div>
      </div>
    </footer>
  );
}

