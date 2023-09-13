import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenreFilter from './GenreFilter';

// Mock de datos de género
const genres = [
  { id: 1, name: 'Acción' },
  { id: 2, name: 'Comedia' },
  { id: 3, name: 'Drama' },
];

// Función simulada para manejar el cambio de género
const handleGenreChange = jest.fn();

describe('GenreFilter', () => {
  it('debería renderizar correctamente', () => {
    render(
      <GenreFilter
        genres={genres}
        selectedGenre=""
        handleGenreChange={handleGenreChange}
      />
    );

    // Verificar que la etiqueta y el select estén presentes
    expect(screen.getByLabelText('Selecciona un género:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // Verificar que las opciones de género estén presentes
    genres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });

  it('debería llamar a la función handleGenreChange cuando se cambia el género', () => {
    render(
      <GenreFilter
        genres={genres}
        selectedGenre=""
        handleGenreChange={handleGenreChange}
      />
    );

    // Simular un cambio de selección
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '2' }, // Cambiar a la opción con valor 2 (Comedia)
    });

    // Verificar que la función handleGenreChange se haya llamado con el valor correcto
    expect(handleGenreChange).toHaveBeenCalledWith('2');
  });
});
