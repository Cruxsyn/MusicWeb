"use client";

import Image from "next/image";
import { Music } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { type ReactNode } from "react";

// Instagram icon (brand icons removed from lucide-react v1+)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// TikTok icon (not available in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.27 8.27 0 0 0 3.76.92V6.18a4.76 4.76 0 0 1-.01.51z" />
    </svg>
  );
}

// YouTube icon (brand icons removed from lucide-react v1+)
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: <InstagramIcon className="h-5 w-5" />,
  },
  {
    label: "TikTok",
    href: SOCIAL_LINKS.tiktok,
    icon: <TikTokIcon className="h-5 w-5" />,
  },
  {
    label: "Spotify",
    href: SOCIAL_LINKS.spotify,
    icon: <Music className="h-5 w-5" />,
  },
  {
    label: "YouTube",
    href: SOCIAL_LINKS.youtube,
    icon: <YoutubeIcon className="h-5 w-5" />,
  },
  {
    label: "Apple Music",
    href: SOCIAL_LINKS.appleMusic,
    icon: <Music className="h-5 w-5" />,
  },
];

export default function Footer() {
  return (
    <ScrollReveal direction="up" duration={0.6}>
      <footer className="relative bg-brown-deep">
        {/* Top gold gradient divider */}
        <div className="section-divider mx-auto" />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/tate-butts-official-logo.png"
              alt="Tate Butts"
              width={140}
              height={48}
              className="filter-gold h-10 w-auto object-contain"
            />
          </div>

          {/* Social icon links */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-cream/70 transition-colors duration-200 hover:text-gold"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="mt-8 text-center font-body text-sm text-cream/40">
            &copy; 2026 Tate Butts. All rights reserved.
          </p>
        </div>
      </footer>
    </ScrollReveal>
  );
}
