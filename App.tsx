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
import { Page, Listing, User } from './types';
import { MOCK_LISTINGS } from './constants';
import { getCurrentUser, logout } from './services/authService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>({ name: 'home' });
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());

  const handleNavigate = (page: Page) => {
    // Protected route for creating a listing
    if (page.name === 'create' && !currentUser) {
      setCurrentPage({ name: 'login', redirectPage: page });
      window.scrollTo(0, 0);
      return;
    }

    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const addListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
    handleNavigate({ name: 'detail', id: newListing.id });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    const redirectPage = (currentPage.name === 'login' && currentPage.redirectPage) ? currentPage.redirectPage : { name: 'home' };
    handleNavigate(redirectPage);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    handleNavigate({ name: 'home' });
  };


  const renderPage = () => {
    switch (currentPage.name) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'listings':
        return <ListingsPage onNavigate={handleNavigate} initialFilters={currentPage.filters} listings={listings} />;
      case 'detail':
        const listing = listings.find(l => l.id === currentPage.id);
        return listing ? <ListingDetailPage listing={listing} onNavigate={handleNavigate} listings={listings} /> : <HomePage onNavigate={handleNavigate} />;
      case 'create':
        return currentUser ? <CreateListingPage onAddListing={addListing} currentUser={currentUser} /> : <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
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
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

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