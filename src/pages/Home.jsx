import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

function Home() {
  const [movies, setMovies] = useState([]);
  const API_KEY = 'dfa1574581ed326efde0c20253459c7b';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#111', minHeight: '100vh' }}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>Now Playing Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} mediaType="movie" />
        ))}
      </div>
    </div>
  );
}

export default Home;