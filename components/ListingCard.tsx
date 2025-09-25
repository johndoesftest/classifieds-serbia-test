

import React from 'react';
import { Listing, Page } from '../types';
import { TrashIcon } from './Icons';
import { PLACEHOLDER_LISTING_IMAGE_URL } from '../constants';
import { formatPrice, formatCondition } from '../utils/formatting';


interface ListingCardProps {
  listing: Listing;
  onNavigate: (page: Page) => void;
  isOwner?: boolean;
  onDelete?: (listingId: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onNavigate, isOwner = false, onDelete }) => {

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card's onClick from firing
    if (onDelete) {
      onDelete(listing.id);
    }
  };

  const imageUrl = listing.images && listing.images.length > 0 ? listing.images[0] : PLACEHOLDER_LISTING_IMAGE_URL;

  const getConditionLabel = () => {
    if (listing.condition === 'used') {
      if (listing.category === 'roba-i-proizvodi') return 'Korišćeno';
      if (listing.category === 'nekretnine') return 'Starogradnja';
      return 'Polovno';
    }
    return formatCondition(listing.condition, listing.category);
  };
  const conditionLabel = getConditionLabel();


  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col relative"
      onClick={() => onNavigate({ name: 'detail', id: listing.id })}
    >
      {isOwner && onDelete && (
        <button
          onClick={handleDeleteClick}
          className="absolute top-2 right-2 z-10 p-1.5 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          aria-label="Obriši oglas"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      )}
      <div className="relative h-48">
        <img src={imageUrl} alt={listing.title} className="w-full h-full object-cover" />
        {listing.location && <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">{listing.location}</span>}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{listing.title}</h3>
        <p className="text-sm text-gray-500 flex-grow mb-4">{listing.description.substring(0, 60)}...</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-xl font-bold text-orange-500">{formatPrice(listing, true)}</p>
          {conditionLabel && (
             <span className={`text-xs font-bold px-2 py-1 rounded-full ${listing.condition === 'new' || listing.condition === 'new_build' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {conditionLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;