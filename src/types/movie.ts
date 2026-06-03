// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

export interface Movie {
  // TODO: Add movie properties based on TMDB API response
  // Examples: id, title, overview, poster_path, etc.
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCredits {
  cast: CastMember[];
}

export interface VideoResult {
  id: string;
  key: string;
  site: string;
  type: string;
}

export interface MovieVideos {
  results: VideoResult[];
}

export interface MovieDetail extends Movie {
  runtime: number;
  genres: {id: number; name: string}[];
  tagline: string | null;
  credits?: MovieCredits;
  videos?: MovieVideos;
}

// export interface MovieResponse {
//   // TODO: Add pagination properties
//   // Examples: page, results, total_pages, total_results
// }

// TODO: Add more types as needed (Genre, Video, etc.)

