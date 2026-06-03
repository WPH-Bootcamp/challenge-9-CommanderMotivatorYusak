import { useQuery } from '@tanstack/react-query';
import { getPopularMovies, getNowplayingMovies, getMovieDetail, getSimilarMovies } from '../services/movieService';
// import { movieService } from '@/services/movieService';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// // Example: Hook to fetch popular movies
// export function usePopularMovies ()  {
//   // TODO: Implement useQuery hook
//   // Hint: Use movieService.getPopularMovies as queryFn
//   return useQuery({
//     queryKey: ['movies', 'popular'],
//     queryFn: () => getPopularMovies,
//       // TODO: Call your movie service function
//       // throw new Error('Not implemented');
//   });
// }
export function usePopularMovies(page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => getPopularMovies(page),
    placeholderData: (previousData) => previousData,
  })
}

export function useNowPlayingMovies() {
  return useQuery({
    queryKey: ['movies', 'now-playing'],
    queryFn: getNowplayingMovies,
  });
}

export function useMovieDetail(id: string) {
  return useQuery({
    queryKey: ['movies', id],
    queryFn: () => getMovieDetail(id),
    enabled: !!id,
  });
}

export function useSimilarMovies(id: string) {
  return useQuery({
    queryKey: ['movie', 'similar', id],
    queryFn: () => getSimilarMovies(id),
    enabled: !!id,
  });
}

// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies
