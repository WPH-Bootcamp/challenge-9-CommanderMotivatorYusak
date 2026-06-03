import { useMovieStore } from '../store/movieStore';
import { MovieGrid } from '../components/MovieGrid';

export default function Favorites() {
  const { favorites } = useMovieStore();

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100">My Watchlist</h2>
      {favorites.length === 0 ? (
        <p className="text-zinc-500 py-10 text-center">Your watchlist is empty.</p>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
}