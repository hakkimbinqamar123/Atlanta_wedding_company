"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { luxuryEase } from "@/lib/animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    kicker: "Our Philosophy & Craft",
    title: "We believe there is something profound in capturing real, unscripted emotion.",
    body: "Hi! We are husband and wife destination wedding photographers and filmmakers, Alex and Cassie. For over a decade we have documented love stories with an editorial, romantic eye.",
    image: "/images/about/about_philosophy_1791020699951.png",
    badge: "Timeless & Cinema",
  },
  {
    kicker: "Around The World",
    title: "From the hills of Tuscany to the ch\u00e2teaux of France.",
    body: "What started as a shared passion for cinema and fine art has grown into a studio trusted by couples across five continents.",
    image: "/images/about/about_destination_1791020749401.png",
    badge: "5 Continents",
  },
  {
    kicker: "Our Approach",
    title: "Fine-art portraiture meets documentary nostalgia.",
    body: "Whether an intimate gathering of twenty or a celebration of hundreds, we step into the moment up close and personal.",
    image: "/images/about/about_fineart_1791020827109.png",
    badge: "Vogue & Magnolia Rouge",
  },
  {
    kicker: "Let\u2019s Begin",
    title: "Heirlooms that feel as cinematic fifty years from now.",
    body: "Top 30 Rising Stars of Wedding Photography, NYC. Tell us your date and we will tell you the story.",
    image: "/images/about/about_legacy_1791020912155.png",
    badge: "Top 30 \u00b7 NYC",
  },
];

const N = slides.length;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=150%`,
        pin: true,
        onUpdate: (self) => {
          const nextActive = Math.min(N - 1, Math.floor(self.progress * N));
          setActive(nextActive);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const s = slides[active];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-screen w-full bg-white text-[#111] overflow-hidden"
    >
      <div className="h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">

          {/* ═══ Image column: clip-path reveal ═══ */}
          <div className="lg:col-span-6 relative aspect-[4/5] max-h-[70vh] w-full overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 1.1, ease: luxuryEase }}
              >
                <div className="absolute inset-[-6%]">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={active === 0}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-5 left-5 font-serif italic text-white text-xl z-10">
              {s.badge}
            </span>
          </div>

          {/* ═══ Text column: blur-rise transition ═══ */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:pl-6 min-h-[360px] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: luxuryEase }}
                className="flex flex-col gap-6"
              >
                <span className="font-sans text-xs uppercase tracking-[0.28em] text-[#999] font-medium">
                  {s.kicker}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.2]">
                  {s.title}
                </h3>
                <p className="font-sans text-base sm:text-lg font-light text-[#666] leading-relaxed">
                  {s.body}
                </p>
                {active === N - 1 && (
                  <a
                    href="#contact"
                    className="self-start inline-flex px-8 py-4 bg-[#111] text-white text-xs uppercase tracking-[0.25em] rounded-full hover:bg-[#333] transition-colors duration-500"
                  >
                    Inquire For Your Date
                  </a>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Progress */}
            <div className="flex items-center gap-4 mt-4">
              <span className="font-sans text-xs tabular-nums text-[#666]">
                {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-black/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#111]"
                  animate={{ width: `${((active + 1) / N) * 100}%` }}
                  transition={{ duration: 0.6, ease: luxuryEase }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
