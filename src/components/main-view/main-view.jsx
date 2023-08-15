/* This component will act as the main homepage of the myFlix SPA. From this homepage,
users will be able to access information about different movies, create a profile, and register. */

/* Import Components Needed */
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

/* export to expose MainView Component. "const" ensures MainView identifier can not be reasigned. */
export const MainView = () => { /* Function to render what will display */
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); /* Initial null state informs that no movies have been selected */
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://nicks-movie-app-8dea9f746e67.herokuapp.com/movies"), {
      headers: { Authorization: `Bearer ${token}` }
    }
      .then((res) => res.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => { /* Takes the json response and extracts the info you request */
          return {
            id: movie._id,
            title: movie.title,
            image: movie.image,
            description: movie.description,
            director: movie.director,
            genre: movie.genre
          };
        });

        setMovies(moviesFromApi); /* Hook that updates the state of your component. */
      });
  }, [token]);

  if (!user) { /* Checks for user, if there isn't one signed in, it will redirect to the login page */
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) { /* Adding selectedMovie as a flag is similar to how the movies state is used to determine when to render the list of movies or a text message. */
    return (
      <MovieView MovieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    ); /* onBackClick sets the selectedMovie back to its initial state value (null) */
  }

  /* Function to return statement if the list of books is empty */
  if (movies.length === 0) {
    return (
      <>
        <button /* Logout Button */
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <div>The List is Empty!</div>
      </>
    );
  }

  /* The map() method below will map each element in the movies array to a piece of UI.
  After it's executed, we will have one <div>{movie.title}</div> for each movie.
  Key attribute is to select unique identifier from a list of similar objects. */
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movieData={movie} /* movieData attribute passes data from a parent to a child component. Called a prop */
          onMovieClick={(newSelectedMovie) => { /* Callback function once the element is clicked. */
            setSelectedMovie(newSelectedMovie); /* Function passed as a prop called onBookClick. It has a function 
                                                with one parameter that represents the book to be set to 
                                                selectedBook state. */
          }}
        />
      ))}
    </div>
  );
};