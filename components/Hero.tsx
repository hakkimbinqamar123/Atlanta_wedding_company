"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Using premium images generated previously, as image generation quota is exhausted
const images = [
  "/images/gallery/gallery_ceremony_1791021273744.png",
  "/images/gallery/gallery_couple_1791021341611.png",
  "/images/gallery/gallery_golden_hour_1791021356706.png",
  "/images/gallery/gallery_reception_1791021310470.png",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#111]">
      {/* Carousel Images */}
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={`Wedding Hero Image ${i + 1}`}
            fill
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-20 bg-black/40" />

      {/* Hero Content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white px-6">
        <p className="mb-6 font-sans text-[10px] uppercase tracking-[0.4em] text-[#C49A45] sm:text-xs transition-opacity duration-1000">
          Atlanta Wedding Company
        </p>
        <h1 className="max-w-5xl font-serif text-5xl font-light leading-[1.05] tracking-tighter sm:text-7xl md:text-8xl lg:text-[110px] transition-opacity duration-1000">
          Artistry in every <span className="italic text-[#C49A45]">frame</span>
        </h1>
        
        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:gap-8 transition-opacity duration-1000">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#C49A45] text-[#111] font-sans font-medium text-[10px] sm:text-xs uppercase tracking-[0.25em] rounded-full transition-colors hover:bg-white"
          >
            View Portfolio
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-white transition-colors hover:text-[#C49A45]"
          >
            <span className="border-b border-transparent pb-1 transition-colors group-hover:border-[#C49A45]">
              Enquire Now
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      
      {/* Indicator Dots */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-[#C49A45]" : "w-1.5 bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
