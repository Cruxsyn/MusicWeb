"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  light = false,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="text-center mb-12 md:mb-16">
      <motion.h2
        className={`font-heading text-4xl md:text-5xl lg:text-6xl ${
          light ? "text-cream" : "text-brown-deep"
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {title}
      </motion.h2>

      {/* Animated gold underline */}
      <motion.div
        className="mx-auto mt-4 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: 120 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />

      {subtitle && (
        <motion.p
          className={`mt-4 text-lg md:text-xl max-w-2xl mx-auto ${
            light ? "text-cream/70" : "text-brown-body"
          }`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
