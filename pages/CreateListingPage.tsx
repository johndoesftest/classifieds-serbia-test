
import React, { useState } from 'react';
import { Listing } from '../types';
import { CATEGORIES, LOCATIONS } from '../constants';
import { generateDescription } from '../services/geminiService';
import { SparklesIcon } from '../components/Icons';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: Listing = {
      id: new Date().toISOString(),
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      currency: formData.currency as 'EUR' | 'RSD',
      category: formData.category,
      location: formData.location,
      condition: formData.condition as 'new' | 'used',
      images: ['https://picsum.photos/seed/' + Math.random() + '/800/600'],
      postedDate: new Date().toISOString(),
      seller: { name: 'Trenutni Korisnik', avatar: 'https://i.pravatar.cc/150?u=currentuser' }
    };
    onAddListing(newListing);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Postavite Vaš Oglas</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="flex justify-between items-center mb-1">
                 <label htmlFor="description" className="block text-lg font-medium text-gray-700">Opis Oglasa</label>
                 <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="flex items-center space-x-2 bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isGenerating ? <Spinner size="sm" /> : <SparklesIcon className="h-5 w-5"/>}
                    <span>{isGenerating ? 'Generišem...' : 'Generiši sa AI'}</span>
                 </button>
            </div>
            <textarea name="description" id="description" rows={8} value={formData.description} onChange={handleInputChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"></textarea>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg text-xl transition-all duration-300 transform hover:scale-105">
            Postavi Oglas
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;
   