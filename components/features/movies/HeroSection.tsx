import { getOMDBInfo } from "@/app/api/omdb";
import { getExternalIds, getTrendingAll } from "@/app/api/tmdb";
import HeroCarousel from "@/components/features/movies/HeroCarousel";

export async function HeroSection() {
  const response = await getTrendingAll();
  const movies = response.results; // 話題の作品
  const externalIds = await Promise.all(
    movies.map((movie) => getExternalIds(movie.id, movie.media_type)),
  );
  const scores = await Promise.all(
    externalIds.map((externalId) => getOMDBInfo(externalId.imdb_id)),
  );

  return <HeroCarousel movies={movies} scores={scores} />;
}
