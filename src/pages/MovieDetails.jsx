import { useState, useEffect } from 'react';
import {
  getMovieDetails,
  getMovieRecommendations,
  getMovieReviews,
} from '../services/tmdbService';
import './MovieDetails.css';

function MovieDetails() {
  // State variables for movie data, recommendations, reviews, and network state
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Replace with useParams().id when routing is ready
  const movieId = 550;

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch movie details, recommendations, and reviews concurrently
        const [movieData, recommendationsData, reviewsData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieRecommendations(movieId),
          getMovieReviews(movieId),
        ]);

        setMovie(movieData);
        setRecommendations(recommendationsData.results || []);
        setReviews(reviewsData.results || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch movie data');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  // A. Loading State
  if (loading) {
    return (
      <div className="movie-details-status">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  // B. Error State
  if (error) {
    return (
      <div className="movie-details-status error">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Fallback if movie data is not available
  if (!movie) {
    return null;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Poster';

  return (
    <div className="movie-details-container">
      {/* C. Movie Hero Section */}
      <div className="movie-hero">
        <div className="movie-poster-wrapper">
          <img
            src={posterUrl}
            alt={movie.title || 'Movie Poster'}
            className="movie-poster"
          />
        </div>

        <div className="movie-info">
          <div className="movie-header">
            <h1 className="movie-title">{movie.title}</h1>
            {/* Heart / Favorite Button (UI only static placeholder) */}
            <button
              className="watchlist-btn"
              title="Add to Watchlist"
              aria-label="Add to Watchlist"
            >
              <span className="heart-icon">♥</span> Add to Watchlist
            </button>
          </div>

          <div className="movie-meta">
            {movie.release_date && (
              <span className="meta-item">
                <strong>Release:</strong> {movie.release_date}
              </span>
            )}
            {movie.runtime > 0 && (
              <span className="meta-item">
                <strong>Runtime:</strong> {movie.runtime} min
              </span>
            )}
            {movie.vote_average !== undefined && (
              <span className="meta-item rating-badge">
                ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
              </span>
            )}
            {movie.vote_count !== undefined && (
              <span className="meta-item vote-count">
                ({movie.vote_count.toLocaleString()} votes)
              </span>
            )}
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="movie-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-badge">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Spoken Languages */}
          {movie.spoken_languages && movie.spoken_languages.length > 0 && (
            <div className="movie-languages">
              <strong>Languages:</strong>{' '}
              {movie.spoken_languages
                .map((lang) => lang.english_name || lang.name)
                .join(', ')}
            </div>
          )}

          {/* Production Companies */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="movie-production">
              <strong>Production:</strong>{' '}
              {movie.production_companies.map((company) => company.name).join(', ')}
            </div>
          )}

          {/* Website Link */}
          {movie.homepage && (
            <div className="movie-homepage">
              <strong>Official Website:</strong>{' '}
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="homepage-link"
              >
                Visit Website ↗
              </a>
            </div>
          )}

          {/* Overview */}
          <div className="movie-overview-section">
            <h3>Overview</h3>
            <p className="movie-overview">
              {movie.overview || 'No overview available for this movie.'}
            </p>
          </div>
        </div>
      </div>

      {/* D. Recommendations Section */}
      <section className="movie-section">
        <h2 className="section-title">Recommendations</h2>
        {recommendations.length === 0 ? (
          <p className="empty-message">No recommendations available.</p>
        ) : (
          <div className="recommendations-grid">
            {recommendations.map((item) => (
              <div key={item.id} className="recommendation-card">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                      : 'https://placehold.co/500x750?text=No+Poster'
                  }
                  alt={item.title || 'Recommended Movie'}
                  className="recommendation-image"
                />
                <div className="recommendation-details">
                  <h4 className="recommendation-name">{item.title}</h4>
                  <span className="recommendation-rating">
                    ★ {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* E. Reviews Section */}
      <section className="movie-section">
        <h2 className="section-title">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="empty-message">No reviews available yet.</p>
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="review-author">{review.author}</span>
                  {review.created_at && (
                    <span className="review-date">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="review-content">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MovieDetails;
