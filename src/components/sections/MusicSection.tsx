"use client";

import { useEffect, useState } from "react";
import type { Track } from "@/types/spotify";
import {
  FALLBACK_TRACKS,
  SPOTIFY_PROFILE_URL,
  TOUR_DATES,
} from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import TrackCard from "@/components/ui/TrackCard";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

function TourCard({ date, city, venue, ticketUrl }: {
  date: string;
  city: string;
  venue: string;
  ticketUrl: string;
}) {
  const { month, day, weekday } = formatDate(date);
  return (
    <a
      href={ticketUrl}
      className="group flex items-center gap-4 rounded-2xl border border-cream/[0.08] bg-cream/[0.04] px-5 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-gold/20 hover:bg-cream/[0.08] hover:shadow-[0_0_20px_rgba(212,160,23,0.06)]"
    >
      {/* Date block */}
      <div className="shrink-0 text-center leading-tight">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-gold-muted">{month}</p>
        <p className="font-heading text-2xl text-gold">{day}</p>
        <p className="text-[9px] uppercase tracking-wide text-cream/30">{weekday}</p>
      </div>

      {/* Subtle separator */}
      <div className="h-8 w-px bg-cream/10" />

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-cream">{city}</p>
        <p className="text-xs text-cream/40">{venue}</p>
      </div>

      {/* Arrow */}
      <span className="shrink-0 text-xs text-cream/20 transition-colors group-hover:text-gold">
        →
      </span>
    </a>
  );
}

export default function MusicSection() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error("Failed to fetch tracks");
        const data: Track[] = await res.json();
        setTracks(data);
      } catch {
        setTracks([...FALLBACK_TRACKS]);
      }
    }
    fetchTracks();
  }, []);

  return (
    <section className="relative overflow-hidden bg-brown-rich">
      {/* Subtle grain overlay */}
      <div className="noise-overlay" />

      {/* Subtle gold radial glow at top */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212, 160, 23, 0.06) 0%, transparent 60%)",
        }}
      />

      {/* ── Tour banner ── */}
      <div id="tour" className="relative z-10 border-b border-cream/[0.06] py-6 md:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-muted">
            Upcoming Shows
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {TOUR_DATES.map((td) => (
              <div key={td.id} className="min-w-[260px] flex-1">
                <TourCard
                  date={td.date}
                  city={td.city}
                  venue={td.venue}
                  ticketUrl={td.ticketUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Music ── */}
      <div id="music" className="relative z-10 pt-14 pb-16 md:pt-18 md:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Music" light />

          {/* Spotify embed */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mx-auto mb-6 max-w-xl overflow-hidden rounded-xl shadow-lg">
              <iframe
                src="https://open.spotify.com/embed/artist/32BHM1azoYgb5hwKBDiOm3?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Tate Butts on Spotify"
                className="block"
              />
            </div>
          </ScrollReveal>

          {/* Track cards */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {tracks.map((track, index) => (
              <TrackCard key={track.id} track={track} index={index} />
            ))}
          </div>

          {/* Spotify link */}
          <div className="mt-8 text-center">
            <Button variant="outline" href={SPOTIFY_PROFILE_URL} external>
              View on Spotify
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
