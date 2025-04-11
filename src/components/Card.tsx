"use client";

import { FC, useState } from 'react';

interface CardProps {
  id: number;
  title: string;
  poster: string;
  overview: string;
  releaseDate: string;
}

const Card: FC<CardProps> = ({ id, title, poster, overview, releaseDate }) => {
  const imageUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
  const initialImage = 'not_found.jpg';
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (movie: { title: string, overview: string, releaseDate: string }) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        key={id}
        className="bg-white h-[600px] border border-gray-200 rounded-lg shadow-sm flex flex-col max-w-sm"
      >
        <a href="#" className="overflow-hidden">
          <img
            className="rounded-t-lg w-full h-[420px] object-cover"
            src={poster ? `${imageUrl}${poster}` : initialImage}
            alt={title}
          />
        </a>
        <div className="p-5 flex flex-col flex-grow">
          <h5 className="text-md text-gray-700 font-bold mb-1 line-clamp-2">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-500 text-sm line-clamp-3">
            {overview}
          </p>
          <div className="mt-auto">
            <button
              onClick={() => openModal({ title, overview, releaseDate })}
              className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
            >
              Detail
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && selectedMovie && (
        <div role="dialog" className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800">{selectedMovie.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Release Date: {selectedMovie.releaseDate}</p>
                <p className="text-gray-700 mt-4 text-sm">{selectedMovie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
