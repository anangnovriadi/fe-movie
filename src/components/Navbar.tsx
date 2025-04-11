import { FC } from 'react';
import { Clapperboard } from 'lucide-react';

interface NavbarProps {
  title?: string;
}

const Navbar: FC<NavbarProps> = ({ title }) => {
  return (
    <div className="sticky top-0 z-50 shadow-sm">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center gap-2 mx-auto p-4">
          <Clapperboard />
          <p className="font-bold text-xl text-center">{title}</p>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
