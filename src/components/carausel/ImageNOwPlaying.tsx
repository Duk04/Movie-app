"use client";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Nowplaying = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export const ImageNOwPlaying = () => {
  const [movieNow, setMovieNOw] = useState<Nowplaying[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data } = useFetchDataClient(
    "/movie/now_playing?language=en-US&page=1"
  );

  useEffect(() => {
    if (data) {
      setMovieNOw(data.results);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movieNow.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [movieNow.length]);

  const movies: Nowplaying[] = data?.results ?? [];

  return (
    <Carousel className="w-screen snap-x snap-mandatory overflow-x-hidden">
      <CarouselContent
        className="flex transition-transform duration-500 w-screen m-0 bg-red-400"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          backgroundPosition: "center",
        }}
      >
        {movies.map((movie: Nowplaying) => (
          <CarouselItem
            key={movie.id}
            className="flex-shrink-0 w-full h-[246px] md:h-[600px] md:relative object-center snap-center items-center justify-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Button
              onClick={setCurrentIndex.bind(
                null,
                (currentIndex - 1) % movies.length
              )}
              className="absolute hidden md:flex top-1/2 md:left-4 bg-white text-black size-10 rounded-full"
              style={currentIndex === 0 ? { display: "none" } : {}}
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={setCurrentIndex.bind(
                null,
                (currentIndex + 1) % movies.length
              )}
              className="absolute hidden md:flex top-1/2 md:right-4 bg-white text-black size-10 rounded-full"
              style={
                currentIndex === movies.length - 1 ? { display: "none" } : {}
              }
            >
              <ChevronRight />
            </Button>
            <div className="absolute  md:top-[178px] md:left-[140px] md:w-[404px] text-white md:flex flex flex-col gap-4 top-[246px]">
              <div className="flex flex-col items-start ">
                <p className="font-normal text-[16px]">Now Playing:</p>
                <h2 className="md:text-[36px] font-bold">{movie.title}</h2>
                <div className="flex items-center gap-1">
                  <Star className="text-[rgba(253,224,71,1)] " />
                  <p className="text-[16px] font-semibold">
                    {movie.vote_average}
                  </p>
                  <span className="text-[16px] font-normal text-gray-500">
                    /10
                  </span>
                </div>
              </div>
              <p className="text-sm md:w-[302px]">{movie.overview}</p>
              <Button className="md:h-10 bg-[#18181B] text-[#FAFAFA] text-sm font-medium border border-none rounded-md py-2 px-4 md:w-[145px] md:bg-[#FAFAFA] md:text-[#18181B]">
                <Play /> Watch Trailer
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
