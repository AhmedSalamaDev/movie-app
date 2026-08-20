const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Fetch Now Playing movies from TMDB with pagination support.
 */
export const getNowPlayingMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch now playing movies');
  }
  return await response.json();
};

/**
 * Search movies by keyword from TMDB with pagination support.
 */
export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to search movies');
  }
  return await response.json();
};

/**
 * Fetch details for a specific movie from TMDB.
 */
export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return await response.json();
};

/**
 * Fetch recommendations for a specific movie from TMDB.
 */
export const getMovieRecommendations = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie recommendations');
  }
  return await response.json();
};

/**
 * Fetch reviews for a specific movie from TMDB.
 */
export const getMovieReviews = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie reviews');
  }
  return await response.json();
};
