import React, { useState } from 'react';
import { User, Page } from '../types';
import { login } from '../services/authService';
import Spinner from '../components/Spinner';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigate: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email i lozinka su obavezni.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const user = await login(email, password, rememberMe);
      onLogin(user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Prijavite se na Vaš nalog
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
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
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email adresa"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Lozinka</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Lozinka"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Zapamti me
              </label>
            </div>

            <div className="text-sm">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate({ name: 'forgot-password' }); }}
                className="font-medium text-blue-600 hover:text-blue-500">
                Zaboravili ste lozinku?
              </a>
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
              {isLoading ? (
                <Spinner size="sm" />
              ) : (
                'Prijavi se'
              )}
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          (Koristite: <span className="font-mono font-medium">marko@example.com</span> / <span className="font-mono font-medium">password123</span>)
        </p>
        <div className="text-center text-sm">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate({ name: 'register' }); }}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Nemate nalog? Registrujte se
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;