import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// Lazy loading below-the-fold sections to prioritize Hero video download and initial rendering speed
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: true });

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F7F5F1] text-[#2E2A27] overflow-x-hidden selection:bg-[#B8926A]/20 selection:text-[#2E2A27]">
      <Navbar />
      <main className="flex-1">
        {/* Hero renders immediately with high priority preloads and LoadingScreen */}
        <Hero />

        {/* Below-the-fold sections lazy loaded after Hero */}
        <About />
        <Portfolio />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
