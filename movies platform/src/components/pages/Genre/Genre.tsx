import React from 'react';
import useGenresAndMovies from '../../../hooks/useGenresAndMovies';
import GenreButtons from './GenreButtons';
import MovieDetail from '../../templates/MovieDetail';
import './Genre.css';

const Genre: React.FC = () => {
  const {
    genres,
    movies,
    selectedMovie,
    loading,
    error,
    selectGenre,
    handleMovieClick,
    handleCloseDetail,
    clearSelection,
    selectedGenre
  } = useGenresAndMovies();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="genre-container">
      {!selectedGenre ? (
        <>
          <h1 className="genre-title">Movie Genres</h1>
          {
            <GenreButtons genres={genres} onSelectGenre={selectGenre} />}
        </>
      ) : (
        <div className="genre-detail">
          <button className="back-button" onClick={clearSelection}>Back to Genres</button>
          <h2 className="genre-detail-title">{selectedGenre.name}</h2>
          <div className="movie-list">

            {movies.map((movie, index) => (
              <div key={index} className="movie-item" onClick={() => handleMovieClick(movie)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>Release Date: {movie.release_date}</p>
                  <p>Rating: {movie.vote_average}</p>
                </div>
              </div>
            ))}

          </div>

        </div>


      )}
   {selectedMovie && (
  <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
)}


    </div>
  );
}

export default Genre;
