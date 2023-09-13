import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieGrid from './MovieGrid';

// Datos de películas de ejemplo
const movies = [
  {
    id: 1,
    title: 'Pelicula 1',
    poster_path: '/poster1.jpg',
  },
  {
    id: 2,
    title: 'Pelicula 2',
    poster_path: '/poster2.jpg',
  },
];

// Función simulada para manejar la selección de películas
const onMovieSelect = jest.fn();

// URL de imagen de ejemplo
const IMAGE_PATH = 'https://example.com/';

describe('MovieGrid', () => {
  it('debería renderizar correctamente', () => {
    render(
      <MovieGrid movies={movies} onMovieSelect={onMovieSelect} IMAGE_PATH={IMAGE_PATH} />
    );

    // Verificar que el contenedor de películas y las películas estén presentes
    expect(screen.getByTestId('movie-grid')).toBeInTheDocument();
    expect(screen.getAllByTestId('movie-item')).toHaveLength(movies.length);

    // Verificar que los títulos de las películas estén presentes
    movies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it('debería llamar a la función onMovieSelect al hacer clic en una película', () => {
    render(
      <MovieGrid movies={movies} onMovieSelect={onMovieSelect} IMAGE_PATH={IMAGE_PATH} />
    );

    // Simular un clic en la primera película
    fireEvent.click(screen.getAllByTestId('movie-item')[0]);

    // Verificar que la función onMovieSelect se haya llamado con la película correcta
    expect(onMovieSelect).toHaveBeenCalledWith(movies[0]);
  });
});
