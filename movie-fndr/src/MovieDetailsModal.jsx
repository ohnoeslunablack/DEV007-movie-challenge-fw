import React from 'react';
import Modal from 'react-modal';
import './MovieDetailsModal.css';

Modal.setAppElement('#root');

const MovieDetailsModal = ({ movie, isOpen, onRequestClose, IMAGE_PATH }) => {
  if (!isOpen || !movie) {
    return null;
  }

  const posterPath = `${IMAGE_PATH}${movie.poster_path}`;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detalles de la película"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="movie-details-modal">
        <div className="modal-image-container">
          <img
            src={posterPath}
            alt={movie.title}
            className="modal-image"
          />
        </div>
        <div className="modal-info-container">
          <h2>{movie.title}</h2>
          <div className="modal-scrollable-content">
            <p>{movie.overview}</p>
            <p>Género: {movie.genres.map((genre) => genre.name).join(', ')}</p>
            <p>Ranking: {movie.vote_average}</p>
            <p>Duración: {movie.runtime} minutos</p>
            <p>Director: {movie.director}</p>
            <p>Escritor: {movie.writer}</p>
            {movie.cast && (
              <p>Actores: {movie.cast.map((actor) => actor.name).join(', ')}</p>
            )}
          </div>
          <button onClick={onRequestClose}>Cerrar</button>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailsModal;









