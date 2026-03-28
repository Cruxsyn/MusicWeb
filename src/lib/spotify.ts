import type {
  SpotifyTokenResponse,
  SpotifyTopTracksResponse,
  Track,
} from "@/types/spotify";
import { formatDuration } from "@/lib/utils";

// Module-level token cache
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

/**
 * Fetch an access token using Spotify Client Credentials flow.
 * Caches the token in memory and reuses it until it expires.
 */
export async function getSpotifyToken(): Promise<string> {
  // Return cached token if it hasn't expired (with 60s buffer)
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET env vars");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed: ${response.status}`);
  }

  const data: SpotifyTokenResponse = await response.json();

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000;

  return cachedToken;
}

/**
 * Fetch the top tracks for an artist and map them to the simplified Track type.
 * Returns an empty array on any failure.
 */
export async function getArtistTopTracks(artistId: string): Promise<Track[]> {
  try {
    const token = await getSpotifyToken();

    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      console.error(`Spotify top-tracks request failed: ${response.status}`);
      return [];
    }

    const data: SpotifyTopTracksResponse = await response.json();

    return data.tracks.map((track) => ({
      id: track.id,
      name: track.name,
      albumName: track.album.name,
      albumImage: track.album.images[0]?.url ?? "",
      spotifyUrl: track.external_urls.spotify,
      duration: formatDuration(track.duration_ms),
    }));
  } catch (error) {
    console.error("Failed to fetch artist top tracks:", error);
    return [];
  }
}
