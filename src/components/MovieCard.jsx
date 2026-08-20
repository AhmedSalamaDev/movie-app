import { useWatchlist } from '../context/WatchlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function MovieCard({ movie, mediaType = 'movie' }) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const isAdded = isInWatchlist(movie.id);

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750';

  return (
    <div style={{ width: '200px', backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden', position: 'relative', color: '#fff' }}>
      <img src={posterUrl} alt={movie.title || movie.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      
      <button 
        onClick={() => toggleWatchlist(movie, mediaType)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          border: 'none',
          borderRadius: '50%',
          padding: '8px',
          cursor: 'pointer',
          color: isAdded ? '#e50914' : '#fff'
        }}
      >
        {isAdded ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
      </button>

      <div style={{ padding: '10px' }}>
        <h4 style={{ margin: '5px 0', fontSize: '15px' }}>{movie.title || movie.name}</h4>
        <p style={{ margin: 0, color: '#aaa', fontSize: '13px' }}>⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
}

export default MovieCard;