import React from 'react';
import { LogoIcon, FacebookIcon, TwitterIcon, InstagramIcon } from './Icons';
import { Page } from '../types';
import { CATEGORIES } from '../constants';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
             <div className="flex items-center">
                <LogoIcon className="h-8 w-auto text-blue-400" />
                <span className="ml-2 text-xl font-bold">Oglasi<span className="text-blue-400">Srbija</span></span>
            </div>
            <p className="text-gray-400">Vaše centralno mesto za kupovinu i prodaju u Srbiji. Povezujemo zajednicu, jednostavno i efikasno.</p>
            <div className="flex space-x-4 pt-2">
                 <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook"><FacebookIcon className="h-6 w-6" /></a>
                 <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter"><TwitterIcon className="h-6 w-6" /></a>
                 <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram"><InstagramIcon className="h-6 w-6" /></a>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wider">Kategorije</h3>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.map(cat => (
                 <li key={cat.id}>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); onNavigate({ name: 'listings', filters: { category: cat.id } }); }} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {cat.name}
                    </a>
                 </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-white tracking-wider">Korisni Linkovi</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate({ name: 'about' }); }} className="text-gray-400 hover:text-white transition-colors">O Nama</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kontakt</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pomoć i podrška</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Uslovi Korišćenja</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Politika Privatnosti</a></li>
            </ul>
          </div>
          
          {/* Newsletter Section */}
          <div>
             <h3 className="text-lg font-semibold text-white tracking-wider">Prijavite se na Newsletter</h3>
             <p className="mt-4 text-gray-400">Primajte najnovije ponude i vesti direktno u vaš inboks.</p>
             <form className="mt-4 flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Vaša email adresa" 
                  aria-label="Email for newsletter"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
                >
                  Prijavi se
                </button>
             </form>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-700 pt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} OglasiSrbija. Sva prava zadržana.
        </div>
      </div>
    </footer>
  );
};

export default Footer;