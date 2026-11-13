import { useState, useEffect } from 'react';

const STORAGE_KEY = 'showtrack_watchlist';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Virhe lukiessa watchlistia localStorage-muistista:', err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (err) {
      console.error('Virhe tallennettaessa watchlistia:', err);
    }
  }, [watchlist]);

  const addShow = (show) => {
    setWatchlist((prev) => {
      if (prev.some((item) => item.id === show.id)) return prev;
      return [
        ...prev,
        {
          id: show.id,
          name: show.name,
          image: show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image',
          genres: show.genres || [],
          status: 'Plan to Watch',
          rating: 0,
          addedAt: new Date().toISOString(),
        },
      ];
    });
  };

  const removeShow = (id) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  const updateShowStatus = (id, status) => {
    setWatchlist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const rateShow = (id, rating) => {
    setWatchlist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rating: Number(rating) } : item))
    );
  };

  return {
    watchlist,
    addShow,
    removeShow,
    updateShowStatus,
    rateShow,
  };
}