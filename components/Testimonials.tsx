"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerContainer, luxuryEase } from "@/lib/animations";

interface Testimonial {
  id: number;
  quote: string;
  clientName: string;
  weddingLocation: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Alex and Cassie captured the absolute soul of our wedding day in Villa Balbiano. When we watched our film and scrolled through the editorial gallery, it felt like stepping into a cinematic dream. Every single guest asked who our artists were.",
    clientName: "Elena & Julian Vance",
    weddingLocation: "Villa Balbiano, Lake Como, Italy",
    date: "Summer 2025",
  },
  {
    id: 2,
    quote:
      "Their gentle calm presence and extraordinary eye for lighting made all the difference during our sunset ceremony. The photos are timeless—soft, romantic, and imbued with genuine emotion. They are truly the master artisans of wedding photography.",
    clientName: "Amélie & Henri de Clermont",
    weddingLocation: "Château de Chantilly, France",
    date: "Autumn 2025",
  },
  {
    id: 3,
    quote:
      "We wanted imagery that felt like Vogue meets an heirloom family photo album. Atlanta Wedding Company exceeded every expectation we had. Their ability to catch quiet glances and grand celebrations with equal elegance is unmatched.",
    clientName: "Victoria & James Sterling",
    weddingLocation: "Amalfi Coast, Italy",
    date: "Spring 2025",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 md:py-40 bg-white text-[#2E2A27] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#F7F5F1] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHeading
          smallHeading="KIND WORDS"
          largeHeading="Honored To Capture Such Extraordinary Love"
          description="Read sincere words from couples whose timeless celebrations across the globe we had the privilege to document."
          className="mb-20"
        />

        {/* Three Glassmorphism Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              className="glass-panel rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative shadow-[0_10px_40px_rgba(46,42,39,0.04)] hover:shadow-[0_16px_50px_rgba(46,42,39,0.08)] transition-shadow duration-500 border border-[#2E2A27]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  {/* 5-star icons */}
                  <div className="flex items-center gap-1 text-[#B8926A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B8926A]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#B8926A]/20" />
                </div>

                <p className="font-serif italic text-lg sm:text-xl font-light text-[#2E2A27] leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-[#2E2A27]/10 flex flex-col">
                <span className="font-sans font-medium text-sm text-[#2E2A27] tracking-wide">
                  {t.clientName}
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#7A736B] mt-1 font-light">
                  {t.weddingLocation}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#B8926A] mt-2">
                  {t.date}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
