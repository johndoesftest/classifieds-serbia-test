import React, { useState } from 'react';
import { Listing, User } from '../types';
import { CATEGORIES } from '../constants';
import { generateDescription } from '../services/geminiService';
import { uploadImages } from '../services/uploadService';
import { login, register } from '../services/authService';
import { SparklesIcon, PhotoIcon, XIcon, PlusCircleIcon } from '../components/Icons';
import Spinner from '../components/Spinner';
import LocationFilter from '../components/LocationFilter';

interface CreateListingPageProps {
  onAddListing: (listing: Listing) => void;
  currentUser: User | null;
  onAuthSuccess: (user: User) => void;
}

const MAX_IMAGES = 10;

const FormSection: React.FC<{ title: string; children: React.ReactNode; subtitle?: string; }> = ({ title, children, subtitle }) => (
    <div className="pt-8">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">{children}</div>
    </div>
);

const FormField: React.FC<{ label: string; htmlFor: string; className?: string; children: React.ReactNode }> = ({ label, htmlFor, className = "sm:col-span-3", children }) => (
    <div className={className}>
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-600">
            {label}
        </label>
        <div className="mt-2">{children}</div>
    </div>
);

const CreateListingPage: React.FC<CreateListingPageProps> = ({ onAddListing, currentUser, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    price: '',
    currency: 'EUR',
    condition: 'used',
    description: '',
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [authData, setAuthData] = useState({ name: '', email: '', password: '' });

  const inputClasses = "block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-800 shadow-sm";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAuthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData(prev => ({...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (imageFiles.length + newFiles.length > MAX_IMAGES) {
        setError(`Možete dodati najviše ${MAX_IMAGES} slika.`);
        return;
      }
      setError('');
      setImageFiles(prev => [...prev, ...newFiles]);
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
      e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setError('');
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) {
        setError("Molimo unesite naslov oglasa pre generisanja opisa.");
        return;
    }
    setError('');
    setIsGenerating(true);
    try {
        const keywords = `${formData.title}, ${formData.category}, ${formData.location}, ${formData.condition === 'new' ? 'novo' : 'korišćeno'}`;
        const description = await generateDescription(keywords);
        setFormData(prev => ({ ...prev, description }));
    } catch (err) {
        setError('Došlo je do greške prilikom generisanja opisa. Molimo pokušajte ponovo.');
        console.error(err);
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.location || !formData.description) {
      setError("Molimo popunite sva obavezna polja za oglas.");
      return;
    }
    if (imageFiles.length === 0) {
      setError("Molimo dodajte barem jednu sliku.");
      return;
    }
    setError('');
    setIsSubmitting(true);
    let userForListing: User | null = currentUser;
    try {
      if (!userForListing) {
        if (!authData.email || !authData.password || (authMode === 'register' && !authData.name)) {
          throw new Error("Molimo popunite sva polja za prijavu/registraciju.");
        }
        if (authMode === 'register') {
          userForListing = await register(authData.name, authData.email, authData.password);
        } else {
          userForListing = await login(authData.email, authData.password);
        }
        onAuthSuccess(userForListing);
      }
      if (!userForListing) throw new Error("Autentifikacija nije uspela. Molimo pokušajte ponovo.");
      
      const uploadedImageUrls = await uploadImages(imageFiles);
      const newListing: Listing = {
        id: new Date().toISOString(),
        ...formData,
        price: parseFloat(formData.price) || 0,
        currency: formData.currency as 'EUR' | 'RSD',
        condition: formData.condition as 'new' | 'used',
        images: uploadedImageUrls,
        postedDate: new Date().toISOString(),
        seller: { id: userForListing.id, name: userForListing.name, avatar: userForListing.avatar }
      };
      onAddListing(newListing);
    } catch (err: any) {
      setError(err.message || "Došlo je do greške. Molimo pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const canUploadMore = imagePreviews.length < MAX_IMAGES;

  return (
    <div className="bg-gray-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 tracking-tight">Postavite Vaš Oglas</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Popunite formu ispod kako biste brzo i lako objavili Vaš oglas i doprli do hiljada kupaca.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-2xl space-y-8 divide-y divide-gray-200">
                    <fieldset disabled={isSubmitting} className="contents">
                        
                        <FormSection title="Detalji Oglasa" subtitle="Unesite osnovne informacije o predmetu koji prodajete.">
                            <FormField label="Naslov Oglasa" htmlFor="title" className="sm:col-span-6">
                                <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required className={inputClasses} placeholder="Npr. VW Golf 7 2.0 TDI - Odlično stanje" />
                            </FormField>
                            <FormField label="Kategorija" htmlFor="category">
                                <select name="category" id="category" value={formData.category} onChange={handleInputChange} required className={inputClasses}>
                                <option value="">Izaberite kategoriju</option>
                                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </FormField>
                             <FormField label="Lokacija" htmlFor="location">
                                <LocationFilter
                                selectedLocations={formData.location ? [formData.location] : []}
                                onSelectionChange={(newLocations) => setFormData(prev => ({...prev, location: newLocations[0] || ''}))}
                                singleSelection={true}
                                placeholder="Izaberite lokaciju"
                                />
                            </FormField>
                            <FormField label="Cena" htmlFor="price">
                                <div className="flex rounded-lg shadow-sm">
                                    <input type="number" name="price" id="price" value={formData.price} onChange={handleInputChange} placeholder="Opciono" className={`${inputClasses} rounded-r-none z-10`} />
                                    <select name="currency" value={formData.currency} onChange={handleInputChange} className="block px-4 py-3 bg-gray-100 border border-gray-200 rounded-r-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-800 shadow-sm -ml-px border-l-0">
                                        <option>EUR</option>
                                        <option>RSD</option>
                                    </select>
                                </div>
                            </FormField>
                            <FormField label="Stanje" htmlFor="condition">
                                <select name="condition" id="condition" value={formData.condition} onChange={handleInputChange} required className={inputClasses}>
                                    <option value="used">Korišćeno</option>
                                    <option value="new">Novo</option>
                                </select>
                            </FormField>
                        </FormSection>

                        <FormSection title="Slike" subtitle={`Dodajte do ${MAX_IMAGES} slika. Prva slika će biti naslovna.`}>
                           <div className="sm:col-span-6">
                             <div className={`mt-2 flex justify-center items-center flex-col px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-xl ${!canUploadMore ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-blue-400 transition-colors'}`}>
                                <div className="space-y-1 text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400"/>
                                    {canUploadMore ? (
                                        <>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 cursor-pointer">
                                                <span>Izaberite fajlove</span>
                                                <input id="file-upload" name="file-upload" type="file" multiple onChange={handleImageChange} className="sr-only" accept="image/png, image/jpeg, image/webp" disabled={!canUploadMore} />
                                            </label>
                                            <p className="pl-1">ili ih prevucite ovde</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, WEBP do 5MB</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-600 font-medium">Dostignut je maksimalan broj slika.</p>
                                    )}
                                </div>
                            </div>
                           </div>
                            {imagePreviews.length > 0 && (
                            <div className="sm:col-span-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative group aspect-square">
                                        <img src={preview} alt={`Pregled ${index + 1}`} className="h-full w-full object-cover rounded-lg shadow-md" />
                                        <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-label="Ukloni sliku">
                                            <XIcon className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            )}
                        </FormSection>

                        <FormSection title="Opis Oglasa" subtitle="Detaljno opišite predmet. Što više detalja, veće su šanse za prodaju.">
                             <div className="sm:col-span-6">
                                <div className="flex justify-end mb-2">
                                     <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="flex items-center space-x-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold py-2 px-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs">
                                        {isGenerating ? <Spinner size="sm" /> : <SparklesIcon className="h-4 w-4"/>}
                                        <span>{isGenerating ? 'Generišem...' : 'Pomoć AI'}</span>
                                     </button>
                                </div>
                                <textarea name="description" id="description" rows={10} value={formData.description} onChange={handleInputChange} required className={`${inputClasses} min-h-[200px]`}></textarea>
                             </div>
                        </FormSection>

                        {!currentUser && (
                            <FormSection title="Vaši Podaci" subtitle="Kreirajte nalog ili se prijavite da biste postavili oglas.">
                                <div className="sm:col-span-6">
                                    <div className="flex justify-center mb-6 border border-gray-200 rounded-lg p-1 bg-gray-50 max-w-sm mx-auto">
                                        <button type="button" onClick={() => setAuthMode('register')} className={`w-1/2 py-2.5 rounded-md transition-all text-sm font-semibold ${authMode === 'register' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                                            Novi korisnik
                                        </button>
                                        <button type="button" onClick={() => setAuthMode('login')} className={`w-1/2 py-2.5 rounded-md transition-all text-sm font-semibold ${authMode === 'login' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                                            Postojeći korisnik
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4">
                                        {authMode === 'register' && (
                                            <FormField label="Ime i Prezime" htmlFor="auth-name" className="sm:col-span-6">
                                                <input type="text" name="name" id="auth-name" value={authData.name} onChange={handleAuthInputChange} required={!currentUser && authMode === 'register'} className={inputClasses} />
                                            </FormField>
                                        )}
                                        <FormField label="Email Adresa" htmlFor="auth-email" className={authMode === 'login' ? 'sm:col-span-3' : 'sm:col-span-3'}>
                                            <input type="email" name="email" id="auth-email" value={authData.email} onChange={handleAuthInputChange} required={!currentUser} autoComplete="email" className={inputClasses} />
                                        </FormField>
                                        <FormField label="Lozinka" htmlFor="auth-password" className={authMode === 'login' ? 'sm:col-span-3' : 'sm:col-span-3'}>
                                            <input type="password" name="password" id="auth-password" value={authData.password} onChange={handleAuthInputChange} required={!currentUser} autoComplete="current-password" className={inputClasses} />
                                        </FormField>
                                    </div>
                                </div>
                            </FormSection>
                        )}
                    </fieldset>

                    <div className="pt-8">
                         {error && <p className="text-red-600 text-sm mb-4 text-center font-semibold bg-red-50 p-3 rounded-lg">{error}</p>}
                        <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg text-lg transition-all duration-300 transform hover:scale-105 flex justify-center items-center space-x-3 disabled:bg-orange-300 disabled:cursor-not-allowed disabled:scale-100">
                            {isSubmitting ? <Spinner /> : <PlusCircleIcon className="h-6 w-6" />}
                            <span>{isSubmitting ? 'Objavljujem oglas...' : 'Postavi Oglas'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default CreateListingPage;
