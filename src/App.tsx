import './index.css';

// function App() {
//   // TODO: Setup routing dengan React Router
//   // TODO: Implement layout structure
//   // TODO: Add navigation between pages

//   return (
//     <div className="min-h-screen bg-background">
//       <header className="border-b">
//         <div className="container mx-auto px-4 py-4">
//           <h1 className="text-2xl font-bold">Movie Explorer</h1>
//           {/* TODO: Add navigation menu */}
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <div className="text-center space-y-4">
//           <h2 className="text-4xl font-bold">Challenge 9 - Movie App</h2>
//           <p className="text-muted-foreground">
//             Mulai dengan membaca README.md untuk instruksi lengkap!
//           </p>

//           <div className="mt-8 p-6 border rounded-lg bg-card">
//             <h3 className="text-xl font-semibold mb-2">Langkah Pertama:</h3>
//             <ol className="text-left space-y-2 max-w-2xl mx-auto">
//               <li>1. Copy file .env.example menjadi .env</li>
//               <li>2. Daftar di TheMovieDB dan dapatkan API key</li>
//               <li>3. Isi VITE_TMDB_API_KEY di file .env</li>
//               <li>4. Jalankan npm install untuk menginstall dependencies</li>
//               <li>5. Mulai develop dengan npm run dev</li>
//             </ol>
//           </div>
//         </div>

//         {/* TODO: Replace this with your actual application routes and components */}
//       </main>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites'; // Import the new page

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-black text-white">
          {/* Main Global Layout Navigation Header */}
          <header className="border-b border-zinc-800 bg-zinc-950/80 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-black text-red-600 tracking-wider uppercase">
              Movie Explorer
            </Link>
            <nav className="flex gap-4">
              <Link to="/" className="text-sm font-medium hover:text-red-500 transition-colors">Home</Link>
              <Link to="/favorites" className="text-sm font-medium hover:text-red-500 transition-colors">Watchlist</Link>
            </nav>
          </header>

          <main className="container mx-auto py-6 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<Detail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}