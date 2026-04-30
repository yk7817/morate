import { TV } from "@/types/tmdb";
import TVCarousel from "./TVCarousel";
import { getScoresMovie } from "@/lib/scores";

type Props = {
  tvs: TV[];
  title: string;
};

export async function TVSection({ tvs, title }: Props) {
  const scores = await getScoresMovie(tvs, "tv");
  return <TVCarousel title={title} tvs={tvs} scores={scores} />;
}
