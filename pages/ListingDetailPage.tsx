
import React, { useState } from 'react';
import { Listing, Page, Category } from '../types';
import { CATEGORIES } from '../constants';

interface ListingDetailPageProps {
  listing: Listing;
  onNavigate: (page: Page) => void;
}

const ListingDetailPage: React.FC<ListingDetailPageProps> = ({ listing, onNavigate }) => {
  const [mainImage, setMainImage] = useState(listing.images[0]);

  const category = CATEGORIES.find(c => c.id === listing.category) as Category;

  const formattedPrice = listing.price > 0 
    ? new Intl.NumberFormat('de-DE').format(listing.price) + ` ${listing.currency}` 
    : 'Po dogovoru';
    
  const postedDate = new Date(listing.postedDate).toLocaleDateString('sr-RS', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Image Gallery */}
          <div className="lg:col-span-2 p-4 sm:p-6">
            <div className="mb-4">
              <img src={mainImage} alt={listing.title} className="w-full h-[500px] object-cover rounded-lg shadow-md" />
            </div>
            <div className="flex space-x-2">
              {listing.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${listing.title} thumbnail ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'} transition-all duration-200`}
                />
              ))}
            </div>
          </div>

          {/* Listing Info */}
          <div className="lg:col-span-1 p-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
            <p className="text-3xl font-extrabold text-orange-500 mb-4">{formattedPrice}</p>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center"><span className="font-semibold w-24">Lokacija:</span> <span>{listing.location}</span></div>
              <div className="flex items-center"><span className="font-semibold w-24">Kategorija:</span> <a href="#" onClick={(e)=>{e.preventDefault(); onNavigate({name: 'listings', filters: {category: category.id}})}} className="text-blue-600 hover:underline">{category.name}</a></div>
              <div className="flex items-center"><span className="font-semibold w-24">Stanje:</span> <span>{listing.condition === 'new' ? 'Novo' : 'Korišćeno'}</span></div>
              <div className="flex items-center"><span className="font-semibold w-24">Postavljeno:</span> <span>{postedDate}</span></div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Prodavac</h3>
              <div className="flex items-center space-x-4">
                <img src={listing.seller.avatar} alt={listing.seller.name} className="w-16 h-16 rounded-full" />
                <div>
                  <p className="font-bold text-gray-800">{listing.seller.name}</p>
                  <a href="#" className="text-sm text-blue-600 hover:underline">Svi oglasi prodavca</a>
                </div>
              </div>
            </div>

            <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg">
              Kontaktiraj Prodavca
            </button>
          </div>
        </div>
        
        {/* Description */}
        <div className="p-6 md:p-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Opis</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{listing.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
   