import type { Movie, TV, TMDBResponse } from "@/types/tmdb";
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function fetchTMDB(
  endpoint: string,
  revalidate: number,
): Promise<TMDBResponse<unknown>> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}${endpoint}&api_key=${TMDB_API_KEY}`,
      { next: { revalidate } },
    );
    if (!res.ok) {
      throw new Error(`TMDB API ERROR: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`error: ${error}`);
    throw error;
  }
}

export async function getTrendingMovies(): Promise<TMDBResponse<Movie>> {
  return fetchTMDB("/trending/movie/week?language=ja-JP", 3600) as Promise<
    TMDBResponse<Movie>
  >;
}

export async function getPopularMovies(): Promise<TMDBResponse<Movie>> {
  return fetchTMDB("/movie/popular?language=ja-JP", 3600) as Promise<
    TMDBResponse<Movie>
  >;
}

export async function getPopularTV(): Promise<TMDBResponse<TV>> {
  return fetchTMDB("/tv/popular?language=ja-JP", 3600) as Promise<
    TMDBResponse<TV>
  >;
}

export async function getNowPlaying(): Promise<TMDBResponse<Movie>> {
  return fetchTMDB(
    "/movie/now_playing?language=ja-JP&region=JP",
    3600,
  ) as Promise<TMDBResponse<Movie>>;
}
