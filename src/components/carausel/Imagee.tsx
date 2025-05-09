"use client";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Trailer } from "./Trailer";
import { CarauselSkeleton } from "./CarauselSkeleton";

type Movie = {
  id: number;
  backdrop_path: string | null;
  title: string;
  overview: string;
  vote_average: number;
};

type VideoType = {
  key: string;
  site: string;
  type: string;
};

export const CaroselImage = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const { data } = useFetchDataClient(
    "/movie/now_playing?language=en-US&page=1"
  );
  const nowPlaying: Movie[] = data?.results ?? [];

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => {
      api.off("select", onSelect);
      clearInterval(interval);
    };
  }, [api]);

  if (nowPlaying.length === 0) {
    return <CarauselSkeleton />;
  }

  const fetchTrailer = async (movieId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${process.env.TMDB_KEY}`
      );
      const data = await response.json();
      const trailer = data.results?.find(
        (video: VideoType) =>
          video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("Trailer not available");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Failed to fetch trailer. Please try again later.");
    }
  };

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {nowPlaying.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="md:relative transition-transform duration-500 ease-in-out"
            >
              {movie.backdrop_path ? (
                <img
                  className="w-full md:h-[700px] md:w-full object-cover"
                  src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="w-full md:h-[700px] bg-gray-300 flex items-center justify-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}
              <div className="md:h-100 md:text-white md:absolute flex flex-col md:top-[160px] md:left-35 px-5 py-1 gap-4">
                <div>
                  <h1 className="text-md md:text-xl">Now Playing:</h1>
                  <h1 className="text-3xl md:text-6xl">{movie.title}</h1>
                  <h1 className="flex gap-2 md:text-xl md:pt-4">
                    <Star className="text-amber-300 fill-amber-300 dark:text-white dark:fill-white" />
                    {movie.vote_average.toFixed(1)} /10
                  </h1>
                </div>
                <h6 className="md:w-[500px]">{movie.overview}</h6>
                <Button
                  variant="outline"
                  className="w-[145px] md:w-36 h-10 text-4 rounded-md bg-black text-white md:bg-white md:text-black hover:opacity-70 dark:bg-white dark:text-black"
                  onClick={() => fetchTrailer(movie.id)}
                >
                  <Play />
                  Watch Trailer
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
                ? "bg-white scale-155 shadow-lg"
                : "bg-gray-500 opacity-60"
            }`}
          ></button>
        ))}
      </div>

      <Trailer trailerKey={trailerKey} setTrailerKey={setTrailerKey} />
    </div>
  );
};
