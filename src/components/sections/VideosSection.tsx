"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { VIDEO_IDS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function VideosSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="videos" className="bg-brown-rich py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="scrollbar-none flex gap-4 overflow-x-auto md:justify-center md:gap-5">
            {VIDEO_IDS.map((video, i) => (
              <motion.div
                key={video.id}
                className="w-[75vw] max-w-[380px] shrink-0 sm:w-[45vw] md:w-[31%]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="group overflow-hidden rounded-2xl bg-brown-deep shadow-lg">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    {activeVideo === video.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    ) : (
                      <button
                        onClick={() => setActiveVideo(video.id)}
                        className="absolute inset-0 h-full w-full cursor-pointer"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                            <Play className="h-6 w-6 fill-white text-white ml-0.5" />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-3 font-heading text-sm text-cream/70">
                  {video.title}
                </p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
