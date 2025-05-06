import { Star } from "lucide-react";
type MovieDetailHeaderProps = {
  movie: any;
};
export const MovieDetailHeader: React.FC<MovieDetailHeaderProps> = ({
  movie,
}) => {
  const movieRuntimeHour = Math.floor(movie.runtime / 60);
  const movieRuntimeMinute = movie.runtime % 60;

  const releaseDate = movie.release_date.replace(/-/g, ".");

  const watched = Math.floor(movie.popularity);
  return (
    <div className="flex py-3">
      <div className="w-full px-5 flex justify-between">
        <div className="">
          <h1 className="text-[36px] font-bold">{movie.title}</h1>
          <div className="flex gap-1 text-[18px]">
            <p>{releaseDate}</p>·<p>{movieRuntimeHour}h</p>
            <p>{movieRuntimeMinute}m</p>
          </div>
        </div>
        <div>
          <p className="text-[12px]">Rating</p>
          <div className="flex items-center">
            <Star className="text-amber-300 fill-amber-300 dark:text-white dark:fill-white" />
            <div>
              <p className="text-[#09090B] dark:text-white text-[18px] font-semibold">
                {movie.vote_average.toFixed(1)}{" "}
                <span className="text-[#71717A] font-normal text-[16px]">
                  /10
                </span>
              </p>
              <p className="text-[#71717A] text-[12px]">{watched}K</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
