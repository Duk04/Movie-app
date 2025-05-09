import { Badge } from "@/components/ui/badge";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  genres: Genre[];
  overview: string;
};

type Actor = {
  id: number;
  name: string;
};

type MovieDetailCreditProps = {
  movie: Movie;
  director: string | null;
  writers: string[];
  actors: Actor[];
};

export const MovieDetailCredit: React.FC<MovieDetailCreditProps> = ({
  movie,
  director,
  writers,
  actors,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Genres */}
      <div className="hidden md:flex flex-wrap gap-2">
        {movie.genres.map((genre) => (
          <Badge
            key={genre.id}
            className="px-[10px] py-[2px] border-[#E4E4E7] bg-white text-[12px] font-semibold text-black rounded-full dark:bg-black dark:text-white"
          >
            {genre.name}
          </Badge>
        ))}
      </div>

      {/* Overview */}
      <div className="hidden md:flex text-[16px] font-normal">
        {movie.overview}
      </div>

      <div className="px-5 md:px-0">
        {/* Director */}
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-[18px] font-bold">Director:</h1>
            <p className="text-black dark:text-white">{director}</p>
          </div>
          <hr className="border-t border-gray-300 my-4" />
        </div>

        {/* Writers */}
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-[18px] font-bold">Writers:</h1>
            <p className="text-black dark:text-white">
              {writers.length > 0 ? writers.join(", ") : "Unknown"}
            </p>
          </div>
          <hr className="border-t border-gray-300 my-4" />
        </div>

        {/* Actors */}
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-[18px] font-bold">Stars:</h1>
            <div className="flex flex-wrap gap-4">
              {actors.map((actor) => (
                <div key={actor.id} className="flex flex-col items-center">
                  <p className="text-[14px] font-semibold text-center">
                    {actor.name} ·
                  </p>
                </div>
              ))}
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4" />
        </div>
      </div>
    </div>
  );
};
