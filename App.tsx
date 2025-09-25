import React, { useState, useEffect } from 'react';
import { Page, User, Listing, FilterState } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import CreateListingPage from './pages/CreateListingPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import UserProfilePage from './pages/UserProfilePage';
import AboutUsPage from './pages/AboutUsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { getCurrentUser, logout } from './services/authService';
import { getAllListings, addNewListing as addListingToDB, deleteListing as deleteListingFromDB } from './data/listings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>({ name: 'home' });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    const allListings = getAllListings();
    setListings(allListings);
    setIsLoading(false);
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    const redirectPage = (currentPage as any).redirectPage || { name: 'home' };
    handleNavigate(redirectPage);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    handleNavigate({ name: 'home' });
  };
  
  const handleRegister = (user: User) => {
    setCurrentUser(user);
    const redirectPage = (currentPage as any).redirectPage || { name: 'home' };
    handleNavigate(redirectPage);
  };

  const handleUpdateUser = (user: User) => {
    setCurrentUser(user);
  };
  
  const handleAddListing = (newListing: Listing) => {
    addListingToDB(newListing);
    const allListings = getAllListings();
    setListings(allListings);
    handleNavigate({ name: 'detail', id: newListing.id });
  };

  const handleDeleteListing = (listingId: string) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj oglas?')) {
      deleteListingFromDB(listingId);
      const allListings = getAllListings();
      setListings(allListings);
    }
  };

  const renderPage = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    switch (currentPage.name) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} listings={listings} />;
      case 'listings':
        return <ListingsPage onNavigate={handleNavigate} listings={listings} initialFilters={currentPage.filters} />;
      case 'detail':
        const listing = listings.find(l => l.id === currentPage.id);
        return listing ? <ListingDetailPage listing={listing} onNavigate={handleNavigate} listings={listings} currentUser={currentUser} /> : <div>Oglas nije pronađen.</div>;
      case 'create':
         return <CreateListingPage onNavigate={handleNavigate} currentUser={currentUser} onAddListing={handleAddListing} onAuthSuccess={handleLogin} onUpdateUser={handleUpdateUser}/>;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'register':
        return <RegistrationPage onNavigate={handleNavigate} onRegister={handleRegister} />;
      case 'profile':
        return <UserProfilePage userId={currentPage.userId} currentUser={currentUser} listings={listings} onNavigate={handleNavigate} onUpdateUser={handleUpdateUser} onDeleteListing={handleDeleteListing} />;
      case 'about':
        return <AboutUsPage />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={handleNavigate} />;
      case 'reset-password':
        return <ResetPasswordPage onNavigate={handleNavigate} token={currentPage.token} />;
      default:
        return <HomePage onNavigate={handleNavigate} listings={listings} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        currentUser={currentUser}
        onLogout={handleLogout}
        listings={listings}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
