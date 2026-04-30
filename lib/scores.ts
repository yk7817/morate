import { Movie, TV } from "@/types/tmdb";
import { getExternalIds } from "@/app/api/tmdb";
import { getOMDBInfo } from "@/app/api/omdb";
import type { OMDBResponse } from "@/types/omdb";

export async function getScoresMovie(
  movies: Movie[] | TV[],
  type: "movie" | "tv",
): Promise<OMDBResponse[]> {
  const externalIds = await Promise.all(
    movies.map((movie) => getExternalIds(movie.id, type)),
  );
  const scores = await Promise.all(
    externalIds.map((externalId) => getOMDBInfo(externalId.imdb_id)),
  );
  return scores;
}
