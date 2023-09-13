import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MovieGrid from './MovieGrid';
import SearchBar from './SearchBar';
import MovieDetailsModal from './MovieDetailsModal';
import GenreFilter from './GenreFilter';

function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "d9578838d54d95060e756482a10532f4";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const genresData = response.data.genres;
        setGenres(genresData);
      } catch (error) {
        console.error('Error al obtener la lista de géneros', error);
      }
    };

    fetchGenres();
  }, []);

  const fetchMovies = async (searchKey, genre = "") => {
    const type = searchKey ? "search" : "discover";
    const params = {
      api_key: API_KEY,
    };

    if (searchKey) {
      params.query = searchKey;
    } else if (genre) {
      params.with_genres = genre;
    }

    try {
      const {
        data: { results },
      } = await axios.get(`${API_URL}/${type}/movie`, {
        params,
      });

      setMovies(results);
      setMovieDetails(null);

      // Limpiar el input después de la búsqueda
      setSearchKey("");
    } catch (error) {
      console.error('Error al obtener las películas', error);
    }
  };

  const selectMovie = async (movie) => {
    fetchMovieDetails(movie.id);
  };

  const fetchMovieDetails = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos,credits",
      },
    });

   
    data.director = data.credits.crew.find(
      (crewMember) => crewMember.job === "Director"
    )?.name;
    data.writer = data.credits.crew.find(
      (crewMember) => crewMember.job === "Screenplay"
    )?.name;
    data.cast = data.credits.cast;

    setMovieDetails(data);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey, selectedGenre);
  };

  useEffect(() => {
    fetchMovies(null, selectedGenre);
  }, [selectedGenre]);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">Movie FNDR</h2>

      <div className="container text-center"> {/* Contenedor centrado */}
        <SearchBar onSearch={fetchMovies} />
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          handleGenreChange={setSelectedGenre}
        />
      </div>

      <main>
        <div className="container">
          <div className="row">
            {movies.length > 0 ? (
              <MovieGrid movies={movies} onMovieSelect={selectMovie} IMAGE_PATH={IMAGE_PATH} />
            ) : (
              <p>No se encontraron películas.</p>
            )}
          </div>
        </div>
      </main>

      {movieDetails && (
        <MovieDetailsModal
          movie={movieDetails}
          isOpen={true}
          onRequestClose={() => setMovieDetails(null)}
          IMAGE_PATH={IMAGE_PATH}
        />
      )}
    </div>
  );
}

export default App;