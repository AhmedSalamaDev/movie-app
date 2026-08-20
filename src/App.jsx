import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultspage';
import { MovieDetails } from './pages/MovieDetails';
import './App.css';

export const App = () => {
  return (
    <AppProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route
            path="/watchlist"
            element={
              <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
                <h2>Watchlist Screen (Assigned to Teammate)</h2>
                <p style={{ color: '#6b7280', marginTop: '12px' }}>
                  This screen will be connected once your teammate finishes their assignment.
                </p>
              </div>
            }
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;