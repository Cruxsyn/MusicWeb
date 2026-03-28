"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Track } from "@/types/spotify";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface TrackCardProps {
  track: Track;
  index: number;
}

export default function TrackCard({ track, index }: TrackCardProps) {
  const isRemoteImage = track.albumImage.startsWith("http");

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <motion.div
        className="flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/5 px-3 py-2.5 backdrop-blur-sm transition-shadow"
        whileHover={{
          backgroundColor: "rgba(255, 253, 245, 0.1)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Album art */}
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
          {isRemoteImage ? (
            <Image
              src={track.albumImage}
              alt={track.albumName}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/tb-monogram-transparent.png"
              alt={track.albumName}
              className="h-full w-full object-contain p-2 filter-gold"
            />
          )}
        </div>

        {/* Track info */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-heading text-base text-cream">
            {track.name}
          </h3>
          <p className="truncate text-sm text-cream/50">{track.albumName}</p>
        </div>

        {/* Spotify button */}
        <a
          href={track.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full px-4 py-2 text-xs font-medium text-white transition-colors hover:brightness-110"
          style={{ backgroundColor: "#1DB954" }}
        >
          Listen on Spotify
        </a>
      </motion.div>
    </ScrollReveal>
  );
}
