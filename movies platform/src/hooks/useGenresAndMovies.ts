import { useState, useEffect } from 'react';
import { fetchFromApi } from '../api/api';
import { Movie, Genre,UseGenresAndMovies} from '../types/types';






const useGenresAndMovies = (): UseGenresAndMovies => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        //const  response= await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1bdcbbadf977d6001b666f71148cb673');
        const response = await fetchFromApi('/genre/movie/list?');

        setGenres(response.genres);
      } catch (err) {
        setError('Error loading genres');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const fetchMoviesByGenre = async (genreId: number) => {
    setSelectedGenre(genres.find(genre => genre.id === genreId) || null);
    setLoading(true);
    try {
     // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=1bdcbbadf977d6001b666f71148cb673&with_genres=${genreId}`);
      const response = await fetchFromApi(`/discover/movie?with_genres=${genreId}`);
     
      setMovies(response.results);
    } catch (err) {
      setError('Error loading movies');
    } finally {
      setLoading(false);
    }
  };

  const selectGenre = (genre: Genre) => {
    fetchMoviesByGenre(genre.id);
  };


  const clearSelection = () => {
    setSelectedGenre(null);
    setMovies([]);
  };
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const handleCloseDetail = () => {
    setSelectedMovie(null);
  };


  return {
    genres,
    movies,
    selectedMovie,
    loading,
    error,
    fetchMoviesByGenre,
    selectGenre,
    handleMovieClick,
    handleCloseDetail,
    clearSelection,
    selectedGenre
  };
};

export default useGenresAndMovies;
