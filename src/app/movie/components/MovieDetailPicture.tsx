import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";
import { Trailer } from "@/components/carausel/Trailer";

// Define a type for the video object
type VideoType = {
  key: string;
  site: string;
  type: string;
};

// Define a type for the movie object
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  overview: string;
};

// Define props for the component
type MovieDetailPictureProps = {
  movie: Movie;
};

export const MovieDetailPicture: React.FC<MovieDetailPictureProps> = ({
  movie,
}) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

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
    <div>
      <div className="hidden md:flex gap-8">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className="h-[148px] w-[100px] md:h-[428px] md:w-[290px] rounded-[4px]"
        />

        <div className="w-full relative">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="md:h-[428px] w-full rounded-[4px] object-fill bg-cover"
          />

          <div className="absolute left-6 bottom-6 flex items-center gap-3">
            <Button
              variant="outline"
              className="flex w-10 h-10 rounded-full px-2 py-4 bg-black text-white md:bg-white md:text-black hover:opacity-70 dark:bg-white dark:text-black"
              onClick={() => fetchTrailer(movie.id)}
            >
              <Play />
            </Button>
            <p className="text-[16px] font-normal text-[#FFFFFF]">
              Play Trailer
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:hidden gap-8">
        <div className="w-full relative ">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="md:h-[428px] w-full rounded-[4px] object-fill bg-cover"
          />

          <div className="absolute left-6 bottom-6 flex items-center gap-3">
            <Button
              variant="outline"
              className="flex w-10 h-10 rounded-full px-2 py-4 bg-black text-white md:bg-white md:text-black hover:opacity-70 dark:bg-white dark:text-black"
              onClick={() => fetchTrailer(movie.id)}
            >
              <Play />
            </Button>
            <p className="text-[16px] font-normal text-[#FFFFFF]">
              Play Trailer
            </p>
          </div>
        </div>
        <div className="flex px-5">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className="h-[148px] w-[100px] md:h-[428px] md:w-[290px] rounded-[4px]"
          />
        </div>
      </div>
      <Trailer trailerKey={trailerKey} setTrailerKey={setTrailerKey} />
    </div>
  );
};
