"use client";

import { motion } from "framer-motion";
import { luxuryEase } from "@/lib/animations";

interface GalleryCircleProps {
  className?: string;
}

export default function GalleryCircle({ className = "" }: GalleryCircleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: luxuryEase }}
      className={`relative z-20 w-[380px] h-[380px] sm:w-[440px] sm:h-[440px] lg:w-[480px] lg:h-[480px] rounded-full bg-[#F7F5F1] border border-[#2E2A27]/10 shadow-2xl flex flex-col items-center justify-center text-center p-8 sm:p-12 mx-auto pointer-events-auto ${className}`}
    >
      {/* Decorative inner circular ring */}
      <div className="absolute inset-4 sm:inset-6 rounded-full border border-[#2E2A27]/5 pointer-events-none" />

      <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.38em] text-[#B8926A] font-medium mb-3 sm:mb-4">
        Our Love Stories
      </span>

      <h3 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-light text-[#2E2A27] leading-[1.12] tracking-tight mb-4 sm:mb-6 max-w-[320px]">
        Timeless Wedding Cinema
      </h3>

      <p className="font-sans text-xs sm:text-sm font-light text-[#7A736B] leading-relaxed max-w-[280px] sm:max-w-[310px] mb-8">
        Timeless wedding photography crafted with elegance, emotion, and authenticity across the globe.
      </p>

      <a
        href="#contact"
        className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-[#2E2A27] text-white font-sans font-medium text-[10px] sm:text-xs uppercase tracking-[0.26em] rounded-full shadow-xl transition-all duration-500 hover:bg-[#B8926A] hover:shadow-[#B8926A]/30 focus:outline-none focus:ring-2 focus:ring-[#2E2A27]"
      >
        <span>View Full Portfolio</span>
      </a>
    </motion.div>
  );
}
