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

export default function VerticalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${works.length * 100}%`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (works.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: "power2.inOut"
          }
        },
      });

      works.forEach((_, i) => {
        if (i > 0) {
          // Image pop up animation
          tl.to(
            imagesRef.current[i - 1],
            { scale: 0.85, opacity: 0, ease: "power1.inOut" },
            `stage${i}`
          )
          .fromTo(
            imagesRef.current[i],
            { scale: 0.7, opacity: 0 },
            { scale: 1, opacity: 1, ease: "power2.out" },
            `stage${i}`
          )
          // Text crossfade
          .to(
            textRefs.current[i - 1],
            { y: -30, opacity: 0, ease: "power1.inOut" },
            `stage${i}`
          )
          .fromTo(
            textRefs.current[i],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, ease: "power2.out" },
            `stage${i}`
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-[#111] overflow-hidden text-[#E8EBE4] w-full">
      
      {/* Texts positioned absolutely */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center z-20 pointer-events-none mix-blend-difference">
        {works.map((work, index) => {
          const words = work.heading.split(" ");
          const line1 = words[0];
          const line2 = words.slice(1).join(" ");
          
          return (
            <div
              key={work.id}
              className="absolute left-8 sm:left-16 md:left-[15%] lg:left-[22%] top-1/2 -translate-y-1/2 w-full"
            >
              <div 
                ref={(el) => { textRefs.current[index] = el; }}
                style={{ 
                  opacity: index === 0 ? 1 : 0, 
                  transform: index === 0 ? "translateY(0px)" : "translateY(30px)" 
                }}
              >
                <h2 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[1.1]">
                  {line1}<br />{line2}
                </h2>
                <div className="w-20 h-[1px] bg-[#E6C15C] mb-6" />
                <p className="font-sans uppercase tracking-[0.3em] text-xs sm:text-sm text-[#E6C15C] mb-2">
                  {work.title}
                </p>
                <p className="font-sans uppercase tracking-[0.2em] text-[10px] sm:text-xs text-white/50">
                  {work.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Images positioned absolutely */}
      <div className="absolute inset-0 h-full w-full pointer-events-auto">
        {works.map((work, index) => (
          <div
            key={work.id}
            className="absolute inset-0 flex items-center justify-center md:justify-end p-6 sm:p-12 md:pr-[10%] lg:pr-[15%] w-full h-full"
            style={{ zIndex: index === 0 ? 10 : 1 }}
          >
            {/* Reduced image size with scaling popup effect */}
            <div 
              ref={(el) => { imagesRef.current[index] = el; }}
              className="relative w-full md:w-[50%] lg:w-[42%] h-[55vh] sm:h-[65vh] md:h-[70vh] rounded-sm overflow-hidden group shadow-2xl"
              style={{ 
                opacity: index === 0 ? 1 : 0,
                transform: index === 0 ? "scale(1)" : "scale(0.7)" 
              }}
            >
              <img
                src={work.image}
                alt={work.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 group-hover:opacity-0" />
              <div className="absolute top-4 left-4 font-serif text-5xl text-white/40 mix-blend-difference">
                0{index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}

