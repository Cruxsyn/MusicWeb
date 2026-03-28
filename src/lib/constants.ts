// ============================================================
// Site-wide constants — single source of truth
// ============================================================

export const SITE_NAME = "Tate Butts";
export const SITE_TAGLINE = "Jesus. Music. Basketball.";
export const SITE_BIO = "'My Defender' Out Now";
export const SITE_DESCRIPTION =
  "Official website of Tate Butts — faith-driven music that speaks to the soul.";

// Spotify
export const SPOTIFY_ARTIST_ID = "32BHM1azoYgb5hwKBDiOm3";
export const SPOTIFY_PROFILE_URL =
  "https://open.spotify.com/artist/32BHM1azoYgb5hwKBDiOm3";

// Social links
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/tatebutts/",
  tiktok: "https://www.tiktok.com/@tatebutts",
  spotify: SPOTIFY_PROFILE_URL,
  youtube: "https://www.youtube.com/@tatebutts",
  appleMusic: "https://music.apple.com/us/artist/tate-butts/1854941039",
} as const;

// Navigation items
export const NAV_ITEMS = [
  { label: "Tour", href: "#tour" },
  { label: "Music", href: "#music" },
  { label: "Videos", href: "#videos" },
  { label: "Merch", href: "#merch" },
  { label: "Stay Updated", href: "#signup" },
] as const;

// Tour section visibility flag
export const SHOW_TOUR_SECTION = true;

// Tour dates (placeholder data for when section is enabled)
export const TOUR_DATES = [
  {
    id: "1",
    date: "2026-06-15",
    city: "Nashville, TN",
    venue: "Ryman Auditorium",
    ticketUrl: "#",
  },
  {
    id: "2",
    date: "2026-06-22",
    city: "Columbia, SC",
    venue: "Colonial Life Arena",
    ticketUrl: "#",
  },
  {
    id: "3",
    date: "2026-07-01",
    city: "Atlanta, GA",
    venue: "State Farm Arena",
    ticketUrl: "#",
  },
] as const;

// YouTube video IDs
export const VIDEO_IDS = [
  { id: "HwqSS3PGzxI", title: "My Defender - Official Music Video" },
  { id: "r3OMu4smvMQ", title: "The Jennifer Hudson Show Performance" },
  { id: "s7XT6lDvmTU", title: "My Defender" },
] as const;

// Fallback track data (used when Spotify API is unavailable)
export const FALLBACK_TRACKS = [
  {
    id: "1",
    name: "My Defender",
    albumName: "My Defender",
    albumImage: "/images/tb-monogram.png",
    spotifyUrl:
      "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",
    duration: "3:45",
  },
  {
    id: "2",
    name: "Beginning of My Journey",
    albumName: "Beginning of My Journey",
    albumImage: "/images/tb-monogram.png",
    spotifyUrl:
      "https://open.spotify.com/artist/32BHM1azoYgb5hwKBDiOm3",
    duration: "0:50",
  },
] as const;
