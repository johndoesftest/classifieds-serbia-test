import React, { useState, useMemo } from 'react';
import { Page, Category, Listing, User } from '../types';
import { CATEGORIES, LOCATIONS } from '../constants';
import ListingCard from '../components/ListingCard';
import ListingCardSkeleton from '../components/ListingCardSkeleton';
import { 
    SearchIcon, 
    ChatBubbleIcon, 
    HandshakeIcon,
    MapPinIcon,
    PlusCircleIcon
} from '../components/Icons';
import SearchInputWithSuggestions from '../components/SearchInputWithSuggestions';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  listings: Listing[];
  favorites: string[];
  onToggleFavorite: (listingId: string) => void;
  currentUser: User | null;
  onDeleteListing: (listingId: string) => void;
  isLoading: boolean;
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

interface StepProps {
    icon: React.FC<any>;
    title: string;
    description: string;
    isLast: boolean;
}

const Step: React.FC<StepProps> = ({ icon: Icon, title, description, isLast }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 ring-8 ring-blue-50">
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            {!isLast && <div className="w-px h-full bg-gray-300" />}
        </div>
        <div className="pb-10">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-gray-600">{description}</p>
        </div>
    </div>
);

const HowItWorksSection = () => {
    const buyerSteps = [
        { icon: SearchIcon, title: 'Pretražite Oglas', description: 'Pronađite šta vam je potrebno koristeći našu naprednu pretragu i filtere.' },
        { icon: ChatBubbleIcon, title: 'Kontaktirajte Prodavca', description: 'Stupite u kontakt sa prodavcem direktno putem platforme.' },
        { icon: HandshakeIcon, title: 'Zaključite Dogovor', description: 'Dogovorite se o uslovima i obavite sigurnu kupovinu.' },
    ];

    const sellerSteps = [
        { icon: PlusCircleIcon, title: 'Postavite Oglas', description: 'Kreirajte detaljan oglas sa slikama i opisom za samo nekoliko minuta.' },
        { icon: ChatBubbleIcon, title: 'Primajte Upite', description: 'Odgovarajte na poruke i pozive zainteresovanih kupaca direktno.' },
        { icon: HandshakeIcon, title: 'Prodajte Predmet', description: 'Ugovorite prodaju, sretnite se sa kupcem i uspešno završite transakciju.' },
    ];

    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">Kako Funkcioniše?</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Jednostavni koraci za uspešnu kupovinu i prodaju na našoj platformi.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-10 md:p-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {/* Buyers Column */}
                        <div>
                            <h3 className="text-2xl font-bold text-center md:text-left mb-8 text-blue-700">Za Kupce</h3>
                            <div className="flow-root">
                                {buyerSteps.map((step, index) => (
                                    <Step 
                                        key={`buyer-${index}`}
                                        icon={step.icon}
                                        title={step.title}
                                        description={step.description}
                                        isLast={index === buyerSteps.length - 1}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sellers Column */}
                        <div>
                            <h3 className="text-2xl font-bold text-center md:text-left mb-8 text-orange-600">Za Prodavce</h3>
                            <div className="flow-root">
                                {sellerSteps.map((step, index) => (
                                     <Step 
                                        key={`seller-${index}`}
                                        icon={step.icon}
                                        title={step.title}
                                        description={step.description}
                                        isLast={index === sellerSteps.length - 1}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CtaSection: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <section className="relative bg-gray-800">
        <img 
            src="https://picsum.photos/seed/cta-bg/1920/1080" 
            alt="Post ad background"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
                <h2 className="text-4xl font-extrabold text-white">Imate Nešto za Prodaju?</h2>
                <p className="text-blue-100 text-lg mt-4 max-w-2xl">Postavite svoj oglas besplatno i doprite do hiljada potencijalnih kupaca širom Srbije. Brzo, lako i efikasno.</p>
                <button
                  onClick={() => onNavigate({ name: 'create' })}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg text-lg transition-all duration-300 transform hover:scale-105 mt-8"
                >
                  Postavi Oglas Sada
                </button>
            </div>
        </div>
    </section>
);


const HomePage: React.FC<HomePageProps> = ({ onNavigate, listings, favorites, onToggleFavorite, currentUser, onDeleteListing, isLoading }) => {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const keywordSuggestions = useMemo(() => {
        const categoryNames = CATEGORIES.map(c => c.name);
        const titleKeywords = new Set<string>();
        listings.forEach(listing => {
            listing.title.toLowerCase().split(' ').forEach(word => {
                if (word.length > 3 && isNaN(parseInt(word))) {
                    titleKeywords.add(word.replace(/[^a-z0-9]/gi, ''));
                }
            });
        });
        return [...new Set([...categoryNames, ...Array.from(titleKeywords)])];
    }, [listings]);

    const locationSuggestions = LOCATIONS;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const combinedSearchTerm = `${keyword} ${location}`.trim();
        onNavigate({ name: 'listings', filters: { searchTerm: combinedSearchTerm } });
    };

    const latestListings = useMemo(() => 
        [...listings]
          .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
          .slice(0, 8),
      [listings]);
      
    const popularListings = useMemo(() => 
        [...listings]
          // Create a stable "popularity" sort based on price and ID
          .sort((a, b) => (b.price % 1000 + b.id.charCodeAt(b.id.length - 1)) - (a.price % 1000 + a.id.charCodeAt(a.id.length - 1)))
          .slice(0, 8),
      [listings]);

    return (
    <div className="space-y-16 pb-16 bg-gray-50">
        {/* Hero Section */}
        <div className="relative">
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-32 pb-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in-down">Pronađite sve što vam treba</h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8 animate-fade-in-up">Najveća platforma za oglase u Srbiji. Kupujte, prodajte, jednostavno i brzo.</p>
                     <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white rounded-full shadow-2xl p-2 flex items-center transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500">
                        <SearchInputWithSuggestions
                            value={keyword}
                            onChange={setKeyword}
                            placeholder="Šta tražite?"
                            suggestions={keywordSuggestions}
                            icon={<SearchIcon className="h-6 w-6 text-gray-400 flex-shrink-0" />}
                            ariaLabel="Pretraga po ključnoj reči"
                            inputClassName="w-full p-3 pl-12 border-none text-gray-700 focus:ring-0 text-lg bg-transparent"
                            iconContainerClassName="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                        />
                        <div className="border-l-2 border-gray-100 h-8 self-center"></div>
                        <SearchInputWithSuggestions
                            value={location}
                            onChange={setLocation}
                            placeholder="Lokacija"
                            suggestions={locationSuggestions}
                            icon={<MapPinIcon className="h-6 w-6 text-gray-400 flex-shrink-0" />}
                            ariaLabel="Pretraga po lokaciji"
                            inputClassName="w-full p-3 pl-12 border-none text-gray-700 focus:ring-0 text-lg bg-transparent"
                            iconContainerClassName="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                        />
                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 ml-2 flex-shrink-0">
                            Traži
                        </button>
                    </form>
                    <div className="mt-8 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center gap-x-4">
                            <p className="text-blue-50">Imate nešto za prodaju?</p>
                            <button onClick={() => onNavigate({ name: 'create' })} className="font-semibold bg-white text-blue-700 hover:bg-blue-50 py-2 px-5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                                Postavite oglas besplatno
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="absolute bottom-0 w-full">
                <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100H1440V0C1181.33 66.6667 713.333 100 0 0V100Z" fill="#F9FAFB"></path>
                </svg>
            </div>
        </div>

        {/* Categories Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
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

        {/* Latest Listings Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Najnoviji Oglasi</h2>
                <button onClick={() => onNavigate({name: 'listings'})} className="text-blue-600 font-semibold hover:underline">
                    Pogledaj sve
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {isLoading ? (
                     Array.from({ length: 8 }).map((_, index) => <ListingCardSkeleton key={index} />)
                ) : (
                    latestListings.map(listing => (
                        <ListingCard 
                            key={listing.id} 
                            listing={listing} 
                            onNavigate={onNavigate} 
                            isFavorite={favorites.includes(listing.id)} 
                            onToggleFavorite={onToggleFavorite} 
                            isOwner={currentUser?.id === listing.seller.id} 
                            onDelete={onDeleteListing} 
                        />
                    ))
                )}
            </div>
        </section>
        
        {/* Popular Listings Section */}
        {popularListings.length > 0 && (
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Popularni Oglasi</h2>
                    <button onClick={() => onNavigate({name: 'listings'})} className="text-blue-600 font-semibold hover:underline">
                        Pogledaj sve
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     {isLoading ? (
                        Array.from({ length: 8 }).map((_, index) => <ListingCardSkeleton key={index} />)
                     ) : (
                        popularListings.map(listing => (
                            <ListingCard 
                                key={listing.id} 
                                listing={listing} 
                                onNavigate={onNavigate} 
                                isFavorite={favorites.includes(listing.id)} 
                                onToggleFavorite={onToggleFavorite} 
                                isOwner={currentUser?.id === listing.seller.id} 
                                onDelete={onDeleteListing} 
                            />
                        ))
                     )}
                </div>
            </section>
        )}

        {/* How It Works */}
        <HowItWorksSection />

        {/* CTA Section */}
        <CtaSection onNavigate={onNavigate} />

    </div>
  );
};

export default HomePage;