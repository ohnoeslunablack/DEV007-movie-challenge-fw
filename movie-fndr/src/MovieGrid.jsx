import React from "react";
import "./MovieGrid.css"; // Importa tus estilos CSS aquí si es necesario

const MovieGrid = ({ movies, selectMovie }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-item"
          onClick={() => selectMovie(movie)}
        >
          <img
            src={movie.poster_path ? `${"https://image.tmdb.org/t/p/original" + movie.poster_path}` : "imagen_no_disponible.jpg"}
            alt=""
            height={500}
            width="100%"
          />
          <h4 className="text-center">{movie.title || "Sin título"}</h4>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;







        
