import React, { useState, useEffect } from 'react';
import { Page, User, Listing } from './types';
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
import FavoritesPage from './pages/FavoritesPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { getCurrentUser, logout } from './services/authService';
import { getAllListings, addNewListing as addListingToDB, deleteListing as deleteListingFromDB } from './data/listings';
import * as favoritesService from './services/favoritesService';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>({ name: 'home' });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    const allListings = getAllListings();
    setListings(allListings);
    setFavorites(favoritesService.getFavorites(user?.id));
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    // Update favorites when user logs in or out
    setFavorites(favoritesService.getFavorites(currentUser?.id));
  }, [currentUser]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (user: User) => {
    favoritesService.mergeGuestFavorites(user.id);
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
    favoritesService.mergeGuestFavorites(user.id);
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

  const handleToggleFavorite = (listingId: string) => {
    const newFavorites = favoritesService.toggleFavorite(listingId, currentUser?.id);
    setFavorites(newFavorites);
  };

  const renderPage = () => {
    switch (currentPage.name) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} listings={listings} favorites={favorites} onToggleFavorite={handleToggleFavorite} currentUser={currentUser} onDeleteListing={handleDeleteListing} isLoading={isLoading} />;
      case 'listings':
        return <ListingsPage onNavigate={handleNavigate} listings={listings} initialFilters={currentPage.filters} favorites={favorites} onToggleFavorite={handleToggleFavorite} currentUser={currentUser} onDeleteListing={handleDeleteListing} />;
      case 'detail':
        const listing = listings.find(l => l.id === currentPage.id);
        return listing ? <ListingDetailPage listing={listing} onNavigate={handleNavigate} listings={listings} currentUser={currentUser} favorites={favorites} onToggleFavorite={handleToggleFavorite} onDeleteListing={handleDeleteListing} /> : <div>Oglas nije pronađen.</div>;
      case 'create':
         return <CreateListingPage onNavigate={handleNavigate} currentUser={currentUser} onAddListing={handleAddListing} onAuthSuccess={handleLogin} onUpdateUser={handleUpdateUser}/>;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'register':
        return <RegistrationPage onNavigate={handleNavigate} onRegister={handleRegister} />;
      case 'profile':
        return <UserProfilePage userId={currentPage.userId} currentUser={currentUser} listings={listings} onNavigate={handleNavigate} onUpdateUser={handleUpdateUser} onDeleteListing={handleDeleteListing} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      case 'about':
        return <AboutUsPage />;
      case 'favorites':
        const favoriteListings = listings.filter(l => favorites.includes(l.id));
        return <FavoritesPage listings={favoriteListings} onNavigate={handleNavigate} onToggleFavorite={handleToggleFavorite} favorites={favorites} currentUser={currentUser} onDeleteListing={handleDeleteListing} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={handleNavigate} />;
      case 'reset-password':
        return <ResetPasswordPage onNavigate={handleNavigate} token={currentPage.token} />;
      default:
        return <HomePage onNavigate={handleNavigate} listings={listings} favorites={favorites} onToggleFavorite={handleToggleFavorite} currentUser={currentUser} onDeleteListing={handleDeleteListing} isLoading={isLoading} />;
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
        favorites={favorites}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;