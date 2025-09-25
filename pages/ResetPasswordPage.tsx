import React, { useState } from 'react';
import { Page } from '../types';
import { resetPassword } from '../services/authService';
import Spinner from '../components/Spinner';

interface ResetPasswordPageProps {
  token: string;
  onNavigate: (page: Page) => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ token, onNavigate }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Sva polja su obavezna.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Lozinke se ne podudaraju.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await resetPassword(token, newPassword);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        {isSuccess ? (
          <div className="text-center">
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              Lozinka uspešno promenjena!
            </h2>
            <p className="mt-2 text-gray-600">
              Sada se možete prijaviti sa Vašom novom lozinkom.
            </p>
            <div className="mt-6">
              <button
                onClick={() => onNavigate({ name: 'login' })}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Idi na prijavu
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Postavite novu lozinku
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="relative -space-y-px rounded-lg">
                <div>
                  <label htmlFor="new-password" className="sr-only">Nova lozinka</label>
                  <input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="relative block w-full appearance-none rounded-none rounded-t-lg border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors duration-150"
                    placeholder="Nova lozinka"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">Potvrdite novu lozinku</label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="relative block w-full appearance-none rounded-none rounded-b-lg border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors duration-150"
                    placeholder="Potvrdite novu lozinku"
                  />
                </div>
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
                  {isLoading ? <Spinner size="sm" /> : 'Promeni lozinku'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;