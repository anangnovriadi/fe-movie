import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Card from '@/components/Card';
import '@testing-library/jest-dom';

const mockMovie = {
  id: 1,
  title: 'The Matrix',
  poster: '/matrix.jpg',
  overview: 'A computer hacker learns about the true nature of reality.',
  releaseDate: '1999-03-31',
};

describe('<Card />', () => {
  it('renders the movie title and overview', () => {
    render(<Card {...mockMovie} />);

    const titleElements = screen.getAllByText(mockMovie.title);
    expect(titleElements[0]).toBeInTheDocument();

    const overviewElement = screen.getByText(/true nature of reality/i);
    expect(overviewElement).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining(mockMovie.poster));
    expect(image).toHaveAttribute('alt', mockMovie.title);
  });

  it('opens modal with full details on "Detail" click', async () => {
    render(<Card {...mockMovie} />);

    const detailButton = screen.getByRole('button', { name: /detail/i });
    fireEvent.click(detailButton);

    const modal = await screen.findByRole('dialog');
    const title = within(modal).getByText(mockMovie.title);
    const overview = within(modal).getByText(mockMovie.overview);
    const release = await screen.findByText(`Release Date: ${mockMovie.releaseDate}`);

    expect(title).toBeInTheDocument();
    expect(overview).toBeInTheDocument();
    expect(release).toBeInTheDocument();
  });
  
  it('closes modal when "×" is clicked', () => {
    render(<Card {...mockMovie} />);
    
    const detailButton = screen.getByRole('button', { name: /detail/i });
    fireEvent.click(detailButton);
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(screen.queryByText(`Release Date: ${mockMovie.releaseDate}`)).not.toBeInTheDocument();
  });
});
