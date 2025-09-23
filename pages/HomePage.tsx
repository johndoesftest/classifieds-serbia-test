import React, { useState } from 'react';
import { Page, Category, Listing } from '../types';
import { CATEGORIES } from '../constants';
import ListingCard from '../components/ListingCard';
import { 
    SearchIcon, 
    ChatBubbleIcon, 
    HandshakeIcon,
    LayersIcon,
    CursorArrowIcon,
    MapPinIcon,
    QuoteIcon,
    PlusCircleIcon
} from '../components/Icons';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  listings: Listing[];
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

const HowItWorksSection = () => {
    const [activeTab, setActiveTab] = useState<'buyers' | 'sellers'>('buyers');

    const buyerSteps = [
        { icon: SearchIcon, title: '1. Pretražite Oglas', description: 'Pronađite šta vam je potrebno koristeći našu naprednu pretragu i filtere.' },
        { icon: ChatBubbleIcon, title: '2. Kontaktirajte Prodavca', description: 'Stupite u kontakt sa prodavcem direktno putem platforme.' },
        { icon: HandshakeIcon, title: '3. Zaključite Dogovor', description: 'Dogovorite se o uslovima i obavite sigurnu kupovinu.' },
    ];

    const sellerSteps = [
        { icon: PlusCircleIcon, title: '1. Postavite Oglas', description: 'Kreirajte detaljan oglas sa slikama i opisom za samo nekoliko minuta.' },
        { icon: ChatBubbleIcon, title: '2. Primajte Upite', description: 'Odgovarajte na poruke i pozive zainteresovanih kupaca direktno.' },
        { icon: HandshakeIcon, title: '3. Prodajte Predmet', description: 'Ugovorite prodaju, sretnite se sa kupcem i uspešno završite transakciju.' },
    ];
    
    const steps = activeTab === 'buyers' ? buyerSteps : sellerSteps;

    const tabButtonClasses = (tabName: 'buyers' | 'sellers') => `px-8 py-3 font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg ${
      activeTab === tabName 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`;
  
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-bold text-center mb-4">Kako Funkcioniše?</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Jednostavni koraci za uspešnu kupovinu i prodaju na našoj platformi.</p>
            
            <div className="flex justify-center space-x-4 mb-12">
                <button onClick={() => setActiveTab('buyers')} className={tabButtonClasses('buyers')}>
                    Za Kupce
                </button>
                <button onClick={() => setActiveTab('sellers')} className={tabButtonClasses('sellers')}>
                    Za Prodavce
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {steps.map((step, index) => (
                    <div key={`${activeTab}-${index}`} className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="bg-orange-100 rounded-full p-4 inline-block mb-4">
                            <step.icon className="h-10 w-10 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-500">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const WhyChooseUsSection = () => (
    <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <img src="https://picsum.photos/seed/chooseus/600/500" alt="Why choose us" className="rounded-xl shadow-2xl" />
            </div>
            <div>
                <h2 className="text-3xl font-bold mb-6">Zašto Izabrati OglasiSrbija?</h2>
                <ul className="space-y-6">
                    <li className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-3 mr-4"><LayersIcon className="h-6 w-6 text-blue-600"/></div>
                        <div>
                            <h4 className="font-semibold text-lg">Ogroman Izbor</h4>
                            <p className="text-gray-600">Pristupite hiljadama oglasa iz različitih kategorija širom Srbije.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-3 mr-4"><CursorArrowIcon className="h-6 w-6 text-blue-600"/></div>
                        <div>
                            <h4 className="font-semibold text-lg">Jednostavno za Korišćenje</h4>
                            <p className="text-gray-600">Naš intuitivni interfejs čini postavljanje i pretragu oglasa lakim.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-3 mr-4"><MapPinIcon className="h-6 w-6 text-blue-600"/></div>
                        <div>
                            <h4 className="font-semibold text-lg">Lokalni Fokus</h4>
                            <p className="text-gray-600">Povežite se sa kupcima i prodavcima u vašoj neposrednoj blizini.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
);

const TestimonialsSection = () => (
    <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Šta Naši Korisnici Kažu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <QuoteIcon className="h-8 w-8 text-blue-200 mb-4" />
                    <p className="text-gray-600 mb-6">"Prodao sam auto za samo dva dana! Platforma je odlična i veoma laka za korišćenje."</p>
                    <div className="flex items-center">
                        <img src="https://i.pravatar.cc/150?u=milan" alt="Milan J." className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <p className="font-bold">Milan J.</p>
                            <p className="text-sm text-gray-500">Beograd</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <QuoteIcon className="h-8 w-8 text-blue-200 mb-4" />
                    <p className="text-gray-600 mb-6">"Pronašla sam savršen stan zahvaljujući detaljnim filterima. Preporučujem svima!"</p>
                    <div className="flex items-center">
                        <img src="https://i.pravatar.cc/150?u=ivana" alt="Ivana P." className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <p className="font-bold">Ivana P.</p>
                            <p className="text-sm text-gray-500">Novi Sad</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <QuoteIcon className="h-8 w-8 text-blue-200 mb-4" />
                    <p className="text-gray-600 mb-6">"Kao preduzetnik, redovno koristim OglasiSrbija za pronalaženje opreme. Odličan sajt."</p>
                    <div className="flex items-center">
                        <img src="https://i.pravatar.cc/150?u=dragan" alt="Dragan T." className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <p className="font-bold">Dragan T.</p>
                            <p className="text-sm text-gray-500">Niš</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const CtaSection: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <section className="bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">Imate Nešto za Prodaju?</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">Postavite svoj oglas besplatno i doprite do hiljada potencijalnih kupaca širom Srbije.</p>
            <button
              onClick={() => onNavigate({ name: 'create' })}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg text-lg transition-all duration-300 transform hover:scale-105"
            >
              Postavi Oglas Sada
            </button>
        </div>
    </section>
);


const HomePage: React.FC<HomePageProps> = ({ onNavigate, listings }) => {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const combinedSearchTerm = `${keyword} ${location}`.trim();
        onNavigate({ name: 'listings', filters: { searchTerm: combinedSearchTerm } });
    };

    const latestListings = [...listings]
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
      .slice(0, 4);
      
    const carListings = listings
      .filter(l => l.category === 'automobili')
      .slice(0, 4);
      
    const realEstateListings = listings
      .filter(l => l.category === 'nekretnine')
      .slice(0, 4);

    return (
    <div className="space-y-16 pb-16 bg-gray-50">
        {/* Hero Section */}
        <div className="relative">
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-32 pb-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in-down">Pronađite sve što vam treba</h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8 animate-fade-in-up">Najveća platforma za oglase u Srbiji. Kupujte, prodajte, jednostavno i brzo.</p>
                     <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white rounded-full shadow-2xl p-2 flex items-center transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500">
                        <div className="flex items-center flex-1 pl-4">
                            <SearchIcon className="h-6 w-6 text-gray-400 flex-shrink-0" />
                            <input 
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Šta tražite?"
                                className="w-full p-3 border-none text-gray-700 focus:ring-0 text-lg bg-transparent"
                                aria-label="Pretraga po ključnoj reči"
                            />
                        </div>
                        <div className="flex items-center flex-1 pl-4 border-l-2 border-gray-100">
                            <MapPinIcon className="h-6 w-6 text-gray-400 flex-shrink-0" />
                            <input 
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Lokacija"
                                className="w-full p-3 border-none text-gray-700 focus:ring-0 text-lg bg-transparent"
                                aria-label="Pretraga po lokaciji"
                            />
                        </div>
                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 ml-2 flex-shrink-0">
                            Traži
                        </button>
                    </form>
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
                {latestListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} onNavigate={onNavigate} />
                ))}
            </div>
        </section>
        
        {/* Car Listings Section */}
        {carListings.length > 0 && (
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Popularni Automobili</h2>
                    <button onClick={() => onNavigate({name: 'listings', filters: { category: 'automobili' }})} className="text-blue-600 font-semibold hover:underline">
                        Pogledaj sve
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {carListings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} onNavigate={onNavigate} />
                    ))}
                </div>
            </section>
        )}

        {/* Real Estate Listings Section */}
        {realEstateListings.length > 0 && (
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Aktuelno u Nekretninama</h2>
                    <button onClick={() => onNavigate({name: 'listings', filters: { category: 'nekretnine' }})} className="text-blue-600 font-semibold hover:underline">
                        Pogledaj sve
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {realEstateListings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} onNavigate={onNavigate} />
                    ))}
                </div>
            </section>
        )}

        {/* How It Works */}
        <HowItWorksSection />

        {/* Why Choose Us */}
        <WhyChooseUsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CtaSection onNavigate={onNavigate} />

    </div>
  );
};

export default HomePage;