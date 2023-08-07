import proptypes from "prop-types";
import { Card, CardImg } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100"
      onClick={() => {
        onMovieClick(movie);
      }}
      >
      <CardImg src={movie.image} width={150} height={400} alt="ImgMovie"></CardImg>
      <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

MovieCard.proptypes = {
  movie: proptypes.shape({
    title: proptypes.string.isRequired,
    image: proptypes.string,
    director: proptypes.string,
    genre: proptypes.string
  }).isRequired,
  onMovieClick: proptypes.func.isRequired
};