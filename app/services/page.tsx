"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { luxuryEase } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Use our premium local images for the services
const services = [
  {
    id: "weddings",
    title: "Wedding Photography",
    tagline: "Every glance, preserved as fine art.",
    body: "Editorial, romantic coverage of your whole day, from getting ready to the last dance. We blend fine-art portraiture with documentary storytelling for images that feel timeless.",
    includes: ["Full-day or half-day coverage", "Second photographer available", "Online gallery & print rights", "Destination travel worldwide"],
    image: "/images/gallery/gallery_ceremony_1791021273744.png",
  },
  {
    id: "films",
    title: "Wedding Films",
    tagline: "Relive it in motion and sound.",
    body: "Cinematic highlight films and full-length features, with real vows and speeches, scored to match the feeling of your day.",
    includes: ["3–5 minute highlight film", "Full ceremony & speeches edit", "Drone footage where permitted", "Licensed music"],
    image: "/images/gallery/gallery_vows_1791021321390.png",
  },
  {
    id: "baby",
    title: "Baby & Newborn",
    tagline: "The smallest details, kept forever.",
    body: "Gentle, patient sessions at home or in our studio. Tiny hands, sleepy faces and quiet moments, photographed safely and without rushing.",
    includes: ["Newborn sessions (first 2 weeks)", "Milestone & first-year sessions", "Siblings and parents included", "Heirloom prints & albums"],
    image: "/images/about/about_philosophy_1791020699951.png",
  },
  {
    id: "advertising",
    title: "Advertising & Brand",
    tagline: "Imagery that makes people stop scrolling.",
    body: "Campaign, product and lifestyle photography and video for brands, hotels, venues and designers, with the same cinematic eye we bring to weddings.",
    includes: ["Campaign & product shoots", "Brand films and social reels", "Venue & hospitality content", "Commercial usage licensing"],
    image: "/images/about/about_fineart_1791020827109.png",
  },
];

const more = [
  { t: "Maternity", d: "Soft, glowing portraits before baby arrives." },
  { t: "Engagement", d: "A relaxed session to get comfortable on camera." },
  { t: "Family Portraits", d: "Natural, candid images across generations." },
  { t: "Events & Celebrations", d: "Birthdays, anniversaries and private parties." },
];

function ServiceRow({ s, i }: { s: (typeof services)[number]; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article id={s.id} className="scroll-mt-28 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-20">
      {/* Image */}
      <motion.div
        initial={{ clipPath: "inset(12% 8% 12% 8% round 24px)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.2, ease: luxuryEase }}
        className={`group relative aspect-[4/5] w-full overflow-hidden shadow-2xl lg:col-span-6 ${flip ? "lg:order-2" : ""}`}
      >
        <Image
          src={s.image}
          alt={s.title}
          fill
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </motion.div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, delay: 0.15, ease: luxuryEase }}
        className={`lg:col-span-6 ${flip ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}
      >
        <span className="font-serif text-6xl font-light italic text-[#C49A45]/60">0{i + 1}</span>
        <h2 className="mt-2 font-serif text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">{s.title}</h2>
        <p className="mt-4 font-serif text-xl italic text-[#C49A45] sm:text-2xl">{s.tagline}</p>
        <p className="mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-[#555] sm:text-lg">{s.body}</p>

        <ul className="mt-8 grid max-w-lg gap-3 border-t border-black/10 pt-8 sm:grid-cols-2">
          {s.includes.map((x) => (
            <li key={x} className="flex items-start gap-3 font-sans text-sm text-[#333]">
              <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[#C49A45]" />
              {x}
            </li>
          ))}
        </ul>

        <Link
          href={`/contact?service=${encodeURIComponent(s.title)}`}
          className="group/btn mt-10 inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-[#111] transition-colors hover:text-[#C49A45]"
        >
          <span className="border-b border-current pb-1">Enquire about {s.title.split(" ")[0]}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </Link>
      </motion.div>
    </article>
  );
}

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#E8EBE4] text-[#111] overflow-x-hidden selection:bg-black/10 selection:text-[#111]">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <header className="mx-auto max-w-7xl px-6 pb-14 pt-24 sm:px-10 md:pb-20 md:pt-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-[#C49A45]"
          >
            Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: luxuryEase }}
            className="max-w-4xl font-serif text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-8xl"
          >
            Moments worth <span className="italic text-[#C49A45]">keeping</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: luxuryEase }}
            className="mt-8 max-w-xl font-sans text-lg font-light leading-relaxed text-[#555]"
          >
            From your wedding day to your newborn&rsquo;s first week to your brand&rsquo;s next campaign, we tell stories with the same cinematic, editorial eye.
          </motion.p>

          {/* Jump links */}
          <nav aria-label="Services" className="mt-12 flex flex-wrap gap-3">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-black/20 px-5 py-2.5 font-sans text-xs tracking-wide text-[#555] transition-colors duration-500 hover:border-[#111] hover:bg-[#111] hover:text-white"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </header>

        {/* Main services */}
        <div className="mx-auto max-w-7xl space-y-28 px-6 pb-28 sm:px-10 md:space-y-44 md:pb-44">
          {services.map((s, i) => (
            <ServiceRow key={s.id} s={s} i={i} />
          ))}
        </div>

        {/* Also offering */}
        <section className="border-t border-black/10 bg-[#111] py-24 text-[#E8EBE4] md:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.4em] text-[#E6C15C]">Also offering</p>
            <h2 className="mb-14 max-w-2xl font-serif text-4xl font-light leading-tight sm:text-5xl">Every chapter of your story</h2>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {more.map((m, i) => (
                <motion.div
                  key={m.t}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: luxuryEase }}
                  className="bg-[#111] p-8 transition-colors duration-500 hover:bg-[#0A0A0A] sm:p-10"
                >
                  <h3 className="font-serif text-2xl font-light italic text-[#E6C15C]">{m.t}</h3>
                  <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/60">{m.d}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-24 text-center">
              <p className="font-serif text-4xl font-light sm:text-6xl">
                Don&rsquo;t see what you need? <span className="italic text-[#E6C15C]">Ask.</span>
              </p>
              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#E8EBE4] px-10 py-4 font-sans text-xs font-medium uppercase tracking-[0.25em] text-[#111] transition-colors duration-500 hover:bg-[#E6C15C]"
              >
                Start a conversation <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

