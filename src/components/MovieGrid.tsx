import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Movie } from '../types/movie';
import { Card } from './ui/card';

interface GridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: GridProps) {
  const navigate = useNavigate();

  return (
    // Ensure "w-full" is included, and change grid columns to scale smoothly
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full p-2"
    >
      {movies.map((movie) => (
        <motion.div
          key={movie.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="cursor-pointer group w-full"
        >
          <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full relative flex flex-col justify-between">
            <div className="relative aspect-[2/3] w-full bg-zinc-950">
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'} 
                alt={movie.title}
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" 
              />
            </div>
            <div className="p-4 bg-zinc-900 flex-1 flex flex-col justify-between gap-2">
              <h3 className="font-bold text-sm text-zinc-100 line-clamp-2 group-hover:text-red-500 transition-colors">
                {movie.title}
              </h3>
              <div className="flex justify-between items-center mt-auto pt-2 border-t border-zinc-800/50">
                <span className="text-xs text-zinc-400">{movie.release_date?.split('-')[0] || 'N/A'}</span>
                <span className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                  ★ {movie.vote_average?.toFixed(1) || '0.0'}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}