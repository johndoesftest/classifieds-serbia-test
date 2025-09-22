
import React from 'react';
import { Listing, Page } from '../types';

interface ListingCardProps {
  listing: Listing;
  onNavigate: (page: Page) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onNavigate }) => {
  const formattedPrice = listing.price > 0 
    ? new Intl.NumberFormat('de-DE').format(listing.price) + ` ${listing.currency}` 
    : 'Po dogovoru';

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onNavigate({ name: 'detail', id: listing.id })}
    >
      <div className="relative h-48">
        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">{listing.location}</span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{listing.title}</h3>
        <p className="text-sm text-gray-500 flex-grow mb-4">{listing.description.substring(0, 60)}...</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-xl font-bold text-orange-500">{formattedPrice}</p>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${listing.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {listing.condition === 'new' ? 'Novo' : 'Korišćeno'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
   