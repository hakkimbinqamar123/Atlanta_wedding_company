import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// Lazy loading below-the-fold sections
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });


export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white text-[#111] overflow-x-hidden selection:bg-black/10 selection:text-[#111]">
      <Navbar />
      <main className="flex-1">
        {/* Hero renders immediately with high priority preloads and LoadingScreen */}
        <Hero />

        {/* Below-the-fold sections lazy loaded after Hero */}
        <About />
        <Gallery />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
