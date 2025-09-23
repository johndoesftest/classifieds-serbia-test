import React, { useState, useEffect, useMemo } from 'react';
import { User, Listing, Page } from '../types';
import { findUserById } from '../data/users';
import { updateCurrentUser } from '../services/authService';
import ListingCard from '../components/ListingCard';
import Spinner from '../components/Spinner';
import { PLACEHOLDER_AVATAR_URL } from '../constants';
import { EmailIcon, PhoneIcon, PencilIcon, CheckIcon, XIcon, UserCircleIcon, Building2Icon, SparklesIcon } from '../components/Icons';

interface UserProfilePageProps {
  userId: string;
  currentUser: User | null;
  listings: Listing[];
  onNavigate: (page: Page) => void;
  onUpdateUser: (user: User) => void;
  onDeleteListing: (listingId: string) => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ userId, currentUser, listings, onNavigate, onUpdateUser, onDeleteListing }) => {
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [isConverting, setIsConverting] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');


  const isOwnProfile = useMemo(() => currentUser?.id === userId, [currentUser, userId]);

  useEffect(() => {
    setIsLoading(true);
    const user = findUserById(userId);
    if (user) {
      setProfileUser(user);
      setEditName(user.name);
      setEditPhone(user.phone || '');
      const filteredListings = listings.filter(l => l.seller.id === userId)
        .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
      setUserListings(filteredListings);
    }
    setIsLoading(false);
  }, [userId, listings]);
  
  const handleEditToggle = () => {
      if (isEditing) {
          if (profileUser) {
              setEditName(profileUser.name);
              setEditPhone(profileUser.phone || '');
          }
      }
      setIsEditing(!isEditing);
  };
  
  const handleProfileSave = async () => {
      if (!profileUser) return;
      setIsSaving(true);
      try {
          const updatedUser = await updateCurrentUser({ name: editName, phone: editPhone });
          setProfileUser(updatedUser);
          onUpdateUser(updatedUser); // Update app-level state
          setIsEditing(false);
      } catch (error) {
          console.error("Failed to update profile", error);
          alert("Greška prilikom ažuriranja profila.");
      } finally {
          setIsSaving(false);
      }
  };
  
  const handleConvertToBusiness = async () => {
      if (!businessName || !businessDescription) {
          alert("Molimo popunite sva polja.");
          return;
      }
      setIsSaving(true);
      try {
          const updatedUser = await updateCurrentUser({
              accountType: 'business',
              businessName,
              businessDescription,
          });
          setProfileUser(updatedUser);
          onUpdateUser(updatedUser);
          setIsConverting(false);
      } catch (error) {
           console.error("Failed to convert to business account", error);
           alert("Greška prilikom konverzije naloga.");
      } finally {
          setIsSaving(false);
      }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center py-20"><Spinner size="lg" /></div>;
  }

  if (!profileUser) {
    return <div className="text-center py-20">Korisnik nije pronađen.</div>;
  }

  const isBusinessProfile = profileUser.accountType === 'business';

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {isBusinessProfile ? (
            // Business Profile View
            <div>
                 <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative">
                     <img src={`https://picsum.photos/seed/${profileUser.id}/1200/400`} alt="Business Banner" className="w-full h-full object-cover opacity-30"/>
                 </div>
                 <div className="px-8 pb-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start -mt-16 sm:-mt-20">
                         <img 
                            src={profileUser.avatar || PLACEHOLDER_AVATAR_URL} 
                            alt={profileUser.businessName} 
                            className="h-32 w-32 rounded-full ring-4 ring-white object-cover flex-shrink-0 bg-white border-4 border-white"
                         />
                         <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-grow pt-10">
                            <h1 className="text-3xl font-bold text-gray-900">{profileUser.businessName}</h1>
                            <p className="text-sm font-medium text-gray-500">Prodavac: {profileUser.name}</p>
                            <p className="mt-2 text-gray-600 max-w-2xl">{profileUser.businessDescription}</p>
                         </div>
                         {isOwnProfile && (
                              <div className="mt-4 sm:mt-0 sm:pt-10">
                                 <button onClick={() => alert('Feature coming soon!')} className="flex items-center gap-x-1.5 px-3 py-1.5 text-sm font-semibold text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
                                   <PencilIcon className="h-4 w-4"/> Izmeni Stranicu
                                 </button>
                             </div>
                         )}
                    </div>
                     <div className="mt-6 border-t border-gray-200 pt-6 flex flex-wrap gap-x-8 gap-y-4">
                        <div className="flex items-center gap-x-2 text-gray-700">
                            <EmailIcon className="h-5 w-5 text-gray-400"/>
                            <span>{profileUser.email}</span>
                        </div>
                        {profileUser.phone && (
                        <div className="flex items-center gap-x-2 text-gray-700">
                            <PhoneIcon className="h-5 w-5 text-gray-400"/>
                            <span>{profileUser.phone}</span>
                        </div>
                        )}
                    </div>
                 </div>
            </div>
          ) : (
            // Private Profile View
            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-8">
                <img 
                  src={profileUser.avatar || PLACEHOLDER_AVATAR_URL} 
                  alt={profileUser.name} 
                  className="h-32 w-32 rounded-full ring-4 ring-blue-500/50 object-cover flex-shrink-0"
                />
                <div className="mt-4 sm:mt-0 text-center sm:text-left flex-grow">
                   {isEditing ? (
                       <div className="space-y-3">
                            <input 
                                type="text" 
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="text-3xl font-bold text-gray-900 bg-gray-100 border-gray-300 rounded-md w-full"
                            />
                             <input 
                                type="text" 
                                value={editPhone}
                                onChange={(e) => setEditPhone(e.target.value)}
                                placeholder="Broj telefona"
                                className="text-lg text-gray-700 bg-gray-100 border-gray-300 rounded-md w-full"
                            />
                       </div>
                   ) : (
                    <>
                        <h1 className="text-3xl font-bold text-gray-900">{profileUser.name}</h1>
                        <div className="mt-2 space-y-2 text-gray-600">
                            <div className="flex items-center justify-center sm:justify-start gap-x-2">
                            <EmailIcon className="h-5 w-5 text-gray-400"/>
                            <span>{profileUser.email}</span>
                            </div>
                            {profileUser.phone && (
                            <div className="flex items-center justify-center sm:justify-start gap-x-2">
                                <PhoneIcon className="h-5 w-5 text-gray-400"/>
                                <span>{profileUser.phone}</span>
                            </div>
                            )}
                        </div>
                    </>
                   )}
                </div>
                {isOwnProfile && (
                    <div className="mt-4 sm:mt-0 flex items-center gap-x-2">
                        {isEditing ? (
                            <>
                                <button onClick={handleProfileSave} disabled={isSaving} className="flex items-center gap-x-1.5 px-3 py-1.5 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400">
                                    {isSaving ? <Spinner size="sm" /> : <CheckIcon className="h-4 w-4" />} Sačuvaj
                                </button>
                                <button onClick={handleEditToggle} className="flex items-center gap-x-1.5 px-3 py-1.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                    <XIcon className="h-4 w-4" /> Otkaži
                                </button>
                            </>
                        ) : (
                             <button onClick={handleEditToggle} className="flex items-center gap-x-1.5 px-3 py-1.5 text-sm font-semibold text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
                               <PencilIcon className="h-4 w-4"/> Izmeni Profil
                             </button>
                        )}
                    </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {isOwnProfile && !isBusinessProfile && (
            <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-x-4">
                    <div className="bg-white/20 rounded-full p-3">
                        <Building2Icon className="h-8 w-8 text-white"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Prodajete kao firma?</h3>
                        <p className="text-blue-100 mt-1">Unapredite Vaš nalog u poslovni profil i predstavite se profesionalno.</p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsConverting(true)}
                    className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2.5 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                >
                    Postani Poslovni Korisnik
                </button>
            </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isOwnProfile ? 'Moji Oglasi' : `Svi oglasi`} ({userListings.length})
          </h2>
          {userListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userListings.map(listing => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing} 
                  onNavigate={onNavigate} 
                  isOwner={isOwnProfile}
                  onDelete={onDeleteListing}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <UserCircleIcon className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-xl font-medium text-gray-900">Nema objavljenih oglasa</h3>
              <p className="mt-1 text-sm text-gray-500">
                  {isOwnProfile ? "Još uvek niste postavili nijedan oglas." : "Ovaj korisnik trenutno nema aktivnih oglasa."}
              </p>
              {isOwnProfile && (
                  <div className="mt-6">
                      <button onClick={() => onNavigate({ name: 'create' })} className="font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">
                          Postavi prvi oglas
                      </button>
                  </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Convert to Business Modal */}
       {isConverting && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg animate-fade-in-up relative">
                 <button onClick={() => setIsConverting(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                    <XIcon className="h-6 w-6"/>
                 </button>
                 <div className="flex items-center gap-x-3 mb-4">
                    <SparklesIcon className="h-8 w-8 text-blue-500"/>
                    <h3 className="text-2xl font-bold text-gray-800">Unapredite Vaš Nalog</h3>
                 </div>
                 <p className="text-gray-600 mb-6">Unesite podatke o Vašoj firmi da biste se predstavili kao poslovni korisnik.</p>
                 <div className="space-y-4">
                     <div>
                        <label htmlFor="modalBusinessName" className="block text-sm font-medium text-gray-700 mb-1">Naziv Firme</label>
                        <input type="text" id="modalBusinessName" value={businessName} onChange={e => setBusinessName(e.target.value)} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label htmlFor="modalBusinessDescription" className="block text-sm font-medium text-gray-700 mb-1">Opis Firme</label>
                        <textarea id="modalBusinessDescription" value={businessDescription} onChange={e => setBusinessDescription(e.target.value)} rows={4} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                 </div>
                 <div className="mt-8 flex justify-end">
                      <button 
                        onClick={handleConvertToBusiness} 
                        disabled={isSaving} 
                        className="w-full sm:w-auto flex justify-center items-center gap-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors duration-300 disabled:bg-blue-400"
                      >
                         {isSaving ? <Spinner size="sm" /> : 'Potvrdi i Konvertuj'}
                      </button>
                 </div>
            </div>
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
