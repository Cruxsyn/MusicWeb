"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

interface VideoCardProps {
  videoId: string;
  title: string;
  featured?: boolean;
}

export default function VideoCard({
  videoId,
  title,
  featured = false,
}: VideoCardProps) {
  return (
    <ScrollReveal direction="up" delay={0.1}>
      <div
        className={`group overflow-hidden rounded-2xl border border-cream/[0.08] bg-cream/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-gold/20 hover:bg-cream/[0.07] ${
          featured ? "w-full" : ""
        }`}
      >
        {/* 16:9 aspect ratio container */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Title */}
        <div className="px-5 py-3.5">
          <h3
            className={`font-heading text-cream/90 ${
              featured ? "text-lg md:text-xl" : "text-base"
            }`}
          >
            {title}
          </h3>
        </div>
      </div>
    </ScrollReveal>
  );
}
