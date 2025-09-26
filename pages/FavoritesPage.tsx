import React from 'react';
import { Page, Listing, User } from '../types';
import ListingCard from '../components/ListingCard';
import { HeartIcon } from '../components/Icons';

interface FavoritesPageProps {
  listings: Listing[];
  onNavigate: (page: Page) => void;
  onToggleFavorite: (listingId: string) => void;
  favorites: string[];
  currentUser: User | null;
  onDeleteListing: (listingId: string) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ listings, onNavigate, onToggleFavorite, favorites, currentUser, onDeleteListing }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Omiljeni Oglasi</h1>
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onNavigate={onNavigate}
              isFavorite={favorites.includes(listing.id)}
              onToggleFavorite={onToggleFavorite}
              isOwner={currentUser?.id === listing.seller.id}
              onDelete={onDeleteListing}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <HeartIcon className="mx-auto h-12 w-12 text-gray-300" strokeWidth={1} />
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">Nemate sačuvanih oglasa</h2>
          <p className="text-gray-500 mt-2">Dodajte oglase u omiljene klikom na srce.</p>
          <button
            onClick={() => onNavigate({ name: 'listings' })}
            className="mt-6 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Pretraži oglase
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;