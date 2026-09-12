"use client";

import { useState, useCallback, useRef } from "react";
import GalleryImage, { GalleryItemData } from "./GalleryImage";
import { motion } from "framer-motion";
import { luxuryEase } from "@/lib/animations";

const galleryItems: GalleryItemData[] = [
  // 1. Top-Left Diamond Tile (Beach/Coastal portrait)
  {
    id: 1,
    title: "Elena & Julian",
    category: "Editorial Portrait",
    location: "Lake Como, Italy",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    maskClass: "rounded-[52px] sm:rounded-[64px] rotate-45",
    counterRotateClass: "-rotate-45 scale-[1.46]",
    positionClass: "top-[2%] left-[4%] w-[260px] sm:w-[330px] lg:w-[370px] aspect-square z-10",
    parallaxFactorX: -0.6,
    parallaxFactorY: -0.5,
  },
  // 2. Upper-Center Diamond Tile (Mountain peak / Tuscan views)
  {
    id: 2,
    title: "Sophia & Matteo",
    category: "The Ceremony",
    location: "Tuscany, Italy",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    maskClass: "rounded-[56px] sm:rounded-[70px] rotate-45",
    counterRotateClass: "-rotate-45 scale-[1.46]",
    positionClass: "top-[14%] left-[28%] sm:left-[30%] lg:left-[32%] w-[290px] sm:w-[370px] lg:w-[430px] aspect-square z-20 shadow-2xl",
    parallaxFactorX: -0.8,
    parallaxFactorY: 0.1,
  },
  // 3. Middle-Left Diamond Tile (Paris fine art details)
  {
    id: 3,
    title: "Amélie & Henri",
    category: "Fine Art Details",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
    maskClass: "rounded-[48px] sm:rounded-[60px] rotate-45",
    counterRotateClass: "-rotate-45 scale-[1.46]",
    positionClass: "top-[36%] left-[-2%] sm:left-[0%] w-[250px] sm:w-[320px] lg:w-[360px] aspect-square z-10",
    parallaxFactorX: -0.5,
    parallaxFactorY: 0.7,
  },
  // 4. Center Heart Diamond Tile (Amalfi Coast vows - centerpiece)
  {
    id: 4,
    title: "Chloe & Liam",
    category: "Golden Hour Vows",
    location: "Amalfi Coast, Italy",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
    maskClass: "rounded-[64px] sm:rounded-[80px] rotate-45",
    counterRotateClass: "-rotate-45 scale-[1.46]",
    positionClass: "top-[34%] left-[22%] sm:left-[24%] lg:left-[26%] w-[320px] sm:w-[420px] lg:w-[480px] aspect-square z-30 shadow-2xl ring-4 ring-white/60",
    parallaxFactorX: 0.6,
    parallaxFactorY: -0.6,
  },
  // 5. Middle-Right Diamond Tile (Big Sur coastal cliffs)
  {
    id: 5,
    title: "Victoria & James",
    category: "Cinematic Moments",
    location: "Big Sur, California",
    image: "https://images.unsplash.com/photo-1545232972-9bb88a5b6dcc?q=80&w=1200&auto=format&fit=crop",
    maskClass: "rounded-[52px] sm:rounded-[66px] rotate-45",
    counterRotateClass: "-rotate-45 scale-[1.46]",
    positionClass: "top-[28%] left-[48%] sm:left-[50%] lg:left-[52%] w-[280px] sm:w-[360px] lg:w-[420px] aspect-square z-20",
    parallaxFactorX: 0.8,
    parallaxFactorY: 0.2,
  },
  // 6. Bottom-Center Diamond Tile (Château de Chantilly elegance)
  {
    id: 6,
    title: "Isabella & Alexander",
    category: "Bridal Elegance",
    location: "Château de Chantilly",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop",
    maskClass: "rounded-[56px] sm:rounded-[70px] rotate-45",
    counterRotateClass: "-rotate-45 scale-[1.46]",
    positionClass: "top-[64%] left-[18%] sm:left-[20%] lg:left-[22%] w-[300px] sm:w-[390px] lg:w-[450px] aspect-square z-20",
    parallaxFactorX: 0.5,
    parallaxFactorY: 0.7,
  },
];

export default function PortfolioSection() {
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normalizedX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normalizedY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    setMouseOffset({ x: normalizedX, y: normalizedY });
  }, []);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      className="py-24 sm:py-36 lg:py-48 bg-[#EFECE6] text-[#1F1C1A] overflow-hidden relative selection:bg-[#B8926A]/20"
    >
      {/* Subtle vintage stone texture feel across section */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.04] pointer-events-none" />

      <div className="max-w-[1640px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-6">
          {/* LEFT SIDE (60%): Interlocking Rotate-45 Rounded-Diamond Collage exact replica */}
          <div className="w-full lg:w-7/12 relative h-[980px] sm:h-[1260px] lg:h-[1480px]">
            {galleryItems.map((item, idx) => (
              <GalleryImage
                key={item.id}
                item={item}
                index={idx}
                activeHoverId={activeHoverId}
                onHover={setActiveHoverId}
                mouseOffset={mouseOffset}
                isMobile={false}
              />
            ))}
          </div>

          {/* RIGHT SIDE (40%): High-Contrast Stacked Editorial Serif Title & Star Doodle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: luxuryEase }}
            className="w-full lg:w-5/12 flex flex-col items-start justify-center lg:pl-10 pt-10 lg:pt-0 z-30"
          >
            {/* High-Impact Stacked Condensed Editorial Typography (`Outdoor Travel Needs` style) */}
            <div className="relative mb-12 text-left">
              {/* Exact Star / Sparkle Icon Doodle positioned right next to upper line */}
              <div className="absolute -top-10 sm:-top-16 right-0 sm:right-6 lg:right-10 z-20 text-[#1F1C1A]">
                <svg
                  width="78"
                  height="78"
                  viewBox="0 0 78 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-14 sm:w-20 sm:h-20 text-[#1F1C1A] transform rotate-[18deg]"
                >
                  <path
                    d="M39 2L44.5 30.5L73 36L44.5 41.5L39 70L33.5 41.5L5 36L33.5 30.5L39 2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M39 16L41 33L58 36L41 39L39 56L37 39L20 36L37 33L39 16Z"
                    fill="currentColor"
                    fillOpacity="0.25"
                  />
                </svg>
              </div>

              {/* Stacked Serif Lines with precise indentation offsets */}
              <span className="font-serif text-7xl sm:text-8xl lg:text-[112px] font-normal text-[#1F1C1A] leading-[0.84] tracking-tighter block">
                Our Love
              </span>
              <span className="font-serif text-6xl sm:text-8xl lg:text-[104px] font-normal text-[#1F1C1A] leading-[0.88] tracking-tighter block ml-8 sm:ml-16 mt-2">
                Stories
              </span>
              <span className="font-serif italic text-5xl sm:text-7xl lg:text-[92px] font-light text-[#1F1C1A] leading-[0.92] tracking-tight block ml-14 sm:ml-28 mt-2">
                & Cinema
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm font-light text-[#5A544F] leading-relaxed max-w-[400px] mb-12 pl-2">
              An interlocking collection of destination weddings crafted across Lake Como, Paris, Tuscany, and Big Sur. Preserving unscripted emotion and timeless editorial elegance.
            </p>

            <div className="pl-2">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#1F1C1A] text-white font-sans font-medium text-xs uppercase tracking-[0.28em] rounded-full shadow-2xl transition-all duration-500 hover:bg-[#B8926A] hover:shadow-[#B8926A]/30 focus:outline-none focus:ring-2 focus:ring-[#1F1C1A]"
              >
                <span>Explore Full Story</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
