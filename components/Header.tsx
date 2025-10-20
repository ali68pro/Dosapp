import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700 sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        {showBackButton && (
          <button onClick={() => navigate(-1)} className="text-white hover:text-indigo-400 p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold text-white">{title}</h1>
      </div>
      <button
        onClick={logout}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;