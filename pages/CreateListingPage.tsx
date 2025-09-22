import React, { useState } from 'react';
import { Listing } from '../types';
import { CATEGORIES, LOCATIONS } from '../constants';
import { generateDescription } from '../services/geminiService';
import { uploadImages } from '../services/uploadService';
import { SparklesIcon, PhotoIcon, XIcon } from '../components/Icons';
import Spinner from '../components/Spinner';

interface CreateListingPageProps {
  onAddListing: (listing: Listing) => void;
}

const CreateListingPage: React.FC<CreateListingPageProps> = ({ onAddListing }) => {
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
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const currentFiles = [...imageFiles, ...files];
      setImageFiles(currentFiles);

      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImagePreviews(prev => [...prev, reader.result as string]);
          }
        };
        // Fix: Cast 'file' to Blob to resolve type error.
        reader.readAsDataURL(file as Blob);
      });
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
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
        setError("Molimo popunite sva obavezna polja.");
        return;
    }
    setError('');
    setIsUploading(true);

    try {
        let uploadedImageUrls: string[] = [];
        if (imageFiles.length > 0) {
            uploadedImageUrls = await uploadImages(imageFiles);
        }

        const newListing: Listing = {
          id: new Date().toISOString(),
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price) || 0,
          currency: formData.currency as 'EUR' | 'RSD',
          category: formData.category,
          location: formData.location,
          condition: formData.condition as 'new' | 'used',
          images: uploadedImageUrls.length > 0 ? uploadedImageUrls : ['https://picsum.photos/seed/' + Math.random() + '/800/600'],
          postedDate: new Date().toISOString(),
          seller: { name: 'Trenutni Korisnik', avatar: 'https://i.pravatar.cc/150?u=currentuser' }
        };
        onAddListing(newListing);
    } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        setError("Greška prilikom otpremanja slika. Molimo pokušajte ponovo.");
    } finally {
        setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Postavite Vaš Oglas</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset disabled={isUploading}>
            <div>
              <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">Naslov Oglasa</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-1">Kategorija</label>
                <select name="category" id="category" value={formData.category} onChange={handleInputChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3">
                  <option value="">Izaberite kategoriju</option>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-lg font-medium text-gray-700 mb-1">Lokacija</label>
                <select name="location" id="location" value={formData.location} onChange={handleInputChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3">
                  <option value="">Izaberite lokaciju</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-1">Cena</label>
                <div className="flex">
                    <input type="number" name="price" id="price" value={formData.price} onChange={handleInputChange} className="w-full border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3" />
                    <select name="currency" value={formData.currency} onChange={handleInputChange} className="border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50 border-l-0">
                        <option>EUR</option>
                        <option>RSD</option>
                    </select>
                </div>
              </div>
              <div>
                <label htmlFor="condition" className="block text-lg font-medium text-gray-700 mb-1">Stanje</label>
                <select name="condition" id="condition" value={formData.condition} onChange={handleInputChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3">
                  <option value="used">Korišćeno</option>
                  <option value="new">Novo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Slike</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400"/>
                      <div className="flex text-sm text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Izaberite fajlove</span>
                              <input id="file-upload" name="file-upload" type="file" multiple onChange={handleImageChange} className="sr-only" accept="image/png, image/jpeg, image/webp" />
                          </label>
                          <p className="pl-1">ili ih prevucite ovde</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
                  </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Napomena: Ovo je simulacija otpremanja slika. Vaši fajlovi se ne čuvaju.</p>
            </div>
            
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                          <img src={preview} alt={`Pregled slike ${index + 1}`} className="h-28 w-full object-cover rounded-md shadow-md" />
                          <button 
                              type="button" 
                              onClick={() => handleRemoveImage(index)}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-700 transition-colors"
                              aria-label="Ukloni sliku"
                          >
                              <XIcon className="h-4 w-4" />
                          </button>
                      </div>
                  ))}
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1">
                   <label htmlFor="description" className="block text-lg font-medium text-gray-700">Opis Oglasa</label>
                   <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="flex items-center space-x-2 bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isGenerating ? <Spinner size="sm" /> : <SparklesIcon className="h-5 w-5"/>}
                      <span>{isGenerating ? 'Generišem...' : 'Generiši sa AI'}</span>
                   </button>
              </div>
              <textarea name="description" id="description" rows={8} value={formData.description} onChange={handleInputChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"></textarea>
            </div>
          </fieldset>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <button type="submit" disabled={isUploading} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg text-xl transition-all duration-300 transform hover:scale-105 flex justify-center items-center space-x-3 disabled:bg-orange-300 disabled:cursor-not-allowed">
            {isUploading && <Spinner size="sm" />}
            <span>{isUploading ? 'Otpremanje slika...' : 'Postavi Oglas'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;