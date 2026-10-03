"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollFramesOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  frameCount: number;
  framePath: (index: number) => string; // e.g. (i) => `/animations/ezgif-frame-${String(i).padStart(3, '0')}.png`
  pinDuration?: string;
  onProgress?: (progress: number) => void;
}

export function useScrollFrames({
  canvasRef,
  containerRef,
  frameCount,
  framePath,
  pinDuration = "+=400%",
  onProgress,
}: UseScrollFramesOptions) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const isInViewportRef = useRef(true);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Check accessibility: prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // Viewport IntersectionObserver for lazy processing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
          isInViewportRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0, rootMargin: "200px 0px 200px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef]);

  // Draw a specific frame onto the canvas
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || !img.naturalWidth) return;

      // Match canvas internal resolution to the image for crisp rendering
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    },
    [canvasRef]
  );

  // Preload all frames
  useEffect(() => {
    let isMounted = true;

    const loadFrames = () => {
      if (!isMounted) return;

      const images: HTMLImageElement[] = new Array(frameCount);
      let loadedCount = 0;

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = framePath(i + 1); // frames are 1-indexed
        images[i] = img;

        img.onload = () => {
          loadedCount++;
          // Draw first frame immediately once it loads
          if (i === 0 && isMounted) {
            drawFrame(0);
          }
          // Consider loaded when first batch (10%) is ready, for fast initial display
          if (loadedCount >= Math.min(10, frameCount) && isMounted && !isLoaded) {
            setIsLoaded(true);
          }
        };

        img.onerror = () => {
          loadedCount++;
          if (loadedCount >= Math.min(10, frameCount) && isMounted && !isLoaded) {
            setIsLoaded(true);
          }
        };
      }

      imagesRef.current = images;
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => loadFrames(), { timeout: 1000 });
    } else {
      setTimeout(loadFrames, 100);
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, framePath]);

  // ScrollTrigger + RAF animation loop
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !canvasRef.current) {
      return;
    }

    const container = containerRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: pinDuration,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetFrameRef.current = Math.round(self.progress * (frameCount - 1));
          if (onProgress) {
            onProgress(self.progress);
          }
        },
      });
    }, container);

    // High-performance RAF ticker for smooth frame interpolation
    const updateFrame = () => {
      if (!isInViewportRef.current) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (current !== target) {
        // Snap directly to target frame for crisp transitions
        currentFrameRef.current = target;
        drawFrame(target);
      }
    };

    gsap.ticker.add(updateFrame);

    return () => {
      gsap.ticker.remove(updateFrame);
      ctx.revert();
    };
  }, [
    prefersReducedMotion,
    pinDuration,
    frameCount,
    canvasRef,
    containerRef,
    onProgress,
    drawFrame,
  ]);

  return { isLoaded, prefersReducedMotion, isInViewport };
}
