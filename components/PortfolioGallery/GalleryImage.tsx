"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface GalleryItemData {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  maskClass: string; // Outer rotated diamond/polygon frame (e.g. rotate-45 rounded-[64px])
  counterRotateClass?: string; // Inner counter-rotation so photo is upright (e.g. -rotate-45 scale-[1.45])
  positionClass: string; // Absolute placement coordinates
  parallaxFactorX: number;
  parallaxFactorY: number;
}

interface GalleryImageProps {
  item: GalleryItemData;
  index: number;
  activeHoverId: number | null;
  onHover: (id: number | null) => void;
  mouseOffset: { x: number; y: number };
  isMobile?: boolean;
}

export default function GalleryImage({
  item,
  index,
  activeHoverId,
  onHover,
  mouseOffset,
  isMobile = false,
}: GalleryImageProps) {
  const isHovered = activeHoverId === item.id;
  const hasActiveHover = activeHoverId !== null;

  // Parallax displacement based on cursor distance from section center
  const parallaxX = isMobile ? 0 : mouseOffset.x * item.parallaxFactorX * 14;
  const parallaxY = isMobile ? 0 : mouseOffset.y * item.parallaxFactorY * 14;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.95,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => !isMobile && onHover(item.id)}
      onMouseLeave={() => !isMobile && onHover(null)}
      style={{
        transform: isMobile
          ? "none"
          : `translate3d(${parallaxX.toFixed(1)}px, ${(
              parallaxY + (isHovered ? -8 : 0)
            ).toFixed(1)}px, 0)`,
        opacity: hasActiveHover ? (isHovered ? 1 : 0.65) : 1,
      }}
      className={`group cursor-pointer transition-all duration-500 ease-out overflow-hidden shadow-2xl bg-[#F0F3EC] ${
        item.maskClass
      } ${
        isMobile
          ? "relative w-full aspect-square mb-8 rounded-[48px] overflow-hidden"
          : `absolute ${item.positionClass} ${
              isHovered
                ? "z-40 shadow-2xl shadow-[#111111]/40 ring-4 ring-[#C49A45]/50 scale-103"
                : "z-10 border-[6px] border-[#F0F3EC]"
            }`
      }`}
    >
      {/* Inner Counter-Rotated Image Container to keep photo upright & full bleed inside diamond frame */}
      <div
        className={`relative w-full h-full overflow-hidden transition-all duration-600 ease-out ${
          item.counterRotateClass || ""
        }`}
      >
        <div
          className={`relative w-full h-full transition-transform duration-600 ease-out ${
            isHovered ? "scale-110 brightness-105 saturate-115" : "scale-100 brightness-100 saturate-100"
          }`}
        >
          <Image
            src={item.image}
            alt={`${item.title} — ${item.category} in ${item.location}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out"
            priority={index <= 2}
          />

          {/* Warm editorial shadow vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-500 ease-out" />

          {/* Location & Couple Story Overlay sliding up on hover */}
          <div
            className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white flex flex-col justify-end transition-all duration-500 ease-out ${
              isHovered || isMobile
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.34em] font-medium text-[#E6C15C] mb-1">
              {item.location}
            </span>
            <h4 className="font-serif italic text-xl sm:text-2xl font-light text-white leading-tight tracking-wide">
              {item.title}
            </h4>
            <div className="flex items-center gap-2 mt-2 font-sans text-[10px] uppercase tracking-[0.26em] text-white/90">
              <span>View Story</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

