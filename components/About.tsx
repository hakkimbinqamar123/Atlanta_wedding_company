"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { luxuryEase } from "@/lib/animations";

export default function About() {
  return (
    <section
      id="about"
      className="py-28 md:py-40 bg-white text-[#2E2A27] overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Centered Headings */}
        <SectionHeading
          smallHeading="CAPTURING MOMENTS"
          largeHeading="Every Love Story Deserves To Be Told Beautifully"
          className="mb-20 md:mb-28"
        />

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Editorial Image Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: luxuryEase }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury editorial wedding couple portrait with fine-art film grain"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
            </div>

            {/* Subtle floating editorial badge */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-[#F7F5F1] border border-[#2E2A27]/10 p-6 sm:p-8 rounded-xl shadow-xl max-w-[240px] hidden sm:block z-10">
              <p className="font-serif italic text-2xl text-[#2E2A27] mb-1">
                &ldquo;Timeless & Cinema&rdquo;
              </p>
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#7A736B]">
                Vogue & Magnolia Rouge Featured
              </span>
            </div>
          </motion.div>

          {/* Right: Paragraph and CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: luxuryEase }}
            className="lg:col-span-6 flex flex-col justify-center gap-6 sm:gap-8 lg:pl-6"
          >
            <span className="font-sans text-xs uppercase tracking-[0.28em] text-[#B8926A] font-medium">
              Our Philosophy & Craft
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.2] text-[#2E2A27]">
              We believe there is something profound in capturing real, unscripted emotion.
            </h3>

            <div className="space-y-4 font-sans text-base sm:text-lg font-light text-[#7A736B] leading-relaxed">
              <p>
                Hi! We are husband and wife destination wedding photographers and filmmakers, Alex and Cassie. For over a decade, we have traveled across the globe—from the sun-drenched hills of Tuscany and the historic châteaux of France to secluded coastal estates—documenting love stories with an editorial, romantic eye.
              </p>
              <p>
                Whether we are working with an intimate gathering of twenty or a grand celebration of hundreds, we step into the moment up close and personal. We blend fine-art portraiture with documentary nostalgia to curate heirlooms that feel as cinematic today as they will fifty years from now.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#2E2A27] text-white font-sans font-medium text-xs uppercase tracking-[0.25em] rounded-full shadow-lg transition-all duration-500 hover:bg-[#B8926A] hover:shadow-xl focus:outline-none"
              >
                Inquire For Your Date
              </a>

              <div className="flex items-center gap-3 border-l border-[#2E2A27]/20 pl-6 py-1">
                <span className="font-serif text-3xl font-light text-[#2E2A27]">Top 30</span>
                <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#7A736B] leading-tight">
                  Rising Stars of Wedding<br />Photography NYC
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
