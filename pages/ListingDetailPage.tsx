import React, { useState, useMemo } from 'react';
import { Listing, Page, Category } from '../types';
import { CATEGORIES } from '../constants';
import { PhoneIcon, EmailIcon } from '../components/Icons';
import ListingCard from '../components/ListingCard';

interface ListingDetailPageProps {
  listing: Listing;
  onNavigate: (page: Page) => void;
  listings: Listing[];
}

const ListingDetailPage: React.FC<ListingDetailPageProps> = ({ listing, onNavigate, listings }) => {
  const [mainImage, setMainImage] = useState(listing.images[0]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const category = CATEGORIES.find(c => c.id === listing.category) as Category;

  const formattedPrice = listing.price > 0 
    ? new Intl.NumberFormat('de-DE').format(listing.price) + ` ${listing.currency}` 
    : 'Po dogovoru';
    
  const postedDate = new Date(listing.postedDate).toLocaleDateString('sr-RS', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Molimo popunite sva polja u kontakt formi.');
      return;
    }
    const alertMessage = `Poruka za prodavca "${listing.seller.name}" u vezi oglasa "${listing.title}":\n\n"${contactForm.message}"\n\n(Ovo je simulacija. U pravoj aplikaciji, poruka bi bila poslata.)`;
    alert(alertMessage);
    setContactForm({ name: '', email: '', message: '' });
  };

  const similarListings = useMemo(() => {
    return listings
      .filter(l => l.id !== listing.id && l.category === listing.category)
      .sort((a, b) => {
        if (a.location === listing.location && b.location !== listing.location) return -1;
        if (a.location !== listing.location && b.location === listing.location) return 1;
        return 0;
      })
      .slice(0, 4);
  }, [listings, listing]);


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
          <div className="lg:col-span-1 p-6 bg-gray-50 flex flex-col">
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
                  <p className="font-bold text-gray-800 text-lg">{listing.seller.name}</p>
                  {/* The link for all seller's ads can be implemented later with a proper user profile page */}
                  <a href="#" className="text-sm text-blue-600 hover:underline">Svi oglasi prodavca</a>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {listing.seller.phone && (
                  <div className="flex items-center text-gray-700">
                    <PhoneIcon className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0" />
                    <a href={`tel:${listing.seller.phone}`} className="hover:text-blue-600">{listing.seller.phone}</a>
                  </div>
                )}
                {listing.seller.email && (
                  <div className="flex items-center text-gray-700">
                    <EmailIcon className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0" />
                     <a href={`mailto:${listing.seller.email}`} className="hover:text-blue-600 truncate">{listing.seller.email}</a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Conditional Contact Form */}
            {listing.category !== 'poslovi' && (
              <div className="mt-auto pt-6 border-t flex-grow flex flex-col">
                <h3 className="font-semibold text-lg mb-4">Kontaktirajte Prodavca</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4 flex-grow flex flex-col">
                  <div>
                    <label htmlFor="name" className="sr-only">Vaše ime</label>
                    <input type="text" name="name" id="name" required value={contactForm.name} onChange={handleContactFormChange} placeholder="Vaše ime" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Vaš email</label>
                    <input type="email" name="email" id="email" required value={contactForm.email} onChange={handleContactFormChange} placeholder="Vaš email" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="flex-grow flex">
                    <label htmlFor="message" className="sr-only">Poruka</label>
                    <textarea name="message" id="message" required value={contactForm.message} onChange={handleContactFormChange} rows={4} placeholder="Unesite poruku..." className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg">
                    Pošalji Poruku
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
        
        {/* Description */}
        <div className="p-6 md:p-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Opis</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{listing.description}</p>
        </div>
      </div>

      {/* Similar Listings Section */}
      {similarListings.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Slični Oglasi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarListings.map(similar => (
              <ListingCard key={similar.id} listing={similar} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetailPage;