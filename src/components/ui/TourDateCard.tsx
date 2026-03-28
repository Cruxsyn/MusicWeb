"use client";

import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface TourDateCardProps {
  date: string;
  city: string;
  venue: string;
  ticketUrl: string;
  index: number;
}

export default function TourDateCard({
  date,
  city,
  venue,
  ticketUrl,
  index,
}: TourDateCardProps) {
  const { month, day, weekday } = formatDate(date);

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <motion.div
        className="flex items-center gap-6 border-b border-gold-muted/30 px-4 py-5"
        whileHover={{ backgroundColor: "rgba(240, 215, 140, 0.08)" }}
        transition={{ duration: 0.2 }}
      >
        {/* Date block */}
        <div className="shrink-0 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gold-muted">
            {month}
          </p>
          <p className="font-heading text-3xl font-bold text-gold">{day}</p>
          <p className="text-xs text-brown-body/60">{weekday}</p>
        </div>

        {/* City & venue */}
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg text-brown-deep">{city}</h3>
          <p className="text-sm text-brown-body">{venue}</p>
        </div>

        {/* Tickets button */}
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border-2 border-gold bg-transparent px-5 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-cream"
        >
          Get Tickets
        </a>
      </motion.div>
    </ScrollReveal>
  );
}
