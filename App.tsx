import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import CreateListingPage from './pages/CreateListingPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UserProfilePage from './pages/UserProfilePage';
import { Page, Listing, User } from './types';
import { getCurrentUser, logout } from './services/authService';
import { getAllListings, addNewListing, deleteListing } from './data/listings';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>({ name: 'home' });
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());

  // Simulate initial data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(getAllListings());
      setIsLoading(false);
    }, 1500); // Simulate a 1.5s network request

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const addListing = (newListing: Listing) => {
    addNewListing(newListing); // Persist listing
    setListings(prev => [newListing, ...prev]); // Update UI state
    handleNavigate({ name: 'detail', id: newListing.id });
  };

  const handleDeleteListing = (listingId: string) => {
    deleteListing(listingId); // Persist deletion
    setListings(prev => prev.filter(l => l.id !== listingId)); // Update UI state
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    // Fix: Explicitly type `redirectPage` to resolve TypeScript inference issue.
    const redirectPage: Page = (currentPage.name === 'login' && currentPage.redirectPage) ? currentPage.redirectPage : { name: 'home' };
    handleNavigate(redirectPage);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    handleNavigate({ name: 'home' });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };


  const renderPage = () => {
    switch (currentPage.name) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} listings={listings} />;
      case 'listings':
        return <ListingsPage onNavigate={handleNavigate} initialFilters={currentPage.filters} listings={listings} />;
      case 'detail':
        const listing = listings.find(l => l.id === currentPage.id);
        return listing ? <ListingDetailPage listing={listing} onNavigate={handleNavigate} listings={listings} /> : <HomePage onNavigate={handleNavigate} listings={listings} />;
      case 'create':
        return <CreateListingPage onAddListing={addListing} currentUser={currentUser} onAuthSuccess={handleLogin} />;
      case 'about':
        return <AboutUsPage />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'register':
        return <RegistrationPage onRegister={handleLogin} onNavigate={handleNavigate} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={handleNavigate} />;
      case 'reset-password':
        // A mock way to simulate navigation. In a real app, you'd get the token from the URL.
        // For testing, you can manually navigate by setting the state in dev tools or creating a temporary link.
        console.log(`Navigating to Reset Password with token: ${currentPage.token}`);
        return <ResetPasswordPage token={currentPage.token} onNavigate={handleNavigate} />;
      case 'profile':
        return <UserProfilePage userId={currentPage.userId} listings={listings} onNavigate={handleNavigate} currentUser={currentUser} onUpdateUser={handleUpdateUser} onDeleteListing={handleDeleteListing} />;
      default:
        return <HomePage onNavigate={handleNavigate} listings={listings} />;
    }
  };

  // Show a full-page spinner while initial data is loading
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center text-gray-800">
        <Spinner size="lg" />
        <p className="mt-4 text-lg text-gray-600">Učitavanje oglasa...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col text-gray-800">
      <Header onNavigate={handleNavigate} currentPage={currentPage} currentUser={currentUser} onLogout={handleLogout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;