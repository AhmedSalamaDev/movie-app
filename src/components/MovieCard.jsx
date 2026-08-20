import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const MovieCard = ({ movie }) => {
  const { toggleWatchlist, isFavorite } = useApp();
  const fav = isFavorite ? isFavorite(movie.id) : false;
  const fallbackPoster = 'https://placehold.co/300x450/e5e7eb/6b7280?text=No+Poster';

  // TMDB poster or fallback
  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : (movie.poster || fallbackPoster);

  // Rating percentage formatted as e.g. "85%"
  const rating = movie.vote_average !== undefined
    ? `${Math.round(movie.vote_average * 10)}%`
    : (movie.rating !== undefined ? `${movie.rating}%` : null);

  // Format release date e.g. "Sep 25, 2017"
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const formattedDate = formatDate(movie.release_date || movie.releaseDate);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleWatchlist) {
      toggleWatchlist(movie);
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="poster-link">
        <div className="poster-container">
          <img
            src={posterSrc}
            alt={movie.title || 'Movie Poster'}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackPoster;
            }}
          />
          <button
            type="button"
            className="more-btn"
            title="Options"
            aria-label="Options"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            •••
          </button>
          {rating && (
            <div className="rating-badge-circle">
              {rating}
            </div>
          )}
        </div>
      </Link>

      <div className="card-info">
        <Link to={`/movie/${movie.id}`} className="movie-title-link">
          <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
        </Link>
        <div className="card-bottom-row">
          <span className="release-date">{formattedDate}</span>
          <button
            type="button"
            className={`heart-toggle-btn ${fav ? 'active' : ''}`}
            onClick={handleHeartClick}
            aria-label={fav ? 'Remove from watchlist' : 'Add to watchlist'}
            title={fav ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {fav ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FEE135">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
