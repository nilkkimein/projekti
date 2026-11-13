import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import DiscoverPage from './pages/DiscoverPage';
import WatchlistPage from './pages/WatchlistPage';
import StatsPage from './pages/StatsPage';
import { useWatchlist } from './hooks/useWatchlist';

function App() {
  const { watchlist, addShow, removeShow, updateShowStatus, rateShow } = useWatchlist();

  return (
    <HashRouter>
      <div className="min-vh-100 bg-light d-flex flex-column">
        <NavigationBar watchlistCount={watchlist.length} />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<DiscoverPage watchlist={watchlist} onAdd={addShow} />} />
            <Route
              path="/watchlist"
              element={
                <WatchlistPage
                  watchlist={watchlist}
                  onRemove={removeShow}
                  onUpdateStatus={updateShowStatus}
                  onRate={rateShow}
                />
              }
            />
            <Route path="/stats" element={<StatsPage watchlist={watchlist} />} />
          </Routes>
        </main>

        <footer className="bg-white text-center py-3 text-muted border-top mt-auto">
          <small>ShowTrack &copy; 2026 — TV Shows tracking app</small>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;