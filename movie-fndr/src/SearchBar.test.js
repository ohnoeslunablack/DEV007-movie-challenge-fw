import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('debería renderizar correctamente', () => {
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    // Verificar que el campo de entrada y el botón estén presentes
    expect(screen.getByPlaceholderText('Buscar')).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });

  it('debería llamar a onSearch con el valor del campo de entrada al enviar el formulario', () => {
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    // Simular la escritura en el campo de entrada y enviar el formulario
    fireEvent.change(screen.getByPlaceholderText('Buscar'), { target: { value: 'Mi búsqueda' } });
    fireEvent.click(screen.getByText('Buscar'));

    // Verificar que la función onSearch se haya llamado con el valor correcto
    expect(mockOnSearch).toHaveBeenCalledWith('Mi búsqueda');
  });

  it('debería reiniciar el campo de entrada después de enviar el formulario', () => {
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    // Simular la escritura en el campo de entrada y enviar el formulario
    fireEvent.change(screen.getByPlaceholderText('Buscar'), { target: { value: 'Mi búsqueda' } });
    fireEvent.click(screen.getByText('Buscar'));

    // Verificar que el campo de entrada esté vacío después de enviar el formulario
    expect(screen.getByPlaceholderText('Buscar')).toHaveValue('');
  });
});
