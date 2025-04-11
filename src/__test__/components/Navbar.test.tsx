import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import '@testing-library/jest-dom';

describe('<Navbar />', () => {
  it('renders the title passed as a prop', () => {
    render(<Navbar title="Movie Search Test" />);
    expect(screen.getByText('Movie Search Test')).toBeInTheDocument();
  });

  it('renders the Clapperboard icon', () => {
    const { container } = render(<Navbar title="Movie Search Test" />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
