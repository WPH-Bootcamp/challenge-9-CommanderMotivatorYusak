import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNowPlayingMovies } from '../hooks/useMovies';
import { Button } from './ui/button';

export function HeroCarousel() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useNowPlayingMovies();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out movies to get the top 5 trending entries
  const movies = data?.results?.slice(0, 5) || [];

  // Automatically cycle through hero banner slides every 6 seconds
  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [movies.length]);

  if (isLoading) {
    return <div className="h-[450px] w-full bg-zinc-900 animate-pulse rounded-xl" />;
  }

  if (error || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[450px] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Main Backdrop Imagery Layer */}
          <img
            src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
            alt={currentMovie.title}
            className="h-full w-full object-cover object-top brightness-[0.4]"
          />

          {/* Color Gradient Overlay for Clean Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

          {/* Cinematic Overlay Title Content Box */}
          <div className="absolute bottom-0 left-0 max-w-2xl p-6 md:p-12 space-y-4 text-left">
            <span className="inline-block bg-red-600 text-white text-xs font-black uppercase px-2.5 py-1 rounded">
              Now Playing
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white line-clamp-2">
              {currentMovie.title}
            </h1>
            <p className="text-zinc-300 text-sm md:text-base line-clamp-3 leading-relaxed">
              {currentMovie.overview}
            </p>
            
            <div className="pt-2">
              <Button
                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                className="bg-white hover:bg-zinc-200 text-black font-bold px-6 py-5 rounded-md transition-transform active:scale-95"
              >
                ► View Details
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Slide Indicator Pills */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-6 bg-red-600' : 'w-2 bg-zinc-600 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}