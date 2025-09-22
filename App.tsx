
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import CreateListingPage from './pages/CreateListingPage';
import { Page, Listing } from './types';
import { MOCK_LISTINGS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>({ name: 'home' });
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const addListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
    handleNavigate({ name: 'detail', id: newListing.id });
  };

  const renderPage = () => {
    switch (currentPage.name) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'listings':
        return <ListingsPage onNavigate={handleNavigate} initialFilters={currentPage.filters} listings={listings} />;
      case 'detail':
        const listing = listings.find(l => l.id === currentPage.id);
        return listing ? <ListingDetailPage listing={listing} onNavigate={handleNavigate} /> : <HomePage onNavigate={handleNavigate} />;
      case 'create':
        return <CreateListingPage onAddListing={addListing} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col text-gray-800">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
   