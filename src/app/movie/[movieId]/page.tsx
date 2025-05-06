"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetailSkeleton } from "@/app/movie/components/MovieDetailSkeleton";
import { MovieDetailHeader } from "@/app/movie/components/MovieDetailHeader";
import { MovieDetailPicture } from "@/app/movie/components/MovieDetailPicture";
import { MovieDetailCredit } from "@/app/movie/components/MovieDetailCredit";
import { MoreLikeThis } from "../components/MoreLikeThis";

const MovieDetailPage = () => {
  const params = useParams();
  const movieId = params?.movieId;

  const [movie, setMovie] = useState<any>(null);
  const [director, setDirector] = useState<string | null>(null);
  const [writers, setWriters] = useState<string[]>([]);
  const [actors, setActors] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data: movieData } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${process.env.TMDB_KEY}`
        );
        setMovie(movieData);

        const { data: creditsData } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=${process.env.TMDB_KEY}`
        );

        const directorData = creditsData.crew.find(
          (crewMember: any) => crewMember.job === "Director"
        );
        setDirector(directorData?.name || "Unknown");

        const writerData = creditsData.crew.filter((crewMember: any) =>
          ["Writer", "Screenplay", "Story"].includes(crewMember.job)
        );
        setWriters(writerData.map((writer: any) => writer.name));

        const actorData = creditsData.cast.slice(0, 3);
        setActors(actorData);
      } catch (err) {
        console.error("Error fetching movie details or credits:", err);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (!movie) {
    return (
      <div>
        <MovieDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:px-20 md:pt-10 gap-6 bg-white dark:bg-black min-h-screen">
      <MovieDetailHeader movie={movie} />
      <MovieDetailPicture movie={movie} />
      <MovieDetailCredit
        movie={movie}
        director={director}
        writers={writers}
        actors={actors}
      />
      <MoreLikeThis id={movie.id} />
    </div>
  );
};

export default MovieDetailPage;
