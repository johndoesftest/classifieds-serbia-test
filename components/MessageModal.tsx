import React, { useState, useEffect } from 'react';
import { Listing, User, Page } from '../types';
import { addMessage } from '../data/messages';
import { login, register } from '../services/authService';
import { XIcon, EmailIcon, CheckIcon } from './Icons';
import Spinner from './Spinner';
import { PLACEHOLDER_LISTING_IMAGE_URL } from '../constants';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
  currentUser: User | null;
  onNavigate: (page: Page) => void;
  onAuthSuccess: (user: User) => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, listing, currentUser, onNavigate, onAuthSuccess }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  // Auth state for guest users
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');


  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setIsSent(false);
      setMessage('');
      setIsLoading(false);
      setAuthError('');
      setAuthName('');
      setAuthEmail('');
      setAuthPassword('');
      setAuthConfirmPassword('');
      setAuthMode('register');
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setAuthError('Poruka ne može biti prazna.');
      return;
    }
    
    setIsLoading(true);
    setAuthError('');

    try {
      let userToSendMessage = currentUser;

      // If user is not logged in, perform authentication first
      if (!userToSendMessage) {
        if (authMode === 'register') {
          if (!authName || !authEmail || !authPassword) {
            throw new Error('Sva polja za registraciju su obavezna.');
          }
          if (authPassword !== authConfirmPassword) {
            throw new Error('Lozinke se ne podudaraju.');
          }
          userToSendMessage = await register(authName, authEmail, authPassword);
        } else { // authMode is 'login'
          if (!authEmail || !authPassword) {
            throw new Error('Email i lozinka su obavezni za prijavu.');
          }
          userToSendMessage = await login(authEmail, authPassword);
        }
        onAuthSuccess(userToSendMessage); // Update app state with the new user
      }
      
      // Now, send the message
      await addMessage(listing.id, message, userToSendMessage.id, listing.seller.id);
      setIsSent(true);
      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (error: any) {
      setAuthError(error.message || 'Došlo je do greške.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const formInputClasses = "block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-sm text-gray-800 placeholder:text-gray-400 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors";

  const renderContent = () => {
    if (isSent) {
      return (
        <div className="text-center py-12 px-6">
          <CheckIcon className="mx-auto h-16 w-16 text-green-500 bg-green-100 rounded-full p-3" />
          <h3 className="text-2xl font-bold text-gray-800 mt-6">Poruka poslata!</h3>
          <p className="text-gray-600 mt-2">Prodavac je obavešten. Odgovor možete očekivati uskoro.</p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="p-8">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Pošaljite poruku prodavcu
            </h3>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center gap-x-4 border border-gray-200">
                <img src={listing.images[0] || PLACEHOLDER_LISTING_IMAGE_URL} alt={listing.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                <div>
                    <p className="text-sm text-gray-500">Oglas:</p>
                    <p className="font-semibold text-gray-800 leading-tight">{listing.title}</p>
                </div>
            </div>
            <div className="mt-6">
                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Vaša poruka</label>
                 <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors"
                    placeholder={`Pozdrav, zainteresovan sam za oglas "${listing.title}"...`}
                 />
            </div>
        </div>
        
        {currentUser ? (
          <div className="bg-gray-50 px-8 py-4 flex justify-end border-t">
              <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-blue-600 py-3 px-6 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-wait"
              >
                  {isLoading ? <Spinner size="sm" /> : <EmailIcon className="h-5 w-5"/>}
                  <span>{isLoading ? 'Slanje...' : 'Pošalji poruku'}</span>
              </button>
          </div>
        ) : (
          <div className="bg-gray-100 px-8 py-6 border-t border-gray-200">
              <div className="flex justify-center border border-gray-200 rounded-lg p-1 bg-white mb-6">
                  <button type="button" onClick={() => { setAuthMode('register'); setAuthError(''); }} className={`w-1/2 py-1.5 text-sm font-semibold rounded-md transition-all ${authMode === 'register' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}>Registracija</button>
                  <button type="button" onClick={() => { setAuthMode('login'); setAuthError(''); }} className={`w-1/2 py-1.5 text-sm font-semibold rounded-md transition-all ${authMode === 'login' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}>Prijava</button>
              </div>
              
              <div className="space-y-4">
                  {authMode === 'register' && (
                      <input type="text" value={authName} onChange={e => setAuthName(e.target.value)} placeholder="Ime i prezime" required={authMode === 'register'} className={formInputClasses} />
                  )}
                  <input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="Email" required className={formInputClasses} autoComplete="email"/>
                  <input type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} placeholder="Lozinka" required className={formInputClasses} autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}/>
                  {authMode === 'register' && (
                      <input type="password" value={authConfirmPassword} onChange={e => setAuthConfirmPassword(e.target.value)} placeholder="Potvrdi lozinku" required={authMode === 'register'} className={formInputClasses} autoComplete="new-password"/>
                  )}
              </div>

              {authError && <p className="text-red-600 text-sm text-center mt-4 bg-red-50 p-2 rounded-md">{authError}</p>}

              <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 w-full inline-flex items-center justify-center gap-x-2 rounded-lg bg-blue-600 py-3 px-6 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-wait"
              >
                  {isLoading && <Spinner size="sm" />}
                  <span>{authMode === 'register' ? 'Pošalji poruku i registruj se' : 'Pošalji poruku i prijavi se'}</span>
              </button>
          </div>
        )}
      </form>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
            aria-label="Zatvori modal"
        >
            <XIcon className="h-6 w-6" />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default MessageModal;