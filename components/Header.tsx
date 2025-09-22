
import React from 'react';
import { Page } from '../types';
import { LogoIcon } from './Icons';

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate({ name: 'home' })}
          >
            <LogoIcon className="h-10 w-auto text-blue-600" />
            <span className="ml-3 text-2xl font-bold text-gray-800 tracking-tight">Oglasi<span className="text-blue-600">Srbija</span></span>
          </div>
          <div className="flex items-center space-x-4">
             <nav className="hidden md:flex items-center space-x-6">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate({ name: 'home' }); }} className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Početna</a>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate({ name: 'listings' }); }} className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Svi Oglasi</a>
            </nav>
            <button
              onClick={() => onNavigate({ name: 'create' })}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Postavi Oglas
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
   