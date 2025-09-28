import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Page, User, Listing } from '../types';
import { LogoIcon, PlusCircleIcon, MenuIcon, XIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, SearchIcon, MapPinIcon, HeartIcon } from './Icons';
import { PLACEHOLDER_AVATAR_URL, LOCATIONS, CATEGORIES } from '../constants';
import SearchInputWithSuggestions from './SearchInputWithSuggestions';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  currentUser: User | null;
  onLogout: () => void;
  listings: Listing[];
  favorites: string[];
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, currentUser, onLogout, listings, favorites }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);

  const keywordSuggestions = useMemo(() => {
    const categoryNames = CATEGORIES.map(c => c.name);
    const titleKeywords = new Set<string>();
    listings.forEach(listing => {
      listing.title.toLowerCase().split(' ').forEach(word => {
        if (word.length > 3 && isNaN(parseInt(word))) {
          titleKeywords.add(word.replace(/[^a-z0-9]/gi, ''));
        }
      });
    });
    return [...new Set([...categoryNames, ...Array.from(titleKeywords)])];
  }, [listings]);

  const locationSuggestions = LOCATIONS;

  // Close menus on page navigation or click outside
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedSearchTerm = `${keyword} ${location}`.trim();
    if (combinedSearchTerm) {
      onNavigate({ name: 'listings', filters: { searchTerm: combinedSearchTerm } });
      setKeyword('');
      setLocation('');
      setIsMenuOpen(false); // Close mobile menu if open
    }
  };


  const navLinkClasses = (pageName: 'home' | 'listings') => {
    const isActive = currentPage.name === pageName;
    return `
      relative px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300
      ${isActive 
        ? 'bg-gray-100 text-gray-900' 
        : 'text-gray-500 hover:text-gray-900'}
    `;
  };
  
  const NavLinks: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => (
    <nav className={mobile 
        ? 'flex flex-col items-start space-y-2' 
        : 'hidden md:flex items-center space-x-2 bg-gray-100/50 p-1 rounded-full'
    }>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate({ name: 'home' }); }}
        className={mobile ? "text-2xl text-gray-800 font-semibold" : navLinkClasses('home')}
      >
        Početna
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate({ name: 'listings' }); }}
        className={mobile ? "text-2xl text-gray-800 font-semibold" : navLinkClasses('listings')}
      >
        Svi Oglasi
      </a>
    </nav>
  );

  return (
    <>
      <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Group: Logo & Navigation */}
            <div className="flex-shrink-0 flex items-center space-x-8">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => onNavigate({ name: 'home' })}
                aria-label="Početna strana"
              >
                <LogoIcon className="h-8 w-auto text-blue-600" />
                <span className="hidden sm:block ml-3 text-2xl font-bold text-gray-800 tracking-tight">Oglasi<span className="text-blue-600">Srbija</span></span>
              </div>
              <NavLinks />
            </div>

            {/* Center Group: Search Bar */}
            <div className="flex-1 flex justify-center items-center px-4 sm:px-6 lg:px-8">
                {currentPage.name !== 'home' && (
                  <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-full max-w-2xl">
                    <div className="flex items-center w-full h-14 bg-gray-50 rounded-full border border-gray-200/80 shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent focus-within:bg-white">
                        <div className="flex-1 h-full">
                           <SearchInputWithSuggestions
                                value={keyword}
                                onChange={setKeyword}
                                placeholder="Šta tražite?"
                                suggestions={keywordSuggestions}
                                icon={<SearchIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />}
                                ariaLabel="Pretraga po ključnoj reči"
                                inputClassName="w-full h-full p-0 pl-12 pr-4 border-none text-gray-800 focus:ring-0 text-base bg-transparent"
                                iconContainerClassName="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none"
                            />
                       </div>
                        <div className="border-l border-gray-200 h-7 self-center"></div>
                        <div className="flex-1 h-full">
                            <SearchInputWithSuggestions
                                value={location}
                                onChange={setLocation}
                                placeholder="Lokacija"
                                suggestions={locationSuggestions}
                                icon={<MapPinIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />}
                                ariaLabel="Pretraga po lokaciji"
                                inputClassName="w-full h-full p-0 pl-12 pr-4 border-none text-gray-800 focus:ring-0 text-base bg-transparent"
                                iconContainerClassName="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none"
                            />
                        </div>
                         <div className="pr-2 flex-shrink-0">
                            <button type="submit" aria-label="Pretraži" className="h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-200">
                                <SearchIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                  </form>
                )}
            </div>

            {/* Right Group: Actions */}
            <div className="flex-shrink-0 flex items-center space-x-4">
              <button
                onClick={() => onNavigate({ name: 'create' })}
                className="hidden sm:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full shadow-sm transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon className="h-5 w-5"/>
                <span>Postavi Oglas</span>
              </button>
              
              {!currentUser && (
                <button
                    onClick={() => onNavigate({ name: 'favorites' })}
                    className="relative hidden md:block p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label={`Omiljeni oglasi (${favorites.length})`}
                >
                    <HeartIcon className="h-6 w-6"/>
                    {favorites.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold ring-2 ring-white">
                            {favorites.length}
                        </span>
                    )}
                </button>
              )}

              {currentUser ? (
                <div className="relative" ref={userMenuRef}>
                  <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="flex items-center space-x-2 focus:outline-none">
                    <img src={currentUser.avatar || PLACEHOLDER_AVATAR_URL} alt={currentUser.name} className="h-10 w-10 rounded-full border-2 border-transparent hover:border-blue-500 transition-colors" />
                  </button>
                  <div
                    className={`absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 origin-top-right transition-all duration-200 ease-out z-50
                      ${isUserMenuOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}`
                    }
                  >
                    <div className="p-4 border-b border-gray-200">
                        <p className="font-semibold text-gray-800 truncate">{currentUser.name}</p>
                        <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                    <div className="py-2">
                      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate({ name: 'profile', userId: currentUser.id }); }} className="flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <UserCircleIcon className="h-5 w-5 text-gray-400" /> Moji Oglasi
                      </a>
                      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate({ name: 'favorites' }); }} className="flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <HeartIcon className="h-5 w-5 text-gray-400" /> Moji Favoriti
                      </a>
                      <a href="#" className="flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <Cog6ToothIcon className="h-5 w-5 text-gray-400" /> Podešavanja
                      </a>
                    </div>
                     <div className="py-2 border-t border-gray-200">
                      <button onClick={onLogout} className="w-full text-left flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400" /> Odjavi se
                      </button>
                     </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => onNavigate({ name: 'login' })}
                  className="hidden md:block font-semibold text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Prijavi se
                </button>
              )}

              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(true)} aria-label="Otvori meni">
                  <MenuIcon className="h-6 w-6 text-gray-700"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[100] transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div 
            onClick={() => setIsMenuOpen(false)}
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Menu Panel */}
        <div 
            className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`
        }>
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
               <span className="text-xl font-bold text-gray-800">Meni</span>
              <button onClick={() => setIsMenuOpen(false)} aria-label="Zatvori meni">
                  <XIcon className="h-6 w-6 text-gray-700"/>
              </button>
          </div>
          <div className="p-6 flex flex-col h-full">
              {currentUser ? (
                  <div className="pb-6 mb-6 border-b border-gray-200">
                     <div className="flex items-center space-x-3" onClick={() => onNavigate({ name: 'profile', userId: currentUser.id })}>
                      <img src={currentUser.avatar || PLACEHOLDER_AVATAR_URL} alt={currentUser.name} className="h-12 w-12 rounded-full" />
                      <div>
                        <p className="font-semibold text-gray-800">{currentUser.name}</p>
                        <p className="text-sm text-gray-500">Pogledaj profil</p>
                      </div>
                    </div>
                  </div>
                ) : null}

              <form onSubmit={handleSearchSubmit} className="mb-8 space-y-4">
                <div className="bg-gray-100 rounded-full">
                  <SearchInputWithSuggestions
                    value={keyword}
                    onChange={setKeyword}
                    placeholder="Šta tražite?"
                    suggestions={keywordSuggestions}
                    icon={<SearchIcon className="h-5 w-5 text-gray-500" />}
                    ariaLabel="Pretraga po ključnoj reči"
                    inputClassName="w-full bg-transparent border-transparent rounded-full py-3 pl-12 pr-4 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    iconContainerClassName="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                  />
                </div>
                <div className="bg-gray-100 rounded-full">
                  <SearchInputWithSuggestions
                    value={location}
                    onChange={setLocation}
                    placeholder="Lokacija"
                    suggestions={locationSuggestions}
                    icon={<MapPinIcon className="h-5 w-5 text-gray-500" />}
                    ariaLabel="Pretraga po lokaciji"
                    inputClassName="w-full bg-transparent border-transparent rounded-full py-3 pl-12 pr-4 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    iconContainerClassName="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                  />
                </div>
              </form>

              <div className="space-y-6 mb-8">
                  <NavLinks mobile={true} />
                   <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onNavigate({ name: 'favorites' }); }}
                    className="text-2xl text-gray-800 font-semibold"
                  >
                    Omiljeni oglasi {favorites.length > 0 && `(${favorites.length})`}
                  </a>
              </div>

              <div className="mt-auto space-y-4">
                  <button
                    onClick={() => onNavigate({ name: 'create' })}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 text-md"
                  >
                    <PlusCircleIcon className="h-5 w-5"/>
                    <span>Postavi Oglas</span>
                  </button>
                 {currentUser ? (
                    <button onClick={onLogout} className="w-full text-center py-3 text-red-600 font-semibold">
                      Odjavi se
                    </button>
                  ) : (
                     <button onClick={() => onNavigate({ name: 'login' })} className="w-full text-center py-3 text-gray-800 font-semibold">
                      Prijavi se
                    </button>
                  )}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;