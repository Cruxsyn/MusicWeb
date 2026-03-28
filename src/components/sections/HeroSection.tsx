"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SPOTIFY_PROFILE_URL } from "@/lib/constants";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Only background text moves on scroll — photo stays fixed
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-cream"
    >
      {/* Background: warm radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(212, 160, 23, 0.12) 0%, rgba(240, 215, 140, 0.08) 30%, rgba(255, 253, 245, 1) 70%)",
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Stroke text layer — always full opacity, z-15 */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[15] flex items-center justify-center"
        style={{ y: bgTextY }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1
          className="select-none whitespace-nowrap font-heading font-normal leading-[0.85] text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[15rem] xl:text-[18rem]"
          style={{
            color: "transparent",
            WebkitTextStroke: "2.5px rgba(212, 160, 23, 0.4)",
          }}
          aria-hidden="true"
        >
          TATE BUTTS
        </h1>
      </motion.div>

      {/* Filled text layer — always full opacity, z-15 */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[15] flex items-center justify-center"
        style={{ y: bgTextY }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span
          className="text-gradient-gold select-none whitespace-nowrap font-heading font-normal leading-[0.85] text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[15rem] xl:text-[18rem]"
          aria-hidden="true"
        >
          TATE BUTTS
        </span>
      </motion.div>

      {/* Photo — pinned to top, no parallax */}
      <motion.div
        className="relative z-20 mx-auto mt-16 md:mt-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-full max-w-[600px] sm:max-w-[700px] md:max-w-[850px] lg:max-w-[950px]"
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {/* Warm golden glow behind photo */}
        <div
          className="absolute -inset-4 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, rgba(212, 160, 23, 0.3), transparent 70%)",
          }}
        />
        <Image
          src="/images/tate-hero.png"
          alt="Tate Butts"
          fill
          priority
          quality={95}
          className="relative object-contain object-top"
          sizes="(max-width: 640px) 600px, (max-width: 768px) 700px, (max-width: 1024px) 850px, 950px"
        />
      </motion.div>

      {/* CTA — Spotify listen button overlaid at the bottom */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 z-30 text-center"
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      >
        <motion.a
          href={SPOTIFY_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-[#1DB954] px-7 py-3.5 font-semibold text-white shadow-[0_4px_24px_rgba(29,185,84,0.4)] transition-colors duration-200 hover:bg-[#1ed760]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          Listen on Spotify
        </motion.a>
      </motion.div>

    </section>
  );
}
