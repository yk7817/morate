import { getTrendingMovies } from "@/app/api/tmdb";
import type { Movie } from "@/types/tmdb";
import HeroCarousel from "@/components/features/movies/HeroCarousel";

export async function HeroSection() {
  type Props = {
    movies: Movie[];
  };
  const response = await getTrendingMovies();
  const movies = response.results; // 人気作品

  return <HeroCarousel movies={movies} />;
}
