import React, { useState } from 'react';
import { Page } from '../types';
import { requestPasswordReset } from '../services/authService';
import Spinner from '../components/Spinner';
import { EmailIcon } from '../components/Icons';

interface ForgotPasswordPageProps {
  onNavigate: (page: Page) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email adresa je obavezna.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
    } catch (err: any) {
      // In a real app, you might want to log this error but not show it to the user
      // to prevent email enumeration attacks. We show the success message regardless.
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        {isSubmitted ? (
          <div className="text-center">
            <EmailIcon className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              Proverite Vaš Email
            </h2>
            <p className="mt-2 text-gray-600">
              Ako nalog sa unetom email adresom postoji, poslali smo Vam uputstva za promenu lozinke.
            </p>
            <div className="mt-6">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate({ name: 'login' }); }}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Povratak na prijavu
              </a>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Zaboravili ste lozinku?
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Unesite Vašu email adresu i poslaćemo Vam link za resetovanje.
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email-address" className="sr-only">Email adresa</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors duration-150"
                  placeholder="Email adresa"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    'Pošalji link za resetovanje'
                  )}
                </button>
              </div>
            </form>
             <div className="text-center text-sm">
                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onNavigate({ name: 'login' }); }}
                    className="font-medium text-blue-600 hover:text-blue-500"
                >
                    Sećate se lozinke? Prijavite se
                </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;