import { HeroSection } from "@/components/features/movies/HeroSection";
import { MovieSection } from "@/components/features/movies/MovieSection";
import { TVSection } from "@/components/features/movies/TVSection";
import {
  getPopularMovies,
  getCurrentYearTopRatedMovies,
  getNowMovies,
  getPopularTV,
  getCurrentYearTopRatedTV,
  getNowTV,
} from "./api/tmdb";
export default async function Home() {
  const [
    popularMovies,
    currentTopRatedMovies,
    nowMovies,
    popularTV,
    currentTopRatedTV,
    nowTV,
  ] = await Promise.all([
    getPopularMovies(),
    getCurrentYearTopRatedMovies(),
    getNowMovies(),
    getPopularTV(),
    getCurrentYearTopRatedTV(),
    getNowTV(),
  ]);
  return (
    <div>
      <HeroSection />
      <MovieSection
        title="今人気の映画作品"
        movies={popularMovies.results.slice(0, 10)}
      />
      <MovieSection
        title="今年の高評価映画作品"
        movies={currentTopRatedMovies.results.slice(0, 10)}
      />
      <MovieSection
        title="今公開中の映画作品"
        movies={nowMovies.results.slice(0, 10)}
      />
      <TVSection
        title="今人気のドラマ作品"
        tvs={popularTV.results.slice(0, 10)}
      />
      <TVSection
        title="今年の高評価ドラマ作品"
        tvs={currentTopRatedTV.results.slice(0, 10)}
      />
      <TVSection
        title="今放送中のドラマ作品"
        tvs={nowTV.results.slice(0, 10)}
      />
    </div>
  );
}
