import React from 'react';
import { Listing, Page } from '../types';
import { PLACEHOLDER_LISTING_IMAGE_URL } from '../constants';
import { formatPrice } from '../utils/formatting';

interface MapPopupCardProps {
  listing: Listing;
  onNavigate: (page: Page) => void;
}

const MapPopupCard: React.FC<MapPopupCardProps> = ({ listing, onNavigate }) => {
  const imageUrl = listing.images?.[0] || PLACEHOLDER_LISTING_IMAGE_URL;

  return (
    <div className="w-64">
      <img src={imageUrl} alt={listing.title} className="w-full h-32 object-cover" />
      <div className="p-3">
        <h3 className="text-sm font-bold text-gray-800 truncate">{listing.title}</h3>
        <p className="text-lg font-semibold text-orange-500 mt-1">{formatPrice(listing, true)}</p>
        <button
          onClick={() => onNavigate({ name: 'detail', id: listing.id })}
          className="mt-2 w-full text-center bg-blue-600 text-white text-xs font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Pogledaj detalje
        </button>
      </div>
    </div>
  );
};

export default MapPopupCard;
