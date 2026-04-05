"use client";

import { useState, useEffect } from "react";
import { Music, Menu } from "lucide-react";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Check initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = NAV_ITEMS;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 rounded-b-2xl"
        style={{
          backgroundColor: "#1A1A1A",
          opacity: scrolled ? 0.85 : 1,
          backdropFilter: scrolled ? "blur(8px)" : undefined,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* LEFT: TB Monogram */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex-shrink-0"
              aria-label="Scroll to top"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/tb-monogram-transparent.png"
                alt="Tate Butts"
                width={48}
                height={48}
                className={`h-10 w-auto object-contain transition-all duration-300 ${
                  scrolled ? "filter-gold" : "filter-cream"
                }`}
              />
            </a>

            {/* CENTER / RIGHT: Nav links (desktop) */}
            <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative font-body text-sm font-medium tracking-wide uppercase text-cream/90 transition-colors duration-200 hover:text-gold-light"
                >
                  {item.label}
                  {/* Gold underline on hover */}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* FAR RIGHT: Social icons (desktop) + mobile hamburger */}
            <div className="flex items-center gap-4">
              {/* Social icons - desktop only */}
              <div className="hidden items-center gap-3 md:flex">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-cream/70 transition-colors duration-200 hover:text-gold-light"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-cream/70 transition-colors duration-200 hover:text-gold-light"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Spotify"
                  className="text-cream/70 transition-colors duration-200 hover:text-gold-light"
                >
                  <Music className="h-4 w-4" />
                </a>
              </div>

              {/* Mobile hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-cream/90 transition-colors duration-200"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
