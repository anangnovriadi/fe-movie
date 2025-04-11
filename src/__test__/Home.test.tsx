import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/pages';
import { fetchMovies } from '@/utils/store/movie';

jest.mock('@/utils/api/movie', () => ({
  fetchMovies: jest.fn(),
}));

const mockedMovies = [
  {
    id: 1,
    title: 'Inception',
    poster_path: '/poster.jpg',
    overview: 'Dream within a dream.',
    release_date: '2010-07-16',
  },
];

describe('Home Page', () => {
  beforeEach(() => {
    (fetchMovies as jest.Mock).mockResolvedValue(mockedMovies);
  });

  it('renders input and button', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/search something/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('searches and displays results', async () => {
    render(<Home />);
    
    const input = screen.getByPlaceholderText(/search something/i);
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.click(button);

    expect(screen.getByRole('button')).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
    });
  });
});
