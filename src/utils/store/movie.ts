import axios from 'axios';

export interface MovieResult {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export interface FetchMoviesResponse {
  results: MovieResult[];
}

export const fetchMovies = async (query: string): Promise<MovieResult[]> => {
  try {
    const response = await axios.get<FetchMoviesResponse>(`${process.env.NEXT_PUBLIC_API_URL}/3/search/movie`, {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        Accept: 'application/json',
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
