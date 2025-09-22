
import React, { useState } from 'react';
import { Page, Category } from '../types';
import { CATEGORIES, MOCK_LISTINGS } from '../constants';
import ListingCard from '../components/ListingCard';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const CategoryCard: React.FC<{ category: Category; onClick: () => void }> = ({ category, onClick }) => (
    <div 
        onClick={onClick}
        className="group bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-blue-500"
    >
        <div className="bg-blue-100 rounded-full p-4 mb-4 transition-colors duration-300 group-hover:bg-blue-500">
            <category.icon className="h-8 w-8 text-blue-600 transition-colors duration-300 group-hover:text-white" />
        </div>
        <h3 className="font-semibold text-gray-800">{category.name}</h3>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onNavigate({ name: 'listings', filters: { searchTerm } });
    };

    const featuredListings = MOCK_LISTINGS.slice(0, 4);

    return (
    <div className="space-y-16 pb-16">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white pt-24 pb-20 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/serbia/1920/1080')"}}>
            <div className="absolute inset-0 bg-blue-700 opacity-60"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Pronađite sve što vam treba</h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">Najveća platforma za oglase u Srbiji. Kupujte, prodajte, jednostavno i brzo.</p>
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-2 flex items-center">
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Šta tražite? Npr. 'Stan u Beogradu'"
                        className="w-full p-4 border-none text-gray-700 focus:ring-0 text-lg"
                    />
                    <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300">
                        Traži
                    </button>
                </form>
            </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Istražite Kategorije</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {CATEGORIES.map(cat => (
                    <CategoryCard 
                        key={cat.id} 
                        category={cat} 
                        onClick={() => onNavigate({ name: 'listings', filters: { category: cat.id } })}
                    />
                ))}
            </div>
        </section>

        {/* Featured Listings Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Izdvojeni Oglasi</h2>
                <button onClick={() => onNavigate({name: 'listings'})} className="text-blue-600 font-semibold hover:underline">
                    Pogledaj sve
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} onNavigate={onNavigate} />
                ))}
            </div>
        </section>
    </div>
  );
};

export default HomePage;
   