import { Button } from "@/components/ui/button";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

type Movie = {
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

type MorelikeProps = {
  id: number;
};

export const MoreLikeThis = ({ id }: MorelikeProps) => {
  const { data } = useFetchDataClient(
    `/movie/${id}/similar?language=en-US&page=1`
  );
  const { push } = useRouter();
  const moreLike: Movie[] = data?.results ?? [];

  return (
    <div className="flex flex-col px-5">
      <div className="flex justify-between">
        <h1 className="text-[24px] font-semibold">More Like this</h1>
        <Button
          className="bg-transparent text-black dark:text-white h-[36px] px-4 py-2 text-[14px] hover:text-white"
          onClick={() => push(`/morelikethis?movies=${id}`)}
        >
          See more
          <ArrowRight />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8 md:m-10 ">
        {moreLike.slice(0, 5).map((movie) => (
          <div
            key={movie.id}
            className="shadow-md rounded-lg overflow-hidden flex flex-col gap-2 hover:opacity-75 cursor-pointer"
            onClick={() => push(`/movie/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="object-cover"
            />
            <div className="p-4 dark:bg-[#27272A]">
              <p className="flex gap-1 items-center">
                <Star className="size-4 text-amber-300 dark:text-white fill-amber-300 dark:fill-white" />
                {movie.vote_average.toFixed(1)}{" "}
                <span className="text-[16px] font-normal text-gray-500">
                  /10
                </span>
              </p>
              <h3 className="text-lg font-semibold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
