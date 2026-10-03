"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ─── Data ─── */
const works = [
  {
    id: 1,
    title: "The Vows",
    description:
      "Witness the breathtaking emotional depth of lakeside ceremonies, where every glance is a painted masterpiece.",
    location: "Lake Como, Italy",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Timeless Elegance",
    description:
      "An editorial pursuit capturing the true essence of Parisian romance and architectural grandeur.",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Unscripted Emotion",
    description:
      "Candid embraces under the warm Tuscan sun, preserved forever as fine art.",
    location: "Tuscany, Italy",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Fine Art Details",
    description:
      "The delicate, unseen nuances that craft your unique and luxurious story.",
    location: "Amalfi Coast",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Epic Landscapes",
    description:
      "Golden hour silhouettes set against dramatic coastal cliffs for a true cinematic legacy.",
    location: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1600&auto=format&fit=crop",
  },
];

const ITEM_COUNT = works.length;

/* ─── Individual slide component (hooks at top level) ─── */
function GallerySlide({
  work,
  index,
  scrollYProgress,
}: {
  work: (typeof works)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Each item occupies a 1/(ITEM_COUNT) segment of the total scroll
  const segmentSize = 1 / ITEM_COUNT;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = start + segmentSize;

  // Image: enter from bottom → rest → exit up
  const imgY = useTransform(scrollYProgress, [start, mid, end], [120, 0, -120]);
  const imgOpacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.15, mid, end - segmentSize * 0.15, end],
    [0, 1, 1, 1, 0]
  );
  const imgScale = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.88, 1, 0.88]
  );

  // Text: same direction, slightly more travel for parallax
  const txtY = useTransform(scrollYProgress, [start, mid, end], [80, 0, -80]);
  const txtOpacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, mid, end - segmentSize * 0.2, end],
    [0, 1, 1, 1, 0]
  );

  return (
    <div className="absolute inset-0 flex flex-col md:flex-row pointer-events-none">
      {/* Image half */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center justify-center">
        <motion.div
          className="absolute w-[85%] sm:w-[80%] md:w-[80%] h-[75%] sm:h-[80%] md:h-[75%] rounded-md overflow-hidden shadow-2xl"
          style={{ y: imgY, opacity: imgOpacity, scale: imgScale }}
        >
          <img
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </div>

      {/* Text half */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center">
        <motion.div
          className="px-8 sm:px-12 md:px-16 lg:px-20 max-w-xl"
          style={{ y: txtY, opacity: txtOpacity }}
        >
          <span className="block font-serif italic text-[#E6C15C]/50 text-3xl sm:text-4xl mb-4">
            0{index + 1}
          </span>
          <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-[1.1] text-white tracking-tight">
            {work.title}
          </h3>
          <div className="w-12 h-[1px] bg-[#E6C15C] mb-6" />
          <p className="font-sans text-sm md:text-base text-white/70 mb-8 max-w-sm leading-relaxed font-light">
            {work.description}
          </p>
          <p className="font-sans uppercase tracking-[0.25em] text-[10px] sm:text-xs text-[#E6C15C]">
            {work.location}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main gallery ─── */
export default function FramerGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#111] text-[#E8EBE4]"
      style={{ height: `${ITEM_COUNT * 100}vh` }}
    >
      {/* Sticky viewport that stays pinned while we scroll through the tall container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {works.map((work, index) => (
          <GallerySlide
            key={work.id}
            work={work}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

