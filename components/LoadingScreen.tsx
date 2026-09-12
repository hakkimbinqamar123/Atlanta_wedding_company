"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#181615] overflow-hidden"
    >
      {/* Blurred Poster Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-poster.jpg"
          alt="Loading cinematic story"
          fill
          priority
          sizes="100vw"
          className="object-cover blur-3xl opacity-35 scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered Logo & Spinner */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 mb-5 rounded-full overflow-hidden border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-2xl"
        >
          <Image
            src="/images/icon.png"
            alt="Atlanta Wedding Company Logo"
            fill
            sizes="96px"
            className="object-cover p-2 rounded-full"
          />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-serif italic text-3xl sm:text-5xl font-light text-white tracking-wide"
        >
          Atlanta Wedding Company
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="font-sans text-[10px] uppercase tracking-[0.42em] text-[#B8926A] mt-2"
        >
          Fine Art Wedding Cinema
        </motion.span>

        {/* Elegant Luxury Progress Bar */}
        <div className="w-44 sm:w-56 h-[2px] bg-white/15 overflow-hidden rounded-full mt-10 relative">
          <motion.div
            className="w-1/2 h-full bg-[#B8926A] rounded-full"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-white/50 mt-4 font-light animate-pulse">
          Loading Story...
        </span>
      </div>
    </motion.div>
  );
}
