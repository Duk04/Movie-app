"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetailSkeleton } from "@/app/movie/components/MovieDetailSkeleton";
import { MovieDetailHeader } from "@/app/movie/components/MovieDetailHeader";
import { MovieDetailPicture } from "@/app/movie/components/MovieDetailPicture";
import { MovieDetailCredit } from "@/app/movie/components/MovieDetailCredit";
import { MoreLikeThis } from "../components/MoreLikeThis";

// Define a type for the movie object
type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string | null;
  runtime: number | null;
  popularity: number | null;
  vote_average: number;
  genres: { id: number; name: string }[];
  backdrop_path: string | null;
};

// Define a type for crew members
type CrewMember = {
  job: string;
  name: string;
};

// Define a type for cast members
type CastMember = {
  id: number;
  name: string;
  character: string;
};

const MovieDetailPage = () => {
  const params = useParams();
  const movieId = params?.movieId;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [director, setDirector] = useState<string | null>(null);
  const [writers, setWriters] = useState<string[]>([]);
  const [actors, setActors] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) {
        setError("Invalid movie ID.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${process.env.TMDB_KEY}`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=${process.env.TMDB_KEY}`
          ),
        ]);

        const movieData = movieResponse.data;
        const creditsData = creditsResponse.data;

        setMovie(movieData);

        const directorData = creditsData.crew.find(
          (crewMember: CrewMember) => crewMember.job === "Director"
        );
        setDirector(directorData?.name || "Unknown");

        const writerData = creditsData.crew.filter((crewMember: CrewMember) =>
          ["Writer", "Screenplay", "Story"].includes(crewMember.job)
        );
        setWriters(writerData.map((writer: CrewMember) => writer.name));

        const actorData = creditsData.cast.slice(0, 3);
        setActors(actorData);
      } catch (err) {
        console.error("Error fetching movie details or credits:", err);
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div>
        <MovieDetailSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center text-red-500">
        <p>Movie not found. Please try again later.</p>
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
