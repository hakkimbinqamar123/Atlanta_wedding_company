"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { luxuryEase } from "@/lib/animations";

const DURATION = 8000; // ms per testimonial

const testimonials = [
  {
    id: 1,
    quote:
      "Alex and Cassie captured the absolute soul of our wedding day. When we watched our film, it felt like stepping into a cinematic dream. Every single guest asked who our artists were.",
    clientName: "Elena & Julian",
    weddingLocation: "Villa Balbiano, Lake Como",
    image: "/images/gallery/gallery_couple_1791021341611.png",
  },
  {
    id: 2,
    quote:
      "Their gentle, calm presence and extraordinary eye for lighting made all the difference during our sunset ceremony. The photos are timeless: soft, romantic, and full of genuine emotion.",
    clientName: "Amélie & Henri",
    weddingLocation: "Château de Chantilly, France",
    image: "/images/gallery/gallery_golden_hour_1791021356706.png",
  },
  {
    id: 3,
    quote:
      "We wanted imagery that felt like Vogue meets an heirloom family photo album. They exceeded every expectation, and their ability to catch quiet glances is unmatched.",
    clientName: "Victoria & James",
    weddingLocation: "Amalfi Coast, Italy",
    image: "/images/gallery/gallery_reception_1791021310470.png",
  },
];

const N = testimonials.length;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const paused = hovered || !inView;

  // One rAF timer drives both the auto-advance and the progress line.
  // It pauses on hover and while the section is off-screen.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      if (!paused) {
        const next = progress.get() + dt / DURATION;
        if (next >= 1) {
          progress.set(0);
          setActive((a) => (a + 1) % N);
        } else {
          progress.set(next);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, progress]);

  const go = (i: number) => {
    progress.set(0);
    setActive(((i % N) + N) % N);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#111] py-28 text-[#E8EBE4] md:py-40"
    >
      {/* Background photo: crossfade + slow Ken Burns */}
      <AnimatePresence initial={false}>
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.6 }, scale: { duration: 10, ease: "linear" } }}
        >
          <Image
            src={testimonials[active].image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={active === 0}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[#111]/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(217,183,146,0.14),_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#111] via-transparent to-[#111]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        <p className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-[#E6C15C]">Kind Words</p>
        <span aria-hidden className="block font-serif text-8xl leading-none text-[#E6C15C]/30 sm:text-9xl">
          &ldquo;
        </span>

        {/* Swipeable stage. Every slide sits in the same grid cell, so the height
            always equals the tallest quote: nothing overlaps or gets clipped. */}
        <motion.div
          className="-mt-10 grid cursor-grab touch-pan-y active:cursor-grabbing sm:-mt-14"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(active + 1);
            else if (info.offset.x > 60) go(active - 1);
          }}
          aria-live="polite"
        >
          {testimonials.map((t, i) => {
            const on = i === active;
            return (
              <motion.figure
                key={t.id}
                aria-hidden={!on}
                className="col-start-1 row-start-1 flex flex-col items-center justify-center"
                style={{ pointerEvents: on ? "auto" : "none" }}
                animate={{
                  opacity: on ? 1 : 0,
                  y: on ? 0 : i < active ? -24 : 24,
                  filter: on ? "blur(0px)" : "blur(8px)",
                }}
                transition={{ duration: 1, ease: luxuryEase, delay: on ? 0.25 : 0 }}
              >
                <blockquote className="mb-10 max-w-4xl font-serif text-2xl font-light italic leading-[1.35] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                  {t.quote}
                </blockquote>
                <figcaption className="flex flex-col items-center gap-3">
                  <span className="h-px w-10 bg-[#E6C15C]" />
                  <span className="font-sans text-sm uppercase tracking-[0.2em] text-white/90">{t.clientName}</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#E6C15C]">
                    {t.weddingLocation}
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>

        {/* Couple selector with live progress */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4 sm:gap-8 md:mt-20">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => go(i)}
              aria-label={`Show testimonial from ${t.clientName}`}
              aria-current={i === active}
              className="group text-left"
            >
              <div className="relative mb-3 h-px w-full bg-white/15">
                {i === active ? (
                  <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-[#E6C15C]" />
                ) : (
                  <div
                    className="absolute inset-0 origin-left bg-[#E6C15C]/50 transition-transform duration-700"
                    style={{ transform: `scaleX(${i < active ? 1 : 0})` }}
                  />
                )}
              </div>
              <span
                className={`block truncate font-sans text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 sm:text-xs ${
                  i === active ? "text-white" : "text-white/40 group-hover:text-white/70"
                }`}
              >
                {t.clientName}
              </span>
              <span className="mt-1 hidden truncate font-sans text-[10px] tracking-[0.15em] text-white/30 sm:block">
                {t.weddingLocation.split(",").pop()?.trim()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

