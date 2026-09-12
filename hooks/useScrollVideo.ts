"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollVideoOptions {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  pinDuration?: string; // e.g. "+=400%"
  smoothing?: number; // e.g. 0.22 for instantaneous smooth sync
  onProgress?: (progress: number) => void;
}

export function useScrollVideo({
  videoRef,
  containerRef,
  pinDuration = "+=400%",
  smoothing = 0.22,
  onProgress,
}: UseScrollVideoOptions) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    // Check accessibility: prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // Lazy loading & Viewport IntersectionObserver:
  // Only run video scrubbing / RAF calculations when the hero section is active inside the viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "200px 0px 200px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef]);

  // Lazy load video metadata and buffer after initial page mount to avoid blocking first paint
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    // Lazy initialization timer or requestIdleCallback
    const initVideo = () => {
      if (!isMounted || !video) return;
      video.preload = "auto";
      video.pause();

      if (video.readyState === 0) {
        video.load();
      }

      const handleLoadedMetadata = () => {
        if (!isMounted) return;
        setIsLoaded(true);
        video.currentTime = 0;
      };

      if (video.readyState >= 1) {
        handleLoadedMetadata();
      } else {
        video.addEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(initVideo, { timeout: 1500 });
    } else {
      setTimeout(initVideo, 200);
    }

    return () => {
      isMounted = false;
    };
  }, [videoRef]);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
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
          targetProgressRef.current = self.progress;
          if (onProgress) {
            onProgress(self.progress);
          }
        },
      });
    }, container);

    // High-performance RAF ticker with seeking guard and active viewport check
    const updateVideoFrame = () => {
      // Lazy effect check: Only process frame updates if the section is intersecting viewport
      if (!isInViewport || !video || isNaN(video.duration) || video.duration === 0) {
        return;
      }

      if (video.seeking) return;

      const targetTime = targetProgressRef.current * video.duration;
      const currentTime = video.currentTime;
      const diff = targetTime - currentTime;

      if (Math.abs(diff) > 0.015) {
        let nextTime = currentTime + diff * smoothing;

        if (Math.abs(targetTime - nextTime) < 0.02) {
          nextTime = targetTime;
        }

        const clampedTime = Math.max(0, Math.min(video.duration, nextTime));
        if (clampedTime !== currentTime) {
          video.currentTime = clampedTime;
        }
      }
    };

    gsap.ticker.add(updateVideoFrame);

    return () => {
      gsap.ticker.remove(updateVideoFrame);
      ctx.revert();
    };
  }, [
    isLoaded,
    prefersReducedMotion,
    isInViewport,
    pinDuration,
    smoothing,
    videoRef,
    containerRef,
    onProgress,
  ]);

  return { isLoaded, prefersReducedMotion, isInViewport };
}
