import React, { useState } from 'react';
import { Listing, Page, User, Category } from '../types';
import { CATEGORIES, PLACEHOLDER_LISTING_IMAGE_URL, PLACEHOLDER_AVATAR_URL } from '../constants';
import { MapPinIcon, ChevronLeftIcon, ChevronRightIcon, PhoneIcon, EmailIcon, FlagIcon, UserCircleIcon, CheckIcon } from '../components/Icons';
import ListingCard from '../components/ListingCard';
import { addReport } from '../data/reports';
import { formatPrice, formatCondition, formatAddress } from '../utils/formatting';

interface ListingDetailPageProps {
  listing: Listing;
  onNavigate: (page: Page) => void;
  listings: Listing[];
  currentUser: User | null;
}

const ListingDetailPage: React.FC<ListingDetailPageProps> = ({ listing, onNavigate, listings, currentUser }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const category: Category | undefined = CATEGORIES.find(c => c.id === listing.category);
  const similarListings = listings
    .filter(l => l.category === listing.category && l.id !== listing.id)
    .slice(0, 4);

  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % listing.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + listing.images.length) % listing.images.length);
  };
  
  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason) return;
    await addReport(listing.id, reportReason);
    setReportSubmitted(true);
    setTimeout(() => {
        setShowReportModal(false);
        setReportSubmitted(false);
        setReportReason('');
    }, 2000);
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={listing.images[activeImageIndex] || PLACEHOLDER_LISTING_IMAGE_URL}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                {listing.images.length > 1 && (
                  <>
                    <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors">
                      <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors">
                      <ChevronRightIcon className="h-6 w-6" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded-md">
                    {activeImageIndex + 1} / {listing.images.length}
                </div>
              </div>
            </div>

            {/* Listing Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-x-4">
                      {category && <p className="font-semibold text-blue-600">{category.name}</p>}
                      {listing.condition && (
                         <span className={`text-sm font-bold px-3 py-1 rounded-full ${listing.condition === 'new' || listing.condition === 'new_build' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                           {formatCondition(listing.condition, listing.category)}
                         </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mt-2">{listing.title}</h1>
                    {listing.location && (
                      <div className="flex items-center text-gray-500 mt-2">
                        <MapPinIcon className="h-5 w-5 mr-1" />
                        <span>{formatAddress(listing)}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-3xl font-extrabold text-orange-500 flex-shrink-0 self-start sm:self-auto sm:pt-12">{formatPrice(listing)}</p>
              </div>
              <div className="mt-6 border-t pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Opis</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
              </div>
              {listing.specifics && Object.keys(listing.specifics).length > 0 && (
                 <div className="mt-6 border-t pt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Detalji</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(listing.specifics).map(([key, value]) => (
                            <div key={key}>
                                <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                <p className="font-semibold text-gray-800">{String(value)}</p>
                            </div>
                        ))}
                    </div>
                </div>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-28 self-start">
             {/* Seller Info */}
             <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                 <img 
                    src={listing.seller.avatar || PLACEHOLDER_AVATAR_URL} 
                    alt={listing.seller.name} 
                    className="h-24 w-24 rounded-full mx-auto ring-4 ring-blue-500/30"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-900">{listing.seller.name}</h3>
                <button 
                    onClick={() => onNavigate({ name: 'profile', userId: listing.seller.id })}
                    className="mt-2 text-sm font-semibold text-blue-600 hover:underline"
                >
                    Svi oglasi ovog korisnika
                </button>
                <div className="mt-6 space-y-3">
                    {listing.seller.phone &&
                        <button className="w-full flex items-center justify-center gap-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                            <PhoneIcon className="h-5 w-5" />
                            <span>Prikaži telefon</span>
                        </button>
                    }
                    <button className="w-full flex items-center justify-center gap-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        <EmailIcon className="h-5 w-5" />
                        <span>Pošalji poruku</span>
                    </button>
                </div>
             </div>
             {/* Report Ad */}
             <div className="text-center">
                <button 
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center justify-center gap-x-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors w-full"
                >
                    <FlagIcon className="h-4 w-4" />
                    Prijavi oglas
                </button>
             </div>
          </aside>
        </div>

        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Slični Oglasi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarListings.map(l => <ListingCard key={l.id} listing={l} onNavigate={onNavigate} />)}
            </div>
          </div>
        )}
      </div>

       {/* Report Modal */}
       {showReportModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
                    {reportSubmitted ? (
                        <div className="text-center py-8">
                            <CheckIcon className="mx-auto h-12 w-12 text-green-500 bg-green-100 rounded-full p-2" />
                            <h3 className="text-xl font-bold text-gray-800 mt-4">Hvala na prijavi!</h3>
                            <p className="text-gray-600 mt-2">Vaša prijava je primljena i biće pregledana uskoro.</p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Prijavite oglas</h3>
                            <form onSubmit={handleReportSubmit}>
                                <label htmlFor="reportReason" className="block text-sm font-medium text-gray-700 mb-2">
                                    Molimo opišite problem:
                                </label>
                                <textarea 
                                    id="reportReason"
                                    value={reportReason}
                                    onChange={(e) => setReportReason(e.target.value)}
                                    rows={4}
                                    required
                                    className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors duration-150"
                                    placeholder="Npr. oglas je lažan, cena nije tačna, predmet je prodat..."
                                />
                                <div className="mt-6 flex justify-end gap-x-3">
                                    <button type="button" onClick={() => setShowReportModal(false)} className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                        Otkaži
                                    </button>
                                    <button type="submit" className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-md hover:bg-red-700">
                                        Pošalji prijavu
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
       )}
    </div>
  );
};

export default ListingDetailPage;