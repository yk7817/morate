import type { Movie } from "@/types/tmdb";

export default async function MovieSinglePage({ params }) {
  const { id } = await params;

  const movie = await getMovieDetail(id);

  return <div>{movie.title}</div>;
}
