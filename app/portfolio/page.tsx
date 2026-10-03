"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { luxuryEase } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Ratio = "p" | "l" | "s"; // portrait 4:5, landscape 5:4, square
type Work = { src: string; title: string; place: string; cat: string; r: Ratio };

// Use premium generated images from the gallery and about folders
const works: Work[] = [
  { src: "/images/gallery/gallery_couple_1791021341611.png", title: "Elena & Julian", place: "Lake Como, Italy", cat: "Weddings", r: "p" },
  { src: "/images/gallery/gallery_golden_hour_1791021356706.png", title: "Sophia & Matteo", place: "Tuscany, Italy", cat: "Weddings", r: "l" },
  { src: "/images/gallery/gallery_vows_1791021321390.png", title: "Amélie & Henri", place: "Paris, France", cat: "Weddings", r: "p" },
  { src: "/images/gallery/gallery_ceremony_1791021273744.png", title: "Golden Hour", place: "Amalfi Coast", cat: "Weddings", r: "s" },
  { src: "/images/gallery/gallery_bridal_1791021201868.png", title: "The Vows", place: "Santorini, Greece", cat: "Weddings", r: "p" },
  { src: "/images/gallery/gallery_groom_1791021243930.png", title: "Wedding Film Stills", place: "Kyoto, Japan", cat: "Films", r: "l" },
  { src: "/images/gallery/gallery_reception_1791021310470.png", title: "Cinematic Highlights", place: "Lake Como, Italy", cat: "Films", r: "l" },
  { src: "/images/about/about_philosophy_1791020699951.png", title: "Baby Noah", place: "Atlanta Studio", cat: "Baby & Newborn", r: "p" },
  { src: "/images/about/about_fineart_1791020827109.png", title: "First Week", place: "At home", cat: "Baby & Newborn", r: "s" },
  { src: "/images/gallery/gallery_mehendi_1791021228392.png", title: "Waiting for Baby", place: "Atlanta", cat: "Maternity", r: "p" },
  { src: "/images/about/about_legacy_1791020912155.png", title: "Maya & Dev", place: "Savannah, GA", cat: "Engagement", r: "l" },
  { src: "/images/about/about_destination_1791020749401.png", title: "Haldi Ceremony", place: "Atlanta", cat: "Events", r: "p" },
  { src: "/images/gallery/gallery_golden_hour_1791021356706.png", title: "Mehendi Night", place: "Atlanta", cat: "Events", r: "l" },
  { src: "/images/gallery/gallery_couple_1791021341611.png", title: "Spring Campaign", place: "Studio", cat: "Advertising", r: "s" },
];

const ratioClass: Record<Ratio, string> = { p: "aspect-[4/5]", l: "aspect-[5/4]", s: "aspect-square" };
const ratioH: Record<Ratio, number> = { p: 1.25, l: 0.8, s: 1 };

function useColumns() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const calc = () => setCols(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return cols;
}

export default function PortfolioPage() {
  const cats = useMemo(() => ["All", ...Array.from(new Set(works.map((w) => w.cat)))], []);
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState<number | null>(null); // index within `list`
  const cols = useColumns();

  const list = useMemo(() => (active === "All" ? works : works.filter((w) => w.cat === active)), [active]);
  const count = (c: string) => (c === "All" ? works.length : works.filter((w) => w.cat === c).length);

  // balanced masonry: each photo goes in the currently shortest column
  const columns = useMemo(() => {
    const out: number[][] = Array.from({ length: cols }, () => []);
    const h = Array(cols).fill(0);
    list.forEach((w, i) => {
      const c = h.indexOf(Math.min(...h));
      out[c].push(i);
      h[c] += ratioH[w.r];
    });
    return out;
  }, [list, cols]);

  const n = list.length;
  const change = (c: string) => { setOpen(null); setActive(c); };

  // lightbox: keyboard, scroll lock without layout jump
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i! + 1) % n);
      if (e.key === "ArrowLeft") setOpen((i) => (i! - 1 + n) % n);
    };
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${gap}px`;
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, n]);

  const cur = open !== null ? list[open] : null;

  return (
    <div className="relative min-h-screen flex flex-col bg-[#E8EBE4] text-[#111] overflow-x-hidden selection:bg-black/10 selection:text-[#111]">
      <Navbar />
      <main className="flex-1">
        <header className="mx-auto max-w-7xl px-6 pb-12 pt-24 sm:px-10 md:pb-16 md:pt-32">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: luxuryEase }}
            className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-[#C49A45]">Portfolio</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: luxuryEase }}
            className="max-w-4xl font-serif text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-8xl">
            Every story, <span className="italic text-[#C49A45]">beautifully</span> told
          </motion.h1>
        </header>

        {/* Filter bar: sticky on larger screens (no overflow-hidden on any parent!) */}
        <div className="z-30 border-y border-black/10 bg-[#E8EBE4]/90 backdrop-blur-md md:sticky md:top-0">
          <nav aria-label="Filter portfolio" className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-3 px-6 py-5 sm:px-10">
            {cats.map((c) => (
              <button key={c} onClick={() => change(c)} aria-pressed={active === c}
                className={`relative pb-1 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${active === c ? "text-[#111]" : "text-[#888] hover:text-[#111]"}`}>
                {c}<sup className="ml-1 text-[9px] tracking-normal">{count(c)}</sup>
                {active === c && <motion.span layoutId="tab" className="absolute inset-x-0 -bottom-0.5 h-px bg-[#111]" transition={{ duration: 0.5, ease: luxuryEase }} />}
              </button>
            ))}
          </nav>
        </div>

        {/* Grid: re-keyed per filter so the whole set transitions cleanly */}
        <AnimatePresence mode="wait">
          <motion.div key={`${active}-${cols}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            className="mx-auto flex max-w-7xl items-start gap-5 px-6 py-14 sm:px-10 md:py-20">
            {columns.map((col, ci) => (
              <div key={ci} className="flex min-w-0 flex-1 flex-col gap-5">
                {col.map((indexInList) => {
                  const w = list[indexInList];
                  return (
                    <motion.button key={`${w.src}-${indexInList}`} onClick={() => setOpen(indexInList)}
                      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: Math.min(indexInList, 8) * 0.06, ease: luxuryEase }}
                      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl">
                      <div className={`relative w-full ${ratioClass[w.r]}`}>
                        <Image src={w.src} alt={`${w.title}, ${w.place}`} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                          priority={indexInList < 4}
                          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#E6C15C]">{w.cat}</p>
                        <p className="mt-1 font-serif text-xl italic text-white">{w.title}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <section className="bg-[#111] py-24 text-center text-[#E8EBE4] md:py-36">
          <p className="mx-auto max-w-3xl px-6 font-serif text-4xl font-light leading-tight sm:text-6xl">
            Your story could be <span className="italic text-[#E6C15C]">next</span>
          </p>
          <Link href="/contact" className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#E8EBE4] px-10 py-4 font-sans text-xs font-medium uppercase tracking-[0.25em] text-[#111] transition-colors duration-500 hover:bg-[#E6C15C]">
            Start a conversation <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {cur && open !== null && (
            <motion.div data-lenis-prevent role="dialog" aria-modal="true"
              className="fixed inset-0 z-[100] flex items-center justify-center overscroll-contain bg-black/95"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
              onClick={() => setOpen(null)}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={cur.src} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
                  onDragEnd={(_, info) => { if (info.offset.x < -60) setOpen((open + 1) % n); else if (info.offset.x > 60) setOpen((open - 1 + n) % n); }}
                  initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: luxuryEase }}
                  className={`relative max-h-[72vh] max-w-[88vw] overflow-hidden rounded-lg ${
                    cur.r === "p" ? "aspect-[4/5] h-[72vh]" : cur.r === "l" ? "aspect-[5/4] w-[min(88vw,90vh)]" : "aspect-square h-[min(72vh,88vw)]"}`}
                  onClick={(e) => e.stopPropagation()}>
                  <Image src={cur.src} alt={cur.title} fill sizes="90vw" className="pointer-events-none object-cover" priority />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 left-0 right-0 px-16 text-center">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#E6C15C]">{cur.cat}</p>
                <p className="mt-1 font-serif text-2xl italic text-white">{cur.title}</p>
                <p className="mt-1 font-sans text-xs tracking-[0.2em] text-white/50">{cur.place} &middot; {open + 1} / {n}</p>
              </div>

              {[{ d: -1, cls: "left-3 sm:left-8", t: "←", l: "Previous" }, { d: 1, cls: "right-3 sm:right-8", t: "→", l: "Next" }].map((b) => (
                <button key={b.l} aria-label={b.l} onClick={(e) => { e.stopPropagation(); setOpen((open + b.d + n) % n); }}
                  className={`absolute top-1/2 -translate-y-1/2 ${b.cls} h-12 w-12 rounded-full border border-white/30 bg-black/30 text-white transition-colors hover:bg-white/10`}>{b.t}</button>
              ))}
              <button aria-label="Close" onClick={() => setOpen(null)}
                className="absolute right-4 top-5 h-12 w-12 rounded-full border border-white/30 bg-black/30 text-white transition-colors hover:bg-white/10 sm:right-8">✕</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

