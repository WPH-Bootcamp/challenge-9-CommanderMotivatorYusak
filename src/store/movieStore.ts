import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '../types/movie';
// import { Movie } from '@/types/movie';

// TODO: Define your store state interface
interface MovieStore {
  // TODO: Add state properties
  // Examples: favorites, watchlist, selectedMovie, etc.

  // TODO: Add action methods
  // Examples: addToFavorites, removeFromFavorites, etc.

//   favorites: Movie[];
//   addFavorite: (movie: Movie) => void;
//   removeFavorite: (id: number) => void;
//   isFavorite: (id: number) => boolean;
// }

// export const useMovieStore = create<MovieStoreState>()(
//   persist(
//     (set, get) => ({
//       favorites: [],

//       addFavorite: (movie) => ({
//         favorites: [...state.favorites, movie]
//       })
//     })
//   ),
//   isFavorite: (id) => get().favorites.some((movie) => movie.id === id),
// )
// TODO: Create Zustand store
// Reference: https://zustand.docs.pmnd.rs/getting-started/introduction

// export const useMovieStore = create<MovieStore>((set) => ({
//   // TODO: Initialize state and implement actions
// }));
// export const FavoriteState = create<FavoriteState> ()(
//   persist(
//     (set, get) => ({
//       favorites: [],
//       addFavorite: (movie) => set((state) => ({ favorites: [...state.favorites, movie] })),
//       removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((m) => m.id !== id)})),
//       isFavorite: (id) => get().favorites.some((m) => m.id === id),
//     }),
//     {name 'movies-explorer-favorites'}
//   )
// );

interface MovieStoreState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useMovieStore = create<MovieStoreState>()(
  persist(
    (set, get) => ({
      // Initial empty favorites list array
      favorites: [],


      addFavorite: (movie) => 
        set((state) => ({ 
          favorites: [...state.favorites, movie] 
        })),


      removeFavorite: (id) => 
        set((state) => ({ 
          favorites: state.favorites.filter((movie) => movie.id !== id) 
        })),

      isFavorite: (id) => 
        get().favorites.some((movie) => movie.id === id),
    }),
    {
      name: 'movies-explorer-watchlist', //important..
    }
  )
);