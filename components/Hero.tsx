"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  heroHeadingVariant,
  heroSubheadingVariant,
  heroButtonVariant,
  luxuryEase,
} from "@/lib/animations";
import { useScrollVideo } from "@/hooks/useScrollVideo";
import LoadingScreen from "@/components/LoadingScreen";

// High-performance direct DOM style calculation for scroll chapters
function updateChapterStyle(
  el: HTMLElement | null,
  progress: number,
  start: number,
  fadeInEnd: number,
  fadeOutStart: number,
  end: number
) {
  if (!el) return;

  if (progress < start || progress > end) {
    if (el.style.opacity !== "0") {
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      el.style.transform = progress < start ? "translateY(40px)" : "translateY(-40px)";
    }
    return;
  }

  let opacity = 1;
  let translateY = 0;

  if (progress >= start && progress <= fadeInEnd) {
    const p = (progress - start) / (fadeInEnd - start);
    opacity = p;
    translateY = 40 * (1 - p);
  } else if (progress >= fadeOutStart && progress <= end) {
    const p = (progress - fadeOutStart) / (end - fadeOutStart);
    opacity = 1 - p;
    translateY = -40 * p;
  }

  el.style.opacity = opacity.toFixed(3);
  el.style.transform = `translateY(${translateY.toFixed(1)}px)`;
  el.style.pointerEvents = opacity > 0.05 ? "auto" : "none";
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Chapter Refs for text coming and going during scroll
  const chapter1Ref = useRef<HTMLDivElement>(null);
  const chapter2Ref = useRef<HTMLDivElement>(null);
  const chapter3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If video is already buffered in browser cache when mounted
    if (videoRef.current && videoRef.current.readyState >= 2) {
      setReady(true);
    }
    // Safety fallback: never keep loader beyond 4 seconds
    const fallbackTimer = setTimeout(() => {
      setReady(true);
    }, 4000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // High-performance direct DOM updates without React re-renders during 400vh scroll
  const handleScrollProgress = useCallback((progress: number) => {
    // 1. Initial Hero content fades out from 0.00 -> 0.15
    if (contentRef.current) {
      if (progress > 0.15) {
        if (contentRef.current.style.opacity !== "0") {
          contentRef.current.style.opacity = "0";
          contentRef.current.style.pointerEvents = "none";
          contentRef.current.style.transform = "translateY(-50px)";
        }
      } else {
        const p = progress / 0.15;
        const fade = Math.max(0, 1 - p);
        const y = p * -50;
        contentRef.current.style.opacity = fade.toFixed(3);
        contentRef.current.style.transform = `translateY(${y.toFixed(1)}px)`;
        contentRef.current.style.pointerEvents = fade <= 0.05 ? "none" : "auto";
      }
    }

    // 2. Scroll indicator fades out from 0.00 -> 0.10
    if (indicatorRef.current) {
      if (progress > 0.10) {
        if (indicatorRef.current.style.opacity !== "0") {
          indicatorRef.current.style.opacity = "0";
        }
      } else {
        const fade = Math.max(0, 1 - progress / 0.10);
        indicatorRef.current.style.opacity = fade.toFixed(3);
      }
    }

    // 3. Chapter I — THE EMOTION (active: 0.18 -> 0.42)
    updateChapterStyle(chapter1Ref.current, progress, 0.18, 0.24, 0.36, 0.42);

    // 4. Chapter II — THE CINEMA (active: 0.44 -> 0.68)
    updateChapterStyle(chapter2Ref.current, progress, 0.44, 0.50, 0.62, 0.68);

    // 5. Chapter III — THE LEGACY (active: 0.70 -> 0.94)
    updateChapterStyle(chapter3Ref.current, progress, 0.70, 0.76, 0.88, 0.94);
  }, []);

  const { prefersReducedMotion } = useScrollVideo({
    videoRef,
    containerRef,
    pinDuration: "+=400%",
    smoothing: 0.22,
    onProgress: handleScrollProgress,
  });

  const scrollToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const portfolioEl = document.getElementById("portfolio");
    if (portfolioEl) {
      portfolioEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#181615]"
    >
      {/* Loading Screen Overlay showing logo, blurred poster & spinner until video is ready */}
      <AnimatePresence>
        {!ready && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* Background Video (Lazy loaded, no autoplay, no loop, muted, playsInline, preload auto, poster) */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster="/images/hero-poster.jpg"
        onLoadedData={() => setReady(true)}
        onCanPlayThrough={() => setReady(true)}
        className={`absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Dark warm overlay: rgba(0,0,0,.28) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.28)" }}
      />

      {/* INITIAL HERO CONTENT (0% - 15% scroll) */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-16 transition-none will-change-[opacity,transform]"
      >
        <motion.p
          variants={heroSubheadingVariant}
          initial="hidden"
          animate="visible"
          className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-white/90 font-light mb-6"
        >
          Luxury Wedding Films & Photography
        </motion.p>

        <motion.h1
          variants={heroHeadingVariant}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.08] tracking-tight max-w-4xl mb-10"
        >
          Capturing Moments That Last Forever
        </motion.h1>

        <motion.div
          variants={heroButtonVariant}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mt-2"
        >
          <a
            href="#portfolio"
            onClick={scrollToPortfolio}
            className="group relative inline-flex items-center justify-center px-9 py-4 bg-white text-[#2E2A27] font-sans font-medium text-xs uppercase tracking-[0.25em] rounded-full shadow-2xl transition-all duration-500 hover:bg-[#B8926A] hover:text-white hover:shadow-[#B8926A]/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <span>View Portfolio</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: luxuryEase }}
          className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.32em] text-white/70 font-light mt-12"
        >
          Available Worldwide
        </motion.p>
      </div>

      {/* CHAPTER I — THE EMOTION (18% - 42% scroll) */}
      <div
        ref={chapter1Ref}
        style={{ opacity: 0, transform: "translateY(40px)", pointerEvents: "none" }}
        className="absolute inset-0 z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center transition-none will-change-[opacity,transform]"
      >
        <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.38em] text-[#D9B792] font-medium mb-4">
          Chapter I — The Emotion
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.12] tracking-tight mb-6">
          Unscripted & Authentic
        </h2>
        <p className="font-sans text-base sm:text-lg font-light text-white/80 max-w-2xl leading-relaxed">
          Every subtle glance, quiet tear, and spontaneous burst of joy preserved with fine-art devotion and documentary nostalgia.
        </p>
      </div>

      {/* CHAPTER II — THE CINEMA (44% - 68% scroll) */}
      <div
        ref={chapter2Ref}
        style={{ opacity: 0, transform: "translateY(40px)", pointerEvents: "none" }}
        className="absolute inset-0 z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center transition-none will-change-[opacity,transform]"
      >
        <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.38em] text-[#D9B792] font-medium mb-4">
          Chapter II — The Cinema
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.12] tracking-tight mb-6">
          A Living Heirloom
        </h2>
        <p className="font-sans text-base sm:text-lg font-light text-white/80 max-w-2xl leading-relaxed">
          Filmed on romantic, soft-tone palettes inspired by classic 35mm motion picture cinema and timeless editorial print.
        </p>
      </div>

      {/* CHAPTER III — THE LEGACY (70% - 94% scroll) */}
      <div
        ref={chapter3Ref}
        style={{ opacity: 0, transform: "translateY(40px)", pointerEvents: "none" }}
        className="absolute inset-0 z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center transition-none will-change-[opacity,transform]"
      >
        <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.38em] text-[#D9B792] font-medium mb-4">
          Chapter III — The Legacy
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.12] tracking-tight mb-6">
          Your Story, Eternal
        </h2>
        <p className="font-sans text-base sm:text-lg font-light text-white/80 max-w-2xl leading-relaxed">
          Destination weddings crafted across the globe for couples who cherish extraordinary art, breathtaking locations, and timeless romance.
        </p>
      </div>

      {/* Scroll Indicator (0% - 10% scroll) */}
      <motion.div
        ref={indicatorRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none will-change-opacity"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/60">
          {prefersReducedMotion ? "Scroll Down" : "Scrub Story"}
        </span>
        <div className="w-[22px] h-[38px] rounded-full border border-white/40 flex items-start justify-center p-1">
          <motion.div
            animate={{
              y: [0, 16, 0],
              opacity: [0.8, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-1.5 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
