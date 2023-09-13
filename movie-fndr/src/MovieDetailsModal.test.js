import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from 'react-modal';
import MovieDetailsModal from './MovieDetailsModal';

// Suprimir advertencias de Modal.setAppElement
Modal.setAppElement(document.createElement('div'));

// Datos de película de ejemplo
const movie = {
  id: 1,
  title: 'Pelicula de ejemplo',
  poster_path: '/poster.jpg',
  overview: 'Esta es una película de ejemplo.',
  genres: [{ id: 1, name: 'Drama' }],
  vote_average: 7.5,
  runtime: 120,
  director: 'Director de ejemplo',
  writer: 'Escritor de ejemplo',
  cast: [{ name: 'Actor de ejemplo 1' }, { name: 'Actor de ejemplo 2' }],
};

const IMAGE_PATH = 'https://example.com/';

describe('MovieDetailsModal', () => {
  it('debería renderizar correctamente cuando está abierto', () => {
    render(
      <MovieDetailsModal movie={movie} isOpen={true} onRequestClose={() => {}} IMAGE_PATH={IMAGE_PATH} />
    );

    // Verificar que el modal esté presente y que contenga información de película
    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(movie.overview)).toBeInTheDocument();
    expect(screen.getByText(`Género: ${movie.genres[0].name}`)).toBeInTheDocument();
    expect(screen.getByText(`Ranking: ${movie.vote_average}`)).toBeInTheDocument();
    expect(screen.getByText(`Duración: ${movie.runtime} minutos`)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${movie.director}`)).toBeInTheDocument();
    expect(screen.getByText(`Escritor: ${movie.writer}`)).toBeInTheDocument();
    expect(screen.getByText(`Actores: ${movie.cast.map((actor) => actor.name).join(', ')}`)).toBeInTheDocument();
  });

  it('debería renderizar null cuando está cerrado', () => {
    render(
      <MovieDetailsModal movie={movie} isOpen={false} onRequestClose={() => {}} IMAGE_PATH={IMAGE_PATH} />
    );

    // Verificar que el componente devuelva null cuando está cerrado
    expect(screen.container.firstChild).toBeNull();
  });

  it('debería llamar a onRequestClose cuando se hace clic en el botón "Cerrar"', () => {
    const onRequestClose = jest.fn();

    render(
      <MovieDetailsModal movie={movie} isOpen={true} onRequestClose={onRequestClose} IMAGE_PATH={IMAGE_PATH} />
    );

    // Simular un clic en el botón "Cerrar"
    fireEvent.click(screen.getByText('Cerrar'));

    // Verificar que la función onRequestClose se haya llamado
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });
});
