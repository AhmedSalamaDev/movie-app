import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleWatchlist = (movie) => {
    if (!movie) return;
    setWatchlist((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  const isFavorite = (movieId) => {
    return watchlist.some((item) => item.id === movieId);
  };

  return (
    <AppContext.Provider
      value={{
        watchlist,
        wishlist: watchlist, // Safe alias
        setWatchlist,
        toggleWatchlist,
        toggleWishlist: toggleWatchlist, // Safe alias
        isFavorite,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
