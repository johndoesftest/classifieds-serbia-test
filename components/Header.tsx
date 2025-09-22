import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { LogoIcon, PlusCircleIcon, MenuIcon, XIcon } from './Icons';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPage]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinkClasses = (pageName: 'home' | 'listings') => {
    const isActive = currentPage.name === pageName;
    return `
      relative font-medium text-gray-600 transition-colors duration-200 group
      ${isActive ? 'text-blue-600' : 'hover:text-blue-600'}
    `;
  };

  const navLinkUnderline = `
    absolute bottom-[-4px] left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out
    ${currentPage.name === 'home' || currentPage.name === 'listings' ? 'group-focus:scale-x-100' : ''}
  `;
  
  const NavLinks: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => (
    <nav className={mobile ? 'flex flex-col items-center space-y-8' : 'hidden md:flex items-center space-x-8'}>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate({ name: 'home' }); }}
        className={mobile ? "text-2xl text-gray-800" : navLinkClasses('home')}
      >
        Početna
        {!mobile && <span className={`${navLinkUnderline} ${currentPage.name === 'home' ? 'scale-x-100' : ''}`}></span>}
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate({ name: 'listings' }); }}
        className={mobile ? "text-2xl text-gray-800" : navLinkClasses('listings')}
      >
        Svi Oglasi
        {!mobile && <span className={`${navLinkUnderline} ${currentPage.name === 'listings' ? 'scale-x-100' : ''}`}></span>}
      </a>
    </nav>
  );

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => onNavigate({ name: 'home' })}
              aria-label="Početna strana"
            >
              <LogoIcon className="h-8 w-auto text-blue-600" />
              <span className="ml-3 text-2xl font-bold text-gray-800 tracking-tight">Oglasi<span className="text-blue-600">Srbija</span></span>
            </div>
            <div className="flex items-center space-x-4">
              <NavLinks />
              <button
                onClick={() => onNavigate({ name: 'create' })}
                className="hidden sm:flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon className="h-5 w-5"/>
                <span>Postavi Oglas</span>
              </button>
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Otvori meni">
                  <MenuIcon className="h-6 w-6 text-gray-700"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[100] transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
          <div className="flex justify-end p-6">
              <button onClick={() => setIsMenuOpen(false)} aria-label="Zatvori meni">
                  <XIcon className="h-7 w-7 text-gray-700"/>
              </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full -mt-16 space-y-10">
              <NavLinks mobile={true} />
              <button
                onClick={() => onNavigate({ name: 'create' })}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 text-lg"
              >
                <PlusCircleIcon className="h-6 w-6"/>
                <span>Postavi Oglas</span>
              </button>
          </div>
      </div>
    </>
  );
};

export default Header;