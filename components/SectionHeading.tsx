"use client";

import { motion } from "framer-motion";
import { luxuryEase } from "@/lib/animations";

interface SectionHeadingProps {
  smallHeading?: string;
  largeHeading: string;
  description?: string;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  smallHeading,
  largeHeading,
  description,
  align = "center",
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const alignmentClass =
    align === "center"
      ? "text-center items-center mx-auto"
      : align === "right"
      ? "text-right items-end ml-auto"
      : "text-left items-start mr-auto";

  const textColorClass =
    theme === "dark" ? "text-white" : "text-[#111]";
  const subTextColorClass =
    theme === "dark" ? "text-white/70" : "text-[#666]";
  const smallHeadingColor =
    theme === "dark" ? "text-white/60" : "text-[#999]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: luxuryEase }}
      className={`flex flex-col gap-3 max-w-3xl ${alignmentClass} ${className}`}
    >
      {smallHeading && (
        <span
          className={`font-sans text-xs md:text-sm uppercase tracking-[0.28em] font-medium ${smallHeadingColor}`}
        >
          {smallHeading}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.12] tracking-tight ${textColorClass}`}
      >
        {largeHeading}
      </h2>
      {description && (
        <p
          className={`font-sans text-base sm:text-lg font-light leading-relaxed mt-2 max-w-2xl ${subTextColorClass}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
