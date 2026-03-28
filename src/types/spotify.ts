export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  external_urls: { spotify: string };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  album: SpotifyAlbum;
  artists: { name: string; id: string }[];
  duration_ms: number;
  preview_url: string | null;
  external_urls: { spotify: string };
  popularity: number;
}

export interface SpotifyTopTracksResponse {
  tracks: SpotifyTrack[];
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Simplified track shape for the frontend
export interface Track {
  id: string;
  name: string;
  albumName: string;
  albumImage: string;
  spotifyUrl: string;
  duration: string;
}
