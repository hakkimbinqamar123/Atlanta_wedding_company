"use client"

import { ImageCarouselHero } from "@/components/ui/ai-image-generator-hero"

export default function ImageCarouselHeroDemo() {
  const demoImages = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=900",
      alt: "Wedding coastal portrait",
      rotation: -15,
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=900",
      alt: "The Ceremony",
      rotation: -8,
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=900",
      alt: "Fine Art Details",
      rotation: 5,
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=900",
      alt: "Golden Hour Vows",
      rotation: 12,
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1545232972-9bb88a5b6dcc?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=900",
      alt: "Cinematic Moments",
      rotation: -12,
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=900",
      alt: "Bridal Elegance",
      rotation: 8,
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=900",
      alt: "Romantic sunset",
      rotation: 8,
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=900",
      alt: "Wedding celebration",
      rotation: 8,
    },
  ]

  const demoFeatures = [
    {
      title: "Cinematic Quality",
      description: "Photos that look professionally crafted and tell a story.",
    },
    {
      title: "Timeless Moments",
      description: "Turn ideas into breathtaking visuals instantly.",
    },
    {
      title: "Editorial Styles",
      description: "Choose from a wide range of artistic and editorial options.",
    },
  ]

  return (
    <ImageCarouselHero
      title="Our Love Stories & Cinema"
      subtitle="Portfolio Gallery"
      description="An interlocking collection of destination weddings crafted across Lake Como, Paris, Tuscany, and Big Sur. Preserving unscripted emotion and timeless editorial elegance."
      ctaText="Explore Full Story"
      onCtaClick={() => console.log("Explore Full Story clicked!")}
      images={demoImages}
      features={demoFeatures}
    />
  )
}
