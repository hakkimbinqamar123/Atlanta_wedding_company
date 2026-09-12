"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { luxuryEase } from "@/lib/animations";

export default function CTA() {
  return (
    <section id="contact" className="relative w-full py-36 md:py-48 overflow-hidden flex items-center justify-center text-center">
      {/* Full-width Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1519225336804-91fe1f2db2bb?q=80&w=2000&auto=format&fit=crop"
          alt="Cinematic luxury destination wedding sunset embrace"
          fill
          sizes="100vw"
          className="object-cover object-center transform scale-105"
        />
        {/* Dark warm overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.42)" }}
        />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-white flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-white/90 font-medium mb-4"
        >
          Begin The Journey
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: luxuryEase }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight mb-8"
        >
          Let&apos;s Tell Your Story
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: luxuryEase }}
          className="font-sans text-base sm:text-lg font-light text-white/80 max-w-xl mb-12 leading-relaxed"
        >
          We take on a select number of weddings each year to ensure every celebration receives our devoted artistic attention and bespoke craftsmanship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45, ease: luxuryEase }}
        >
          <a
            href="mailto:inquire@atlantaweddingcompany.com?subject=Wedding%20Inquiry"
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#2E2A27] font-sans font-medium text-xs uppercase tracking-[0.28em] rounded-full shadow-2xl transition-all duration-500 hover:bg-[#B8926A] hover:text-white hover:shadow-[#B8926A]/40 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Book Your Wedding
          </a>
        </motion.div>
      </div>
    </section>
  );
}
