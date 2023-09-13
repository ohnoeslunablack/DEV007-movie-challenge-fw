import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieGrid from "./MovieGrid"; // Importa el componente MovieGrid

export const App = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "d9578838d54d95060e756482a10532f4";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [movieDetails, setMovieDetails] = useState(null);

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }

    // Limpiar el input después de la búsqueda
    setSearchKey("");
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos,credits",
      },
    });

    setMovieDetails(data);
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">MOVIE FNDR</h2>

      <form className="container mb-4" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Buscar"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button className="btn btn-primary">Buscar</button>
      </form>

      <div>
        <main>
          {movieDetails ? (
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={`${IMAGE_PATH + movie.poster_path}`}
                    alt=""
                    height={100}
                    width="50%"
                  />
                </div>
                <div className="col-md-6">
                  <h1 className="text-white">{movie.title}</h1>
                  <p className="text-white">{movie.overview}</p>
                  <p className="text-white">
                    Género:{" "}
                    {movieDetails.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p className="text-white">
                    Clasificación: {movieDetails.vote_average}
                  </p>
                  <p className="text-white">
                    Duración: {movieDetails.runtime} minutos
                  </p>
                  <p className="text-white">
                    Director:{" "}
                    {movieDetails.credits.crew.find(
                      (crewMember) => crewMember.job === "Director"
                    )?.name}
                  </p>
                  <p className="text-white">
                    Escritor:{" "}
                    {movieDetails.credits.crew.find(
                      (crewMember) => crewMember.job === "Screenplay"
                    )?.name}
                  </p>
                  {/* Agrega aquí el gráfico de puntuación */}
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>

      <MovieGrid movies={movies} selectMovie={selectMovie} />
    </div>
  );
};
export default App; 

