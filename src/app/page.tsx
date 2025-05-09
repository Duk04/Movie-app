import { MovieByList } from "@/components/MovieBylists/MovieByList";
import { CaroselImage } from "@/components/carausel/Imagee";

const Home = () => {
  return (
    <div className="">
      <CaroselImage />
      <MovieByList movieType="upcoming" />
      <MovieByList movieType="popular" />
      <MovieByList movieType="top_rated" />
    </div>
  );
};

export default Home;
