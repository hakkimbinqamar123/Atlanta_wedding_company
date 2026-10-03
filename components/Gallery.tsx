"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/SectionHeading";
import { luxuryEase } from "@/lib/animations";
import { useLenis } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

type Photo = { src: string; label: string; portrait: boolean };

const u = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

const photos: Photo[] = [
  { src: "/images/gallery/gallery_bridal_1791021201868.png", label: "Bridal Portrait", portrait: true },
  { src: "/images/gallery/gallery_mehendi_1791021228392.png", label: "Mehendi", portrait: false },
  { src: "/images/gallery/gallery_groom_1791021243930.png", label: "The Groom", portrait: true },
  { src: "/images/gallery/gallery_ceremony_1791021273744.png", label: "The Ceremony", portrait: true },
  { src: "/images/gallery/gallery_reception_1791021310470.png", label: "Reception", portrait: false },
  { src: "/images/gallery/gallery_vows_1791021321390.png", label: "Wedding Vows", portrait: true },
  { src: "/images/gallery/gallery_couple_1791021341611.png", label: "Couple Portrait", portrait: true },
  { src: "/images/gallery/gallery_golden_hour_1791021356706.png", label: "Golden Hour", portrait: false },
];

/* 1. Pinned horizontal strip: GSAP ScrollTrigger drives the horizontal
      translation, which integrates properly with Lenis smooth scrolling. */
function FeaturedStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Wait a tick so layout is settled and Lenis has initialised.
    const ctx = gsap.context(() => {
      // Calculate how far the track needs to move:
      // total width of the track minus the viewport width.
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1, // slight smoothing for buttery feel
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-[3vw] px-[8vw] items-center h-screen will-change-transform"
      >
        {photos.slice(0, 7).map((ph, i) => (
          <div
            key={ph.src}
            className={`relative flex-none overflow-hidden rounded-2xl shadow-2xl ${
              i % 2 ? "mt-[6vh] h-[58vh]" : "-mt-[4vh] h-[70vh]"
            } aspect-[4/5]`}
          >
            <Image src={ph.src} alt={ph.label} fill sizes="40vw" className="object-cover" />
            <span className="absolute bottom-4 left-4 font-serif italic text-white text-xl">
              {ph.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2. Masonry grid + lightbox with shared-element transition */
function Archive() {
  const [open, setOpen] = useState<number | null>(null);
  const n = photos.length;
  const { getInstance } = useLenis();

  useEffect(() => {
    if (open === null) return;

    // Stop Lenis while lightbox is open — setting body overflow doesn't
    // prevent Lenis from continuing to scroll.
    const lenis = getInstance();
    lenis?.stop();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i! + 1) % n);
      if (e.key === "ArrowLeft") setOpen((i) => (i! - 1 + n) % n);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, n, getInstance]);

  return (
    <>
      <div className="group/grid max-w-6xl mx-auto px-6 sm:px-10 columns-1 sm:columns-2 lg:columns-3 gap-5">
        {photos.map((ph, i) => (
          <button
            key={ph.src}
            onClick={() => setOpen(i)}
            className="group relative block w-full mb-5 overflow-hidden rounded-xl break-inside-avoid cursor-zoom-in transition-[filter] duration-500 group-hover/grid:brightness-75 hover:!brightness-100"
          >
            <motion.div
              layoutId={`photo-${i}`}
              className={`relative w-full ${ph.portrait ? "aspect-[4/5]" : "aspect-[5/4]"}`}
            >
              <Image
                src={ph.src}
                alt={ph.label}
                fill
                sizes="(max-width:1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </motion.div>
            <span className="absolute bottom-3 left-4 font-serif italic text-white text-lg opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              {ph.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              layoutId={`photo-${open}`}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="relative h-[80vh] aspect-[4/5] max-w-[90vw] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={photos[open].src} alt={photos[open].label} fill sizes="90vw" className="object-cover" />
            </motion.div>

            {[
              { d: -1, cls: "left-4 sm:left-8", t: "←", l: "Previous" },
              { d: 1, cls: "right-4 sm:right-8", t: "→", l: "Next" },
            ].map((b) => (
              <button
                key={b.l}
                aria-label={b.l}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((open + b.d + n) % n);
                }}
                className={`absolute top-1/2 ${b.cls} h-12 w-12 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors`}
              >
                {b.t}
              </button>
            ))}
            <button
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute top-5 right-5 sm:right-8 h-12 w-12 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
            <p className="absolute bottom-6 text-xs tracking-[0.2em] text-white/60">
              {photos[open].label.toUpperCase()} · {open + 1} / {n}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white text-[#111]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-28 md:pt-40 pb-10">
        <SectionHeading smallHeading="PORTFOLIO" largeHeading="Stories We Have Been Trusted To Tell" />
      </div>
      <FeaturedStrip />
      <div className="hidden sm:block py-24 md:py-32">
        <Archive />
      </div>
    </section>
  );
}
