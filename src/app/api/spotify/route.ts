import { NextResponse } from "next/server";
import { getArtistTopTracks } from "@/lib/spotify";
import { SPOTIFY_ARTIST_ID, FALLBACK_TRACKS } from "@/lib/constants";

export const runtime = "edge";

export async function GET() {
  try {
    const tracks = await getArtistTopTracks(SPOTIFY_ARTIST_ID);

    // If API returned no tracks, use fallback data
    const data = tracks.length > 0 ? tracks : FALLBACK_TRACKS;

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Spotify API route error:", error);

    return NextResponse.json([...FALLBACK_TRACKS], {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  }
}
