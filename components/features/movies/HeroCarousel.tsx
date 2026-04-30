"use client";
import type { ExternalIds, TrendingAll } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { OMDBResponse } from "@/types/omdb";
import {
  getImdbScoreBgColor,
  getRtScoreBgColor,
  getMetaScoreBgColor,
  getTmdbScoreBgColor,
} from "@/lib/styles";

type Props = {
  movies: TrendingAll[];
  scores: OMDBResponse[];
};

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export default function HeroCarousel({ movies, scores }: Props) {
  return (
    <div>
      <div className="hero_title text-neutral-100 font-black text-4xl my-10 pl-[8%]">
        <h2 className="border-l-6 border-amber-300 pl-5">今話題の作品</h2>
      </div>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        autoplay={{ delay: 5000 }}
        centeredSlides={true}
        loop={true}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id} className="w-full">
            <Link href={`/movies/${movie.id}`}>
              <Image
                src={`${BASE_URL}/original${movie.backdrop_path}`}
                alt={movie.title ? movie.title : movie.name}
                width={1920}
                height={1000}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-0 w-full px-3 flex flex-col gap-5">
                <div className="w-fit">
                  <h3 className="text-neutral-100 drop-shadow-lg font-bold text-5xl border-b-2 border-neutral-100 pb-2">
                    {movie.title ? movie.title : movie.name}
                  </h3>
                </div>
                <div className="w-full flex gap-10 justify-items-start items-center">
                  <div>
                    <dl className="text-neutral-100 font-bold flex flex-col items-center gap-2 text-2xl">
                      <dt className="text-2xl">TMDB</dt>
                      <dd
                        className={`w-28 h-28 flex justify-center items-center rounded-full ${getTmdbScoreBgColor(movie.vote_average)}`}
                      >
                        {movie.vote_average.toFixed(1) ?? "N/A"}
                      </dd>
                    </dl>
                  </div>
                  <div>
                    <dl className="text-neutral-100 font-bold flex flex-col items-center gap-2 text-2xl">
                      <dt className="text-2xl">IMDb</dt>
                      <dd
                        className={`w-28 h-28 flex justify-center items-center rounded-full ${getImdbScoreBgColor(scores[index].Ratings?.[0]?.Value)}`}
                      >
                        {scores[index].Ratings?.[0]?.Value ?? "N/A"}
                      </dd>
                    </dl>
                  </div>
                  <div>
                    <dl className="text-neutral-100 font-bold flex flex-col items-center gap-2 text-2xl">
                      <dt className="text-[20px]">Rotten Tomatoes</dt>
                      <dd
                        className={`w-28 h-28 flex justify-center items-center rounded-full ${getRtScoreBgColor(scores[index].Ratings?.[1]?.Value)}`}
                      >
                        {scores[index].Ratings?.[1]?.Value ?? "N/A"}
                      </dd>
                    </dl>
                  </div>
                  <div>
                    <dl className="text-neutral-100 font-bold flex flex-col items-center gap-2 text-2xl">
                      <dt className="text-2xl">Metacritic</dt>
                      <dd
                        className={`w-28 h-28 flex justify-center items-center rounded-full ${getMetaScoreBgColor(scores[index].Ratings?.[2]?.Value.split("/")[0])}`}
                      >
                        {scores[index].Ratings?.[2]?.Value.split("/")[0] ??
                          "N/A"}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
