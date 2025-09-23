import React, { useState } from 'react';
import { Listing, Page, User } from '../types';
import ListingCard from '../components/ListingCard';
import { EmailIcon, PhoneIcon, PlusCircleIcon, TrashIcon } from '../components/Icons';
import { updateCurrentUser } from '../services/authService';
import Spinner from '../components/Spinner';
import { PLACEHOLDER_AVATAR_URL } from '../constants';

interface UserProfilePageProps {
  userId: string;
  listings: Listing[];
  onNavigate: (page: Page) => void;
  currentUser: User | null;
  onUpdateUser: (user: User) => void;
  onDeleteListing: (listingId: string) => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ userId, listings, onNavigate, currentUser, onUpdateUser, onDeleteListing }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ name: '', avatar: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [listingToDelete, setListingToDelete] = useState<Listing | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const userListings = listings.filter(l => l.seller.id === userId);
  const isOwnProfile = currentUser?.id === userId;

  let sellerInfo;
  if (userListings.length > 0) {
    sellerInfo = userListings[0].seller;
  } else if (isOwnProfile) {
    sellerInfo = currentUser;
  }

  const handleEditClick = () => {
    if (sellerInfo) {
      setEditedInfo({ name: sellerInfo.name, avatar: sellerInfo.avatar });
      setIsEditing(true);
      setError('');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    if (!editedInfo.name.trim()) {
      setError("Ime ne može biti prazno.");
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const updatedUser = await updateCurrentUser({ name: editedInfo.name, avatar: editedInfo.avatar });
      onUpdateUser(updatedUser);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Došlo je do greške prilikom čuvanja.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteRequest = (listingId: string) => {
    const listing = userListings.find(l => l.id === listingId);
    if (listing) {
      setListingToDelete(listing);
    }
  };

  const confirmDelete = () => {
    if (listingToDelete) {
      setIsDeleting(true);
      // Simulate network delay for a better UX
      setTimeout(() => {
        onDeleteListing(listingToDelete.id);
        setListingToDelete(null);
        setIsDeleting(false);
      }, 1000);
    }
  };

  if (!sellerInfo) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Korisnik nije pronađen</h1>
        <p className="mt-4 text-gray-600">Nije moguće pronaći informacije o ovom korisniku.</p>
      </div>
    );
  }
  
  const avatarUrl = sellerInfo.avatar || PLACEHOLDER_AVATAR_URL;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* User Info Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-28 self-start">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              {isEditing ? (
                // EDITING VIEW
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Izmeni Profil</h2>
                  <div className="space-y-4 text-left">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ime i Prezime</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={editedInfo.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">URL Avatara</label>
                      <input
                        type="text"
                        name="avatar"
                        id="avatar"
                        value={editedInfo.avatar}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  <div className="mt-6 flex gap-x-2">
                    <button
                      onClick={handleCancelClick}
                      className="w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Otkaži
                    </button>
                    <button
                      onClick={handleSaveClick}
                      disabled={isLoading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                    >
                      {isLoading ? <Spinner size="sm" /> : 'Sačuvaj'}
                    </button>
                  </div>
                </div>
              ) : (
                // DISPLAY VIEW
                <div>
                  <img 
                    src={avatarUrl} 
                    alt={sellerInfo.name} 
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-200 object-cover"
                  />
                  <h1 className="text-2xl font-bold text-gray-800">{sellerInfo.name}</h1>
                  {isOwnProfile && (
                      <button 
                          onClick={handleEditClick}
                          className="mt-4 w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                          Izmeni Profil
                      </button>
                  )}
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 text-left">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">Kontakt Informacije</h3>
                    {sellerInfo.email && (
                      <div className="flex items-center text-gray-700">
                        <EmailIcon className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                        <a href={`mailto:${sellerInfo.email}`} className="hover:text-blue-600 truncate text-sm">{sellerInfo.email}</a>
                      </div>
                    )}
                    {sellerInfo.phone && (
                      <div className="flex items-center text-gray-700">
                        <PhoneIcon className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                        <a href={`tel:${sellerInfo.phone}`} className="hover:text-blue-600 text-sm">{sellerInfo.phone}</a>
                      </div>
                    )}
                    {!sellerInfo.email && !sellerInfo.phone && (
                      <p className="text-sm text-gray-500 text-center">Kontakt informacije nisu dostupne.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* User's Listings */}
          <main className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Aktivni oglasi korisnika {isOwnProfile ? '' : sellerInfo.name.split(' ')[0]}
              </h2>
              {userListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {userListings.map(listing => (
                    <ListingCard 
                      key={listing.id} 
                      listing={listing} 
                      onNavigate={onNavigate} 
                      isOwner={isOwnProfile}
                      onDelete={handleDeleteRequest}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700">Nema aktivnih oglasa</h3>
                  <p className="text-gray-500 mt-2">
                    {isOwnProfile ? "Još uvek niste postavili nijedan oglas." : "Ovaj korisnik trenutno nema aktivnih oglasa."}
                  </p>
                  {isOwnProfile && (
                      <button
                          onClick={() => onNavigate({ name: 'create' })}
                          className="mt-6 flex items-center mx-auto space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                      >
                          <PlusCircleIcon className="h-5 w-5"/>
                          <span>Postavi Svoj Prvi Oglas</span>
                      </button>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      
      {/* Deletion Confirmation Modal */}
      {listingToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-up">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">Obriši oglas</h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Da li ste sigurni da želite da obrišete oglas <span className="font-bold">"{listingToDelete.title}"</span>? Ova akcija se ne može opozvati.
                        </p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={() => setListingToDelete(null)} disabled={isDeleting} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50">
                      Otkaži
                    </button>
                    <button 
                      onClick={confirmDelete} 
                      disabled={isDeleting} 
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed flex items-center gap-x-2 transition-colors"
                    >
                        {isDeleting ? <Spinner size="sm" /> : 'Obriši'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default UserProfilePage;