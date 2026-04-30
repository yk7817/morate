import { Movie } from "@/types/tmdb";
import MovieCarousel from "./MovieCarousel";
import { getScoresMovie } from "@/lib/scores";

type Props = {
  title: string;
  movies: Movie[];
};

export async function MovieSection({ movies, title }: Props) {
  const scores = await getScoresMovie(movies, "movie");
  return <MovieCarousel title={title} movies={movies} scores={scores} />;
}
