// Importa las dependencias necesarias
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios'; // Mockear Axios

// Importa el componente App
import App from './App';

// Mockear Axios
jest.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    // Resetea el estado de Axios antes de cada prueba
    axios.get.mockReset();
  });

  it('renders App component', () => {
    // Renderiza el componente
    render(<App />);

    // Comprueba que el componente se renderiza correctamente
    expect(screen.getByText('Movie FNDR')).toBeInTheDocument();
  });

  it('fetches genres and displays them', async () => {
    // Mockea la respuesta de Axios
    axios.get.mockResolvedValue({
      data: {
        genres: [
          { id: 1, name: 'Action' },
          { id: 2, name: 'Comedy' },
        ],
      },
    });

    // Renderiza el componente
    render(<App />);

    // Espera a que se realice la llamada a Axios
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('genre/movie/list'));
    });

    // Comprueba que los géneros se muestran en el componente
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
  });

  it('fetches and displays movies when searching', async () => {
    // Mockea la respuesta de Axios
    axios.get.mockResolvedValue({
      data: {
        results: [
          { id: 1, title: 'Movie 1' },
          { id: 2, title: 'Movie 2' },
        ],
      },
    });

    // Renderiza el componente
    render(<App />);

    // Simula una búsqueda
    fireEvent.change(screen.getByPlaceholderText('Search for movies'), {
      target: { value: 'Action' },
    });

    fireEvent.click(screen.getByText('Search'));

    // Espera a que se realice la llamada a Axios
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('search/movie'));
    });

    // Comprueba que las películas se muestran en el componente
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });
});

