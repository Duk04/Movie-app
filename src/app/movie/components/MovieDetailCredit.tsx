import { Badge } from "@/components/ui/badge";
type MovieDetailCreditProps = {
  movie: any;
  director: string | null;
  writers: string[];
  actors: any[];
};
export const MovieDetailCredit: React.FC<MovieDetailCreditProps> = ({
  movie,
  director,
  writers,
  actors,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="hidden md:flex flex-wrap gap-2">
        {movie.genres.map((genre: any) => (
          <Badge
            key={genre.id}
            className="px-[10px] py-[2px] border-[#E4E4E7] bg-white dark:bg-gray-700 text-[12px] font-semibold text-black rounded-full"
          >
            {genre.name}
          </Badge>
        ))}
      </div>
      <div className="hidden md:flex text-[16px] font-normal">
        {movie.overview}
      </div>
      <div className="px-5 md:px-0">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-[18px] font-bold">Director:</h1>
            <p className="text-black dark:text-white">{director}</p>
          </div>
          <hr className="border-t border-gray-300 my-4" />
        </div>

        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-[18px] font-bold">Writers:</h1>
            <p className="text-black dark:text-white">
              {writers.length > 0 ? writers.join(", ") : "Unknown"}
            </p>
          </div>
          <hr className="border-t border-gray-300 my-4" />
        </div>

        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-[18px] font-bold">Stars:</h1>
            <div className="flex flex-wrap gap-4">
              {actors.map((actor: any) => (
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
