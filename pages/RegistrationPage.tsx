import React, { useState } from 'react';
import { User, Page } from '../types';
import { register } from '../services/authService';
import Spinner from '../components/Spinner';

interface RegistrationPageProps {
  onRegister: (user: User) => void;
  onNavigate: (page: Page) => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onRegister, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Sva polja su obavezna.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Lozinke se ne podudaraju.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const newUser = await register(name, email, password);
      onRegister(newUser);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formInputClasses = "block w-full rounded-md border-gray-300 py-3 px-4 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm";
  const formLabelClasses = "block text-sm font-medium leading-6 text-gray-900";

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Kreirajte novi nalog
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <div>
                    <label htmlFor="name" className={formLabelClasses}>Ime i prezime</label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={formInputClasses}
                            placeholder="Pera Perić"
                        />
                    </div>
                </div>
                 <div>
                    <label htmlFor="email-address" className={formLabelClasses}>Email adresa</label>
                    <div className="mt-2">
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
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <div>
                    <label htmlFor="password" className={formLabelClasses}>Lozinka</label>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={formInputClasses}
                            placeholder="Vaša lozinka"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="confirm-password" className={formLabelClasses}>Potvrdi lozinku</label>
                    <div className="mt-2">
                        <input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={formInputClasses}
                            placeholder="Ponovite lozinku"
                        />
                    </div>
                </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center pt-4">
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Spinner size="sm" />
              ) : (
                'Registruj se'
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
            Već imate nalog? Prijavite se
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;