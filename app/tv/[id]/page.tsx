import Image from "next/image";
import { getTVDetail, getTVTrailer } from "@/app/api/tmdb";
import { getScoreSingleTV } from "@/lib/scores";
import {
  getImdbScoreBgColor,
  getMetaScoreBgColor,
  getRtScoreBgColor,
  getTmdbScoreBgColor,
} from "@/lib/styles";

export default async function MovieSinglePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 作品判別ID
  // 作品情報、トレイラー情報の取得
  const [tv, trailerData, score] = await Promise.all([
    getTVDetail(id),
    getTVTrailer(id),
    getScoreSingleTV(Number(id), "tv"),
  ]);
  // トレイラーサイトがYoutubeの最新動画を取得
  const tvTrailer = trailerData.results.filter(
    (t) => t.site === "YouTube" && t.type === "Trailer",
  )[0];
  return (
    <div className="max-w-7xl mx-auto">
      {/* タイトル */}
      <div className="hero_title text-neutral-100 font-black text-4xl mt-10 mb-3">
        <h1 className="border-l-6 border-amber-300 pl-5">{tv.name}</h1>
      </div>
      <div className="text-neutral-100 font-semibold text-sm flex gap-5 mb-5">
        {tv.seasons.map((season, index, arr) => {
          return index === arr.length - 1 ? (
            <span key={index}>全{season.season_number}シーズン</span>
          ) : (
            ""
          );
        })}
        <span>リリース日：{tv.first_air_date}</span>
        <div>
          ジャンル：
          {tv.genres.map((genre, index, arr) => {
            return index === arr.length - 1 ? (
              <span key={index}>{genre.name}</span>
            ) : (
              <span key={index}>{genre.name}, </span>
            );
          })}
        </div>
      </div>
      <div className="flex">
        {/* トレイラー動画 */}
        <div className="flex justify-center items-center w-full">
          {tvTrailer ? (
            <iframe
              src={`https://www.youtube.com/embed/${tvTrailer.key}`}
              title={tv.name}
              className="aspect-video"
            />
          ) : (
            <Image
              src={
                tv.backdrop_path
                  ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/${tv.backdrop_path}`
                  : `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/${tv.poster_path}`
              }
              alt={tv.name}
              width={1920}
              height={1000}
            />
          )}
        </div>
        {/* 各メディアスコア */}
        <div className="w-1/4 flex flex-col gap-2 items-center justify-center ml-2">
          <div
            className={`${getTmdbScoreBgColor(tv.vote_average)} text-2xl text-neutral-100 font-semibold flex flex-col justify-center items-center w-full flex-1`}
          >
            <p>TMFDB</p>
            <span>{tv.vote_average.toFixed(1) ?? "N/A"}</span>
          </div>
          <div
            className={`${getImdbScoreBgColor(score.Ratings?.[0]?.Value)} text-2xl text-neutral-100 font-semibold flex flex-col justify-center items-center w-full flex-1`}
          >
            <p>IMDb</p>
            <span>{score.Ratings?.[0]?.Value ?? "N/A"}</span>
          </div>
          <div
            className={`${getRtScoreBgColor(score.Ratings?.[1]?.Value)} text-2xl text-neutral-100 font-semibold flex flex-col justify-center items-center w-full flex-1`}
          >
            <p>Rotten Tomatoes</p>
            <span>{score.Ratings?.[1]?.Value ?? "N/A"}</span>
          </div>
          <div
            className={`${getMetaScoreBgColor(score.Ratings?.[2]?.Value)} text-2xl text-neutral-100 font-semibold flex flex-col justify-center items-center w-full flex-1`}
          >
            <p>Metacritic</p>
            <span>{score.Ratings?.[2]?.Value ?? "N/A"}</span>
          </div>
        </div>
      </div>
      {/* 作品説明 */}
      <div className="text-neutral-100 mt-5 break-all">
        <p>{tv.overview}</p>
      </div>
      {/** みんなのレビュー */}
      <div className="mt-24">
        <div className="text-neutral-100 font-bold text-3xl">
          <h2 className="border-b border-b-amber-300 pb-2">みんなのレビュー</h2>
        </div>
      </div>
    </div>
  );
}
