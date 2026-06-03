import { axiosInstance } from '@/lib/axios';
import { Movie, MovieDetail } from '../types/movie';
// import { Movie, MovieResponse } from '@/types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started
// export const movieService = {
//   }
  // TODO: Implement getPopularMovies function
  // Endpoint: GET /movie/popular

  // TODO: Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing

  // TODO: Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}

  // TODO: Implement searchMovies function
  // Endpoint: GET /search/movie

  // TODO: Add more endpoints as needed

  interface TMDBResponse<T> {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
  }
  export const getPopularMovies = async (page: number = 1): Promise<any> => {
  // Pulls data directly from /movie/popular endpoint
  const response = await axiosInstance.get('/movie/popular', {
    params: { page },
  });
  return response.data;
};

  export const getNowPlayingMovies = async (): Promise<TMDBResponse<Movie>> => {
    const response = await axiosInstance.get<TMDBResponse<Movie>>('/movie/now_playing');
    return response.data;
  };

  export const searchMovies = async (query: string): Promise<TMDBResponse<Movie>> => {
    const response = await axiosInstance.get<TMDBResponse<Movie>>(/search/movie, {
      params: { query },
    });
    return response.data;
  };

  export const getMovieDetail = async (id string): Promise<MovieDetail> => {
    const response = await axiosInstance.get<MovieDetail>('/movie/${id}', {
      params: {
        append_to_response: 'credits,videos',
      },
    });
    return response.data;
  };

  export const getSimilarMovies = async (id: string): Promise<TMDBResponse<Movie>> => {
    const response = await axiosInstance.get<TMDBResponse<Movie>>('/movie/${id}/similar');
    return response.data;
  };