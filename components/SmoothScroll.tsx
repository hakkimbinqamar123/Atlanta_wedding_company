"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Expose Lenis instance globally so other components can stop/start it (e.g. lightbox)
const LenisContext = createContext<{ getInstance: () => Lenis | null }>({
  getInstance: () => null,
});

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Bridge Lenis → GSAP ScrollTrigger so scroll-driven GSAP/Framer Motion
    // animations update in sync with the virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Single named raf callback so we can properly remove it on cleanup.
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={{ getInstance: () => lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
