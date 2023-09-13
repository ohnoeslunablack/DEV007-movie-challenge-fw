import React from 'react';
import "./GenreFilter.css";

function GenreFilter({ genres, selectedGenre, handleGenreChange }) { 
  return (
    <div>
      <label htmlFor="genre">Selecciona un género: </label>
      <select
        id="genre"
        value={selectedGenre}
        onChange={(e) => handleGenreChange(e.target.value)}
      >
        <option value=""> Todos los géneros </option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;


