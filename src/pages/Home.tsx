import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePopularMovies } from '../hooks/useMovies';
import { searchMovies } from '../services/movieService';
import { MovieGrid } from '../components/MovieGrid';
import { HeroCarousel } from '../components/HeroCarousel';
import { MovieSkeleton } from '../components/MovieSkeleton';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Movie } from '../types/movie';

export default function Home() {
  const [query, setQuery] = useState('');
  const [searchParam, setSearchParam] = useState('');
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [accumulatedMovies, setAccumulatedMovies] = useState<Movie[]>([]);

  // 1. Fetch current page data
  const { data: popularData, isLoading: loadingPopular, isFetching: fetchingMore } = usePopularMovies(page);

  // 2. Accumulate movies when a new page arrives
  useEffect(() => {
    if (popularData?.results) {
      setAccumulatedMovies((prev) => {
        // Prevent duplicate entries if React Query refetches
        const existingIds = new Set(prev.map((m) => m.id));
        const uniqueNewMovies = popularData.results.filter((m) => !existingIds.has(m.id));
        return [...prev, ...uniqueNewMovies];
      });
    }
  }, [popularData]);

  // 3. Search query logic
  const { data: searchData, isLoading: loadingSearch } = useQuery({
    queryKey: ['movies', 'search', searchParam],
    queryFn: () => searchMovies(searchParam),
    enabled: searchParam.length > 0,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParam(query);
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParam('');
    setPage(1);
    setAccumulatedMovies([]); // Reset accumulation on search clear
  };

  const isSearching = searchParam.length > 0;
  const moviesToShow = isSearching ? searchData?.results : accumulatedMovies;

  return (
    <div className="space-y-10 p-2">
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
        <Input 
          placeholder="Search for movie titles..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-zinc-900 border-zinc-800 text-white"
        />
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-semibold">
          Search
        </Button>
        {isSearching && (
          <Button type="button" variant="outline" onClick={clearSearch} className="border-zinc-700">
            Reset
          </Button>
        )}
      </form>

      {!isSearching && <HeroCarousel />}

      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-zinc-300 border-l-4 border-red-600 pl-3">
          {isSearching ? `Search results for: ${searchParam}` : 'Trending Popular Selections'}
        </h2>
        
        {loadingPopular && page === 1 ? (
          <MovieSkeleton />
        ) : (
          moviesToShow && <MovieGrid movies={moviesToShow} />
        )}

        {/* Loading More Indicator Skeletons */}
        {fetchingMore && page > 1 && <MovieSkeleton />}

        {/* Dynamic Load More Trigger Button Container */}
        {!isSearching && accumulatedMovies.length > 0 && !fetchingMore && (
          <div className="flex justify-center pt-4">
            <Button 
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-8 py-6 font-bold rounded-md"
            >
              Load More Movies
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}