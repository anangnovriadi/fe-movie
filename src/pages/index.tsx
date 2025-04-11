"use client";

import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import { fetchMovies, MovieResult } from '@/utils/store/movie';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [inputQuery, setInputQuery] = useState<string>('');
  const [results, setResults] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    setQuery(inputQuery);

    try {
      const data: MovieResult[] = await fetchMovies(inputQuery);
      setResults(data);
    } catch (error) {
      console.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar title="Movie Search" />
      <div className="mt-8 flex rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto shadow-sm">
        <input
          type="text"
          placeholder="Search Something..."
          className="w-full outline-none bg-white text-gray-600 text-md px-4 py-3"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center justify-center bg-[#007bff] px-5 cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          <Search width={20} />
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <ClipLoader color="#007bff" loading={loading} size={40} />
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <div className="mt-10 text-left text-gray-500 px-8 text-sm">
            Displaying 1 - {results.length} items out of a total of {results.length} for "{query}"
          </div>
          <div className="mt-3 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((movie: any) => (
              <Card
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                overview={movie.overview} 
                releaseDate={movie.release_date}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
