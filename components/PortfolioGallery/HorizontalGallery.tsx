"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    title: "The Vows",
    location: "Lake Como, Italy",
    heading: "Cinematic Journeys",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Editorial",
    location: "Paris, France",
    heading: "Timeless Elegance",
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "First Dance",
    location: "Tuscany, Italy",
    heading: "Unscripted Emotion",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "The Details",
    location: "Amalfi Coast",
    heading: "Fine Art",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Golden Hour",
    location: "Santorini, Greece",
    heading: "Epic Landscapes",
    image: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "The Getaway",
    location: "Big Sur, CA",
    heading: "A True Legacy",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1600&auto=format&fit=crop",
  }
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const scrollEl = scrollRef.current;
    if (!container || !scrollEl) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollEl.scrollWidth - window.innerWidth;

      // The main horizontal scrolling timeline with snapping
      gsap.to(scrollEl, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (works.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: "power1.inOut"
          },
          invalidateOnRefresh: true,
        },
      });

      // Parallax effect for images inside the cards to make them feel alive
      imagesRef.current.forEach((img) => {
        if (!img) return;
        gsap.to(img, {
          x: 100, // Move image slightly in opposite direction of scroll
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-[#111] overflow-hidden text-[#E8EBE4]">
      <div ref={scrollRef} className="flex h-full w-[max-content] items-center">
        {works.map((work, index) => {
          const words = work.heading.split(" ");
          const line1 = words[0];
          const line2 = words.slice(1).join(" ");
          
          return (
            <div key={work.id} className="relative w-screen h-screen flex items-center justify-center flex-shrink-0">
              {/* Unique Heading for each slide, moved down to avoid navbar */}
              <div className="absolute top-36 lg:top-[28%] left-8 sm:left-24 z-20 pointer-events-none">
                <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight mix-blend-difference text-white">
                  {line1}<br/>{line2}
                </h2>
                <div className="w-20 h-[1px] bg-[#E6C15C] mt-6 mb-4" />
                <p className="font-sans uppercase tracking-[0.3em] text-xs sm:text-sm text-[#E6C15C]">
                  {work.location}
                </p>
              </div>

              {/* Image Card */}
              <div className="relative w-[85vw] sm:w-[60vw] md:w-[50vw] h-[55vh] sm:h-[70vh] group cursor-pointer lg:ml-[15vw]">
                <div className="absolute inset-0 overflow-hidden rounded-sm bg-[#1A1A1A]">
                  <img
                    ref={(el) => { imagesRef.current[index] = el; }}
                    src={work.image}
                    alt={work.title}
                    className="absolute inset-0 w-[120%] h-full max-w-none object-cover transform -translate-x-[10%] opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  />
                </div>
                
                <div className="absolute bottom-8 -right-4 sm:-right-12 z-10 bg-[#111] p-6 sm:p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] shadow-2xl">
                  <span className="block font-serif text-3xl sm:text-4xl text-white mb-2">{work.title}</span>
                  <span className="block font-sans text-xs uppercase tracking-widest text-[#E6C15C]">View Story</span>
                </div>
                
                {/* Number indicator */}
                <div className="absolute -top-8 -left-6 font-serif text-7xl text-white/10 group-hover:text-white/30 transition-colors duration-700">
                  0{index + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

