import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovies';
import { useMovieStore } from '../store/movieStore';
import { Button } from '../components/ui/button';
import { MovieDetail} from '../types/movie'; //importants..

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Zustand State hooks
  const { addFavorite, removeFavorite, isFavorite } = useMovieStore();
  
  // React Query data fetch
  const { data: movie, isLoading, error } = useMovieDetail(id || '');

  if (isLoading) {
    return <div className="text-center py-20 text-zinc-400 animate-pulse">Loading movie profile details...</div>;
  }

  if (error || !movie) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-red-500">Failed to fetch movie info from TMDB.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const favoriteActive = isFavorite(movie.id);

  const handleFavoriteToggle = () => {
    if (favoriteActive) {
      removeFavorite(movie.id);
    } else {
      addFavorite({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      });
    }
  };

  // Find trailer video clip
  const trailerVideo = movie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Back Navigation Button */}
      <Button variant="ghost" onClick={() => navigate(-1)} className="text-zinc-400 hover:text-white">
        ← Go Back
      </Button>

      {/* Hero Header Section Layout */}
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3 max-w-sm shrink-0">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="rounded-lg border border-zinc-800 shadow-2xl w-full aspect-[2/3] object-cover"
          />
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">{movie.title}</h1>
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <span>{movie.release_date}</span>
              <span>•</span>
              <span>{movie.runtime} mins</span>
              <span>•</span>
              <span className="text-amber-500 font-bold">★ {movie.vote_average.toFixed(1)}</span>
            </div>
          </div>

          {/* Zustand Trigger Button Control */}
          <Button 
            variant={favoriteActive ? "destructive" : "default"} 
            onClick={handleFavoriteToggle}
            className="w-full sm:w-auto px-6"
          >
            {favoriteActive ? "❤️ Remove from Watchlist" : "🤍 Add to Watchlist"}
          </Button>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-200">Overview</h2>
            <p className="text-zinc-400 leading-relaxed text-justify">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Casting Section Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold border-b border-zinc-800 pb-2">Top Billed Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {movie.credits?.cast?.slice(0, 6).map((actor) => (
            <div key={actor.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-center text-xs">
              <img 
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/image.jpg'} 
                alt={actor.name} 
                className="w-20 h-20 rounded-full mx-auto object-cover mb-2 border border-zinc-700"
              />
              <p className="font-bold text-zinc-200 truncate">{actor.name}</p>
              <p className="text-zinc-500 truncate">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Trailer Section Layout */}
      {trailerVideo && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-zinc-800 pb-2">Official Video Trailer</h2>
          <div className="aspect-video w-full max-w-3xl bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerVideo.key}`}
              title="Movie Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}