
import React from 'react';
import { LogoIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
             <div className="flex items-center">
                <LogoIcon className="h-8 w-auto text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">Oglasi<span className="text-blue-600">Srbija</span></span>
            </div>
            <p className="text-gray-500">Vaše mesto za kupovinu i prodaju u Srbiji.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Brzi Linkovi</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">O Nama</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Kontakt</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Uslovi Korišćenja</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Politika Privatnosti</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Pratite Nas</h3>
             <div className="mt-4 flex space-x-4">
                 {/* Placeholder for social icons */}
                 <a href="#" className="text-gray-500 hover:text-blue-600">F</a>
                 <a href="#" className="text-gray-500 hover:text-blue-600">T</a>
                 <a href="#" className="text-gray-500 hover:text-blue-600">I</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-gray-500">
          &copy; {new Date().getFullYear()} OglasiSrbija. Sva prava zadržana.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
   