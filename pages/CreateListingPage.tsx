import React, { useState, useEffect } from 'react';
import { Page, User, Listing } from '../types';
import { CATEGORIES } from '../constants';
import { CATEGORY_SPECIFIC_FIELDS } from '../data/categorySpecificFields';
import { CATEGORY_FORM_CONFIG } from '../data/categoryFormConfig';
import { generateDescription } from '../services/geminiService';
import { uploadImages } from '../services/uploadService';
import { login, register, updateCurrentUser } from '../services/authService';
import Spinner from '../components/Spinner';
import LocationFilter from '../components/LocationFilter';
import { CameraIcon, SparklesIcon, XIcon, Building2Icon } from '../components/Icons';

interface CreateListingPageProps {
  onNavigate: (page: Page) => void;
  currentUser: User | null;
  onAddListing: (listing: Listing) => void;
  onAuthSuccess: (user: User) => void;
  onUpdateUser: (user: User) => void;
}

const CreateListingPage: React.FC<CreateListingPageProps> = ({ onNavigate, currentUser, onAddListing, onAuthSuccess, onUpdateUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState<Listing['condition']>('used');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState<Listing['priceType']>('fixed');
  const [currency, setCurrency] = useState<'EUR' | 'RSD'>('EUR');
  const [location, setLocation] = useState<string[]>([]);
  const [specifics, setSpecifics] = useState<Record<string, any>>({});
  
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [isBusinessPost, setIsBusinessPost] = useState(false);

  // Guest Auth State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const categoryConfig = category ? CATEGORY_FORM_CONFIG[category] : null;
  const isLocationRequired = category === 'nekretnine';

  useEffect(() => {
    // Reset fields when category changes
    setSpecifics({});
    const defaultConfig = CATEGORY_FORM_CONFIG.default;
    setCondition(categoryConfig?.conditionOptions?.[0]?.value || defaultConfig.conditionOptions![0].value);
    setPriceType(categoryConfig?.priceTypes?.[0]?.value || defaultConfig.priceTypes![0].value);
  }, [category, categoryConfig]);
  
  const handleSpecificsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSpecifics(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newFiles = [...imageFiles, ...files].slice(0, 10);
      setImageFiles(newFiles);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles(files => files.filter((_, i) => i !== index));
    setImagePreviews(previews => previews.filter((_, i) => i !== index));
  };
  
  const handleGenerateDescription = async () => {
      if (!title) {
          setError("Molimo unesite naslov oglasa pre generisanja opisa.");
          return;
      }
      setIsGenerating(true);
      setError('');
      try {
          const keywords = `${title}, ${category ? CATEGORIES.find(c=>c.id === category)?.name : ''}, ${location[0] || ''}, ${condition || ''}`;
          const generated = await generateDescription(keywords);
          setDescription(generated);
      } catch (err) {
          console.error(err);
          setError("Došlo je do greške prilikom generisanja opisa.");
      } finally {
          setIsGenerating(false);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || (isLocationRequired && location.length === 0)) {
        setError('Naslov, kategorija i grad (za nekretnine) su obavezna polja.');
        return;
    }
    setError('');
    setIsLoading(true);

    try {
        let userToPostWith = currentUser;

        // Step 1: Handle Authentication if user is not logged in
        if (!userToPostWith) {
            if (authMode === 'register') {
                if (authPassword !== authConfirmPassword) throw new Error("Lozinke se ne podudaraju.");
                let newUser = await register(authName, authEmail, authPassword);
                
                if (isBusinessPost) {
                    const businessUser = await updateCurrentUser({ ...newUser, accountType: 'business', businessName: authName });
                    onUpdateUser(businessUser);
                    userToPostWith = businessUser;
                } else {
                    userToPostWith = newUser;
                }
            } else {
                userToPostWith = await login(authEmail, authPassword);
            }
            onAuthSuccess(userToPostWith);
        } 
        else if (isBusinessPost && currentUser && currentUser.accountType === 'private') {
             const businessUser = await updateCurrentUser({ accountType: 'business', businessName: currentUser.name });
             onUpdateUser(businessUser);
             userToPostWith = businessUser;
        }

        if (!userToPostWith) {
             throw new Error("Došlo je do greške prilikom autentifikacije. Molimo pokušajte ponovo.");
        }

        // Step 2: Upload images and create listing
        const imageUrls = await uploadImages(imageFiles);
        const newListing: Listing = {
            id: `listing-${Date.now()}`,
            title,
            description,
            price: price ? parseFloat(price) : 0,
            priceType,
            currency,
            category,
            condition: categoryConfig?.showCondition ? condition : undefined,
            location: location.length > 0 ? location[0] : undefined,
            images: imageUrls,
            seller: userToPostWith,
            postedDate: new Date().toISOString(),
            specifics,
        };
        onAddListing(newListing);
    } catch (err: any) {
        setError(err.message || 'Došlo je do greške. Molimo pokušajte ponovo.');
        setIsLoading(false);
    }
  };

  const renderImagePlaceholders = () => {
    const placeholders = [];
    const totalSlots = imagePreviews.length < 5 ? 5 : 10;
    
    for (let i = 0; i < totalSlots; i++) {
        if (i < imagePreviews.length) {
            placeholders.push(
                <div key={`preview-${i}`} className="relative group aspect-square">
                    <img src={imagePreviews[i]} alt={`Preview ${i}`} className="h-full w-full object-cover rounded-lg" />
                    <button type="button" onClick={() => handleRemoveImage(i)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <XIcon className="h-4 w-4" />
                    </button>
                </div>
            );
        } else {
            placeholders.push(
                 <label key={`placeholder-${i}`} className="relative aspect-square flex flex-col items-center justify-center border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-colors">
                    <CameraIcon className="h-8 w-8 text-gray-400 mb-1" />
                    <span className="text-xs font-semibold text-gray-500">Dodaj sliku</span>
                     <input id={`file-upload-${i}`} name="file-upload" type="file" multiple accept="image/*" onChange={handleImageChange} className="sr-only" />
                </label>
            );
        }
    }
    return placeholders;
  };
  
  const currentSpecificFields = CATEGORY_SPECIFIC_FIELDS[category] || [];
  const addressField = currentSpecificFields.find(f => f.name === 'address');
  const otherSpecificFields = currentSpecificFields.filter(f => f.name !== 'address');

  const formInputClasses = "block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors duration-150";
  const formLabelClasses = "block text-sm font-medium leading-6 text-gray-700 mb-2";


  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Postavite Vaš Oglas</h1>
            <p className="text-gray-600">Popunite detalje ispod da biste oglas učinili vidljivim hiljadama kupaca.</p>
          </div>
          
          <hr/>
          
          {/* Main Details */}
          <div className="space-y-6">
             <h2 className="text-xl font-semibold text-gray-800">Detalji Oglasa</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <div className="sm:col-span-2">
                    <label htmlFor="title" className={formLabelClasses}>Naslov oglasa*</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className={formInputClasses} placeholder="Npr. Odličan Volkswagen Golf 7"/>
                </div>
                 <div>
                    <label htmlFor="category" className={formLabelClasses}>Kategorija*</label>
                    <select id="category" value={category} onChange={e => { setCategory(e.target.value); }} required className={formInputClasses}>
                        <option value="">Izaberite kategoriju</option>
                        {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                </div>
                
                {category && categoryConfig?.showCondition && (
                    <div>
                        <label htmlFor="condition" className={formLabelClasses}>Stanje*</label>
                        <select id="condition" value={condition} onChange={e => setCondition(e.target.value as Listing['condition'])} required className={formInputClasses}>
                            {categoryConfig.conditionOptions?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                )}

                 {category && categoryConfig?.showPrice && (
                    <div>
                        <label htmlFor="price" className={formLabelClasses}>{categoryConfig.priceLabel}</label>
                        <div className="flex rounded-lg">
                            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} placeholder="0" className={`${formInputClasses} ${categoryConfig.priceTypes || categoryConfig.showCurrency ? 'rounded-r-none' : ''} z-10`}/>
                            
                            {categoryConfig.priceTypes && (
                                <select value={priceType} onChange={e => setPriceType(e.target.value as Listing['priceType'])} className={`inline-flex items-center px-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-600 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${categoryConfig.showCurrency ? '' : 'rounded-r-lg'}`}>
                                    {categoryConfig.priceTypes.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
                                </select>
                            )}

                            {categoryConfig.showCurrency && (
                                <select value={currency} onChange={e => setCurrency(e.target.value as 'EUR' | 'RSD')} className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-600 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                                    <option>EUR</option>
                                    <option>RSD</option>
                                </select>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Ostavite 0 za cenu po dogovoru.</p>
                    </div>
                 )}

                <div className="sm:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                        <div>
                            <label className={formLabelClasses}>Grad{isLocationRequired ? '*' : ''}</label>
                            <LocationFilter selectedLocations={location} onSelectionChange={setLocation} singleSelection={true} />
                        </div>
                        {category && addressField && (
                            <div>
                                <label htmlFor={addressField.name} className={formLabelClasses}>{addressField.label}{addressField.required ? '*' : ''}</label>
                                <input type={addressField.type as 'text' | 'number'} name={addressField.name} id={addressField.name} value={specifics[addressField.name] || ''} onChange={handleSpecificsChange} placeholder={addressField.placeholder} required={addressField.required} className={formInputClasses} />
                            </div>
                        )}
                    </div>
                </div>
             </div>
          </div>
          
           {/* Dynamic Specifics */}
          {otherSpecificFields.length > 0 && (
              <div className="space-y-6 transition-all duration-300">
                  <h2 className="text-xl font-semibold text-gray-800">Specifikacije</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                      {otherSpecificFields.map(field => (
                         <div key={field.name}>
                           <label htmlFor={field.name} className={formLabelClasses}>{field.label}{field.required ? '*' : ''}</label>
                            {field.type === 'select' ? (
                              <select name={field.name} id={field.name} value={specifics[field.name] || ''} onChange={handleSpecificsChange} required={field.required} className={formInputClasses}>
                                  <option value="">Izaberite</option>
                                  {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                            ) : (
                              <input type={field.type} name={field.name} id={field.name} value={specifics[field.name] || ''} onChange={handleSpecificsChange} placeholder={field.placeholder} required={field.required} className={formInputClasses} />
                            )}
                         </div>
                      ))}
                  </div>
              </div>
          )}

          {/* Images */}
           <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Slike (do 10)</h2>
                <div className="grid grid-cols-5 gap-4">
                    {renderImagePlaceholders()}
                </div>
            </div>

          {/* Description */}
          <div className="space-y-6">
              <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Opis</h2>
                  <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="flex items-center gap-x-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-wait">
                      {isGenerating ? <Spinner size="sm" /> : <SparklesIcon className="h-5 w-5" />}
                      <span>{isGenerating ? 'Generišem...' : 'Generiši sa AI'}</span>
                  </button>
              </div>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={6} className={formInputClasses} placeholder="Detaljno opišite predmet koji prodajete..."></textarea>
          </div>
          
            {/* User Details / Authentication */}
            {!currentUser && (
               <>
                 <hr/>
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                         <h2 className="text-xl font-semibold text-gray-800">Vaši podaci</h2>
                         <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                            <button type="button" onClick={() => setAuthMode('register')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${authMode === 'register' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>Registracija</button>
                            <button type="button" onClick={() => setAuthMode('login')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${authMode === 'login' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>Prijava</button>
                        </div>
                    </div>
                     
                    {authMode === 'register' ? (
                        <div className="space-y-6">
                           <div className="flex items-center gap-x-3">
                              <input type="checkbox" id="isBusiness" checked={isBusinessPost} onChange={e => setIsBusinessPost(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                              <label htmlFor="isBusiness" className="flex items-center gap-x-2 font-medium text-gray-800">
                                <Building2Icon className="h-5 w-5 text-gray-500"/>
                                Registrujte se kao firma
                              </label>
                           </div>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                                <div>
                                    <label htmlFor="authName" className={formLabelClasses}>{isBusinessPost ? 'Naziv Firme*' : 'Ime i Prezime*'}</label>
                                    <input type="text" id="authName" value={authName} onChange={e => setAuthName(e.target.value)} required className={formInputClasses} placeholder={isBusinessPost ? 'Vaša Firma D.O.O' : 'Pera Perić'}/>
                                </div>
                                 <div>
                                    <label htmlFor="authEmail" className={formLabelClasses}>{isBusinessPost ? 'Email firme*' : 'Email*'}</label>
                                    <input type="email" id="authEmail" value={authEmail} onChange={e => setAuthEmail(e.target.value)} required className={formInputClasses} placeholder="vas.email@example.com"/>
                                </div>
                                <div>
                                    <label htmlFor="authPassword" className={formLabelClasses}>Lozinka*</label>
                                    <input type="password" id="authPassword" value={authPassword} onChange={e => setAuthPassword(e.target.value)} required className={formInputClasses} placeholder="********"/>
                                </div>
                                 <div>
                                    <label htmlFor="authConfirmPassword" className={formLabelClasses}>Potvrdi lozinku*</label>
                                    <input type="password" id="authConfirmPassword" value={authConfirmPassword} onChange={e => setAuthConfirmPassword(e.target.value)} required className={formInputClasses} placeholder="********"/>
                                </div>
                           </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                             <div>
                                <label htmlFor="authEmail" className={formLabelClasses}>Email*</label>
                                <input type="email" id="authEmail" value={authEmail} onChange={e => setAuthEmail(e.target.value)} required className={formInputClasses} placeholder="vas.email@example.com"/>
                            </div>
                             <div>
                                <label htmlFor="authPassword" className={formLabelClasses}>Lozinka*</label>
                                <input type="password" id="authPassword" value={authPassword} onChange={e => setAuthPassword(e.target.value)} required className={formInputClasses} placeholder="********"/>
                            </div>
                        </div>
                    )}
                 </div>
               </>
            )}

          {/* Submission */}
          {error && <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">{error}</p>}
          <div className="pt-4 text-right">
              <button type="submit" disabled={isLoading} className="w-full sm:w-auto inline-flex justify-center items-center gap-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg text-lg transition-all duration-300 disabled:bg-blue-400 disabled:cursor-wait">
                  {isLoading ? <><Spinner /> Obrađujem...</> : 'Postavi Oglas'}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;