import React, { useEffect, useState } from 'react';
import './Losowe.css';
import { useNavigate, useParams, Outlet } from 'react-router-dom';

// Funkcja do pobierania filmów z API OMDB
const getMoviesFromOMDB = async (page = 1) => {
  const url = `https://www.omdbapi.com/?s=movie&type=movie&apikey=263d22d8&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === 'True') {
    return data.Search;
  } else {
    console.log('Error fetching movies:', data.Error);
    return [];
  }
};


const Losowe = () => {
  const navigate = useNavigate();

  // Funkcja losująca film z losowej strony
  const generateRandomMovie = async () => {
    const totalPages = 20;
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    console.log(`Losowanie filmu z strony: ${randomPage}`);

    const movies = await getMoviesFromOMDB(randomPage);

    if (movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      navigate(`movie/${randomMovie.Title}`);
    } else {
      console.log('No movies found');
    }
  };

  return (
    <div className="movie-app">
      <header>
        <button className="btn-random-movie" onClick={generateRandomMovie}>
          Losowy Film
        </button>
      </header>


    <Outlet/>
    </div>
  );
};

// Strona szczegółów filmu
export const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const { title } = useParams();

  const getMovieDetails = async () => {
    const url = `https://www.omdbapi.com/?t=${title}&apikey=263d22d8`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      setMovie(data);
    } else {
      setMovie(null);
    }
  };

  React.useEffect(() => {
    getMovieDetails();
  }, [title]);

  return (
    <div className="movie-page">
      {movie ? (
        <div className="movie-detail-container">
          <div className="movie-info">
            <h2>{movie.Title}</h2>
            <p><strong>Reżyser:</strong> {movie.Director}</p>
            <p><strong>Rok produkcji:</strong> {movie.Year}</p>
            <p><strong>Gatunek:</strong> {movie.Genre}</p>
            <p><strong>Opis:</strong> {movie.Plot}</p>
          </div>
          <div className="movie-poster">
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        </div>
      ) : (
        <p>Ładowanie szczegółów filmu...</p>
      )}
    </div>
  );
};

export default Losowe;