import React from 'react';
import './MovieGrid.css';

const MovieGrid = ({ movies, onMovieSelect, IMAGE_PATH }) => {
  return (
    <div className="container mt-3 movie-grid">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="col-md-4 mb-3 movie-item"
          onClick={() => onMovieSelect(movie)}
        >
          <img
            src={`${IMAGE_PATH}${movie.poster_path}`}
            alt=""
            height={280}
            width="100%"
          />
          <h4 className="text-center text-white">{movie.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;















        
