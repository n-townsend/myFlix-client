import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Home Alone",
      image:
        "https://m.media-amazon.com/images/I/91M6uQpO7ZL._AC_UY327_FMwebp_QL65_.jpg",
      description: "An eight-year-old troublemaker, mistakenly left home alone, must defend his home against a pair of burglars on Christmas eve.",
      director: "Chris Columbus",
      genre: "Comedy"
    },
    {
      id: 2,
      title: "Guardians of the Galaxy",
      image:
        "https://m.media-amazon.com/images/I/911UfDRPybL._AC_UY327_FMwebp_QL65_.jpg",
        description: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
        director: "James Gunn",
        genre: "Action"
    },
    {
      id: 3,
      title: "Thor: Ragnarok",
      image:
        "https://m.media-amazon.com/images/I/91r7nhk8PzL._AC_UY327_FMwebp_QL65_.jpg",
        description: "Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.",
        director: "Taika Waititi",
        genre: "Action"
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movies={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};