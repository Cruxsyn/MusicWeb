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

  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#1A1A1A]"
    >
      {/* Background: dark radial gradient with gold hint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(212, 160, 23, 0.08) 0%, rgba(212, 160, 23, 0.03) 30%, rgba(26, 26, 26, 1) 70%)",
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* ── Logo underlay (both desktop and mobile) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[15] flex items-center justify-center"
        style={{ y: bgTextY }}
      >
        <h1 className="sr-only">Tate Butts</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/tate-butts-logo-transparent.png"
          alt=""
          aria-hidden="true"
          className="select-none w-[70vw] max-w-[280px] md:max-w-none md:w-[36rem] lg:w-[46rem] xl:w-[56rem] h-auto object-contain"
          style={{ filter: "brightness(0)" }}
        />
      </motion.div>

      {/* ── Mobile: photo overlaying logo ── */}
      <motion.div
        className="relative z-20 flex flex-col items-center pt-20 md:hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative w-[85vw] max-w-[400px] aspect-square">
          {/* Bloom: blurred gold-tinted copy of the image behind */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/tate-hero-v3.png"
            alt=""
            aria-hidden="true"
            className="absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] object-contain object-top blur-2xl opacity-60"
            style={{
              filter: "blur(40px) brightness(1.2) sepia(1) saturate(3) hue-rotate(-10deg)",
            }}
          />
          <Image
            src="/images/tate-hero-v3.png"
            alt="Tate Butts"
            fill
            priority
            quality={95}
            className="relative object-contain object-top"
            sizes="400px"
          />
        </div>
      </motion.div>

      {/* ── Desktop: photo (md+) ── */}
      <motion.div
        className="relative z-20 mx-auto mt-20 hidden h-[calc(100vh-5rem)] w-full max-w-[850px] lg:max-w-[950px] md:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {/* Bloom: blurred gold-tinted copy of the image behind */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/tate-hero-v3.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain object-top opacity-50"
          style={{
            filter: "blur(50px) brightness(1.2) sepia(1) saturate(3) hue-rotate(-10deg)",
          }}
        />
        <Image
          src="/images/tate-hero-v3.png"
          alt="Tate Butts"
          fill
          priority
          quality={95}
          className="relative object-contain object-top"
          sizes="(max-width: 1024px) 850px, 950px"
        />
      </motion.div>

      {/* CTA — Spotify listen button */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 z-30 text-center"
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
