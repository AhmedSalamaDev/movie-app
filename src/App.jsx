import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WatchlistPage from './pages/WatchlistPage';

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </Router>
    </WatchlistProvider>
  );
}

export default App;