"use client";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Play, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Trailer } from "./Trailer";
import { CarauselSkeleton } from "./CarauselSkeleton";

type getType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number;
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

type VideoType = {
  key: string;
  site: string;
  type: string;
};

export const CaroselImage = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [next, setNext] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const { data } = useFetchDataClient(
    "/movie/now_playing?language=en-US&page=1"
  );
  const nowPlaying: getType[] = data?.results ?? [];

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => {
      setNext(false);
      api.scrollNext();
      setNext(true);
    }, 3000);
    return () => {
      api.off("select", onSelect);
      clearInterval(interval);
    };
  }, [api]);
  if (nowPlaying.length === 0) {
    return (
      <div>
        <CarauselSkeleton />
      </div>
    );
  }
  const fetchTrailer = async (movieId: number) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${process.env.TMDB_KEY}`
    );
    const data = await response.json();
    const trailer = data.results?.find(
      (video: VideoType) => video.type === "Trailer" && video.site === "YouTube"
    );
    if (trailer) {
      setTrailerKey(trailer.key);
    } else {
      alert("Trailer not available");
    }
  };

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {nowPlaying.map((movie: getType) => (
            <CarouselItem
              key={movie.id}
              className="md:relative transition:transform 0.5s ease-in-out"
            >
              <img
                className="w-full  md:h-[700px] md:w-full object-cover shrink-0"
                src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
              />
              <div className="md:h-100 md:text-white  md:absolute flex flex-col md:top-[160px] md:left-35 px-5 py-1 gap-4">
                <div>
                  <h1 className="text: md:text-xl">Now Playing:</h1>{" "}
                  <h1 className="text-3xl md:text-6xl ">{movie.title}</h1>
                  <h1 className="flex gap-2  md:text-xl md:pt-4">
                    <Star className="text-amber-300 fill-amber-300 dark:text-white dark:fill-white" />
                    {movie.vote_average.toFixed(1)} /10
                  </h1>
                </div>
                <h6 className="md:w-[500px]">{movie.overview}</h6>
                <Button
                  variant="outline"
                  className=" w-[145px] md:w-36 h-10 text-4 rounded-md bg-black text-white md:bg-white  md:text-black hover:opacity-70 dark:bg-white dark:text-black"
                  onClick={() => fetchTrailer(movie.id)}
                >
                  <Play />
                  Watch trailer
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-95 md:bottom-[37px] left-0 right-0 flex justify-center gap-2">
        {nowPlaying.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              api?.scrollTo(index);
            }}
            className={`w-1 h-1 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-white scale-155 shadow-lg "
                : "bg-gray-500 opacity-60"
            }`}
          ></button>
        ))}
      </div>

      <Trailer trailerKey={trailerKey} setTrailerKey={setTrailerKey} />
    </div>
  );
};
