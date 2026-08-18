const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Fetches detailed information for a specific movie.
 * @param {string|number} movieId - The ID of the movie.
 * @returns {Promise<Object>} Parsed JSON response containing movie details.
 */
export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return await response.json();
};

/**
 * Fetches recommended movies based on a specific movie.
 * @param {string|number} movieId - The ID of the movie.
 * @returns {Promise<Object>} Parsed JSON response containing movie recommendations.
 */
export const getMovieRecommendations = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie recommendations');
  }
  return await response.json();
};

/**
 * Fetches user reviews for a specific movie.
 * @param {string|number} movieId - The ID of the movie.
 * @returns {Promise<Object>} Parsed JSON response containing movie reviews.
 */
export const getMovieReviews = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie reviews');
  }
  return await response.json();
};
