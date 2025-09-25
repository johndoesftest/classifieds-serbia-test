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
  
  const formInputClasses = "block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors duration-150";
  const formLabelClasses = "block text-sm font-medium leading-6 text-gray-900 mb-2";


  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Prijavite se na Vaš nalog
          </h2>
        </div>
        <div className="bg-white p-8 shadow-xl rounded-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email-address" className={formLabelClasses}>Email adresa</label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={formInputClasses}
                        placeholder="vas.email@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="password" className={formLabelClasses}>Lozinka</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={formInputClasses}
                        placeholder="Vaša lozinka"
                    />
                </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    'Prijavi se'
                  )}
                </button>
              </div>
            </form>
             <p className="mt-6 text-center text-sm text-gray-600">
              (Koristite: <span className="font-mono font-medium">marko@example.com</span> / <span className="font-mono font-medium">password123</span>)
            </p>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Nemate nalog?{' '}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate({ name: 'register' }); }}
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Registrujte se
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;