export type TrendingAll = {
  id: number;
  title?: string; // 映画の場合
  name?: string; // ドラマの場合
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  release_date?: string; // 映画の場合
  first_air_date?: string; // ドラマの場合
  genre_ids: number[];
  popularity: number;
  media_type: "movie" | "tv";
  original_language: string;
  adult: boolean;
};

export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  media_type: "movie" | "tv";
  original_language: string;
  adult: boolean;
  video: boolean;
};

export type TV = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  genre_ids: number[];
  popularity: number;
  media_type: string;
  original_language: string;
  adult: boolean;
};

export type ExternalIds = {
  id: number;
  imdb_id: string;
};

export type TMDBResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  genres: { name: string }[];
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  imdb_id: string;
};

export type MovieTrailer = {
  results: {
    key: string;
    site: string;
    id: string;
    type: string;
    published_at: string;
  }[];
};

export type TVDetail = {
  id: number;
  name: string;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  genres: { name: string }[];
  networks: { id: number; name: string; logo_path: string }[];
  vote_average: number;
  overview: string;
  seasons: {
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    poster_path: string;
    air_date: string;
  }[];
};

export type TVTrailer = {
  results: {
    key: string;
    site: string;
    id: string;
    type: string;
    published_at: string;
  }[];
};
