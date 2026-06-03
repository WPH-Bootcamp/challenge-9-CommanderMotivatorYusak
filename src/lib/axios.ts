// TODO: Create axios instance with base configuration
// Hint: Use environment variables for API URL and API key
// Reference: https://axios-http.com/docs/instance
import axios from 'axios';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});
  // TODO: Configure baseURL from environment variable
  // TODO: Add default headers (API key, content-type)


// TODO: Add request interceptor if needed
// Hint: You can add API key to every request here

// TODO: Add response interceptor for error handling


