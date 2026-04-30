import { OMDBResponse } from "@/types/omdb";
import type {
  TrendingAll,
  Movie,
  TV,
  TMDBResponse,
  ExternalIds,
} from "@/types/tmdb";
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function fetchTMDB(
  endpoint: string,
  revalidate: number,
): Promise<unknown> {
  try {
    const separator = endpoint.includes("?") ? "&" : "?";
    const res = await fetch(
      `${TMDB_BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY}`,
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

// 映画、ドラマ 話題の作品
export async function getTrendingAll(): Promise<TMDBResponse<TrendingAll>> {
  return fetchTMDB("/trending/all/week?language=ja-JP", 3600) as Promise<
    TMDBResponse<TrendingAll>
  >;
}

// 映画 話題の作品
export async function getTrendingMovies(): Promise<TMDBResponse<Movie>> {
  return fetchTMDB("/trending/movie/week?language=ja-JP", 3600) as Promise<
    TMDBResponse<Movie>
  >;
}

// 映画 人気作品
export async function getPopularMovies(): Promise<TMDBResponse<Movie>> {
  return fetchTMDB("/movie/popular?language=ja-JP", 3600) as Promise<
    TMDBResponse<Movie>
  >;
}

// 映画 高評価ランキング
export async function getTopRatedMovies(): Promise<TMDBResponse<Movie>> {
  return fetchTMDB("/movie/top_rated?language=ja-JP", 3600) as Promise<
    TMDBResponse<Movie>
  >;
}

// 映画 今年の映画評価ランキング
export async function getCurrentYearTopRatedMovies(): Promise<
  TMDBResponse<Movie>
> {
  const currentYear = new Date().getFullYear();
  return fetchTMDB(
    `/discover/movie?sort_by=vote_average.desc&vote_count.gte=100&primary_release_date.gte=${currentYear}-01-01&language=ja-JP`,
    3600,
  ) as Promise<TMDBResponse<Movie>>;
}

// 映画 現在公開中
export async function getNowMovies(): Promise<TMDBResponse<Movie>> {
  return fetchTMDB(
    "/movie/now_playing?language=ja-JP&region=JP",
    3600,
  ) as Promise<TMDBResponse<Movie>>;
}

// 映画 現在上映中
export async function getNowPlayingMovie(): Promise<TMDBResponse<Movie>> {
  return fetchTMDB(
    "/movie/now_playing?language=ja-JP&region=JP",
    3600,
  ) as Promise<TMDBResponse<Movie>>;
}

// ドラマ 話題の作品
export async function getPopularTV(): Promise<TMDBResponse<TV>> {
  return fetchTMDB("/tv/popular?language=ja-JP", 3600) as Promise<
    TMDBResponse<TV>
  >;
}

// ドラマ 高評価ランキング
export async function getTopRatedTV(): Promise<TMDBResponse<TV>> {
  return fetchTMDB("/tv/top_rated?language=ja-JP", 3600) as Promise<
    TMDBResponse<TV>
  >;
}

// ドラマ 今年の高評価ランキング
export async function getCurrentYearTopRatedTV(): Promise<TMDBResponse<TV>> {
  const currentYear = new Date().getFullYear();
  return fetchTMDB(
    `/discover/tv?sort_by=vote_average.desc&vote_count.gte=100&first_air_date.gte=${currentYear}-01-01&language=ja-JP`,
    3600,
  ) as Promise<TMDBResponse<TV>>;
}

// ドラマ 現在放映中
export async function getNowTV(): Promise<TMDBResponse<TV>> {
  return fetchTMDB("/tv/on_the_air?language=ja-JP", 3600) as Promise<
    TMDBResponse<TV>
  >;
}

// 作品スコア用APIの取得
export async function getExternalIds(
  id: number,
  type: string,
): Promise<ExternalIds> {
  return fetchTMDB(`/${type}/${id}/external_ids`, 3600) as Promise<ExternalIds>;
}
