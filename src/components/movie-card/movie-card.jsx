/* This Component will represent a single movie in the movie list from MainView
so we can render as many MovieCards as needed. */

import proptypes from "prop-types";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movieData);
      }}
    >
      {movieData.title}
    </div >
  );
};

/* Defined prop constraints for the MovieCard */
MovieCard.propTypes = {
  movieData: proptypes.shape({
    title: proptypes.string.isRequired,
    image: proptypes.string.isRequired,
    description: proptypes.string.isRequired,
    director: proptypes.string.isRequired,
    genre: proptypes.string.isRequired
  }).isRequired,
  onMovieClick: proptypes.func.isRequired
};