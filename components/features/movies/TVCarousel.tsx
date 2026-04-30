"use client";
import { OMDBResponse } from "@/types/omdb";
import type { TV } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  getImdbScoreBgColor,
  getMetaScoreBgColor,
  getRtScoreBgColor,
  getTmdbScoreBgColor,
} from "@/lib/styles";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  tvs: TV[];
  title: string;
  scores: OMDBResponse[];
};

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export default function TVCarousel({ tvs, scores, title }: Props) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="mt-28">
      <div className="my-10 ml-[3%]">
        <h2 className="text-neutral-100 font-bold text-3xl border-l-6 border-amber-300 pl-5">
          {title}
        </h2>
      </div>
      <Swiper
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        modules={[Navigation]}
        navigation={true}
        spaceBetween={10}
        slidesPerView={5}
        className="relative"
      >
        {tvs.map((tv, index) => (
          <SwiperSlide key={tv.id}>
            <Link href={`tv/${tv.id}`}>
              <Image
                src={`${BASE_URL}/w500${tv.backdrop_path}`}
                alt={tv.name}
                width={500}
                height={300}
              />
            </Link>
            <div>
              <div className="my-2 px-1 line-clamp-1">
                <h3 className="text-neutral-100 font-semibold text-[14px]">
                  {tv.name}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className={`${getTmdbScoreBgColor(tv.vote_average)}  w-1/4 text-neutral-100 font-semibold text-center text-sm py-1`}
                >
                  <span>
                    TMDB <br />
                    {tv.vote_average.toFixed(1) ?? "N/A"}
                  </span>
                </div>
                <div
                  className={`${getTmdbScoreBgColor(tv.vote_average)} w-1/4 text-neutral-100 font-semibold text-center text-sm py-1`}
                >
                  <span>
                    IMDb
                    <br />
                    {scores[index].Ratings?.[0]?.Value ?? "N/A"}
                  </span>
                </div>
                <div
                  className={`${getRtScoreBgColor(scores[index].Ratings?.[1]?.Value)} w-1/4 text-neutral-100 font-semibold text-center text-sm py-1`}
                >
                  <span>
                    RT
                    <br />
                    {scores[index].Ratings?.[1]?.Value ?? "N/A"}
                  </span>
                </div>
                <div
                  className={`${getMetaScoreBgColor(scores[index].Ratings?.[2]?.Value)} w-1/4 text-neutral-100 font-semibold text-center text-sm py-1`}
                >
                  <span>
                    MC
                    <br />
                    {scores[index].Ratings?.[2]?.Value.split("/")[0] ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="absolute bottom-0 left-0 z-1 flex justify-between h-full">
          <button
            ref={prevRef}
            className="movie_prev text-neutral-100 cursor-pointer bg-gray-900/20"
          >
            <ChevronLeft className="text-neutral-100 w-15 h-15" />
          </button>
        </div>
        <div className="absolute bottom-0 right-0 z-1 flex justify-between h-full">
          <button
            ref={nextRef}
            className="movie_next text-neutral-100 cursor-pointer bg-gray-900/20"
          >
            <ChevronRight className="text-neutral-100 w-15 h-15" />
          </button>
        </div>
      </Swiper>
    </div>
  );
}
