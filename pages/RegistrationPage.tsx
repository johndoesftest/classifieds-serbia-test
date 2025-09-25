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
  
  const formInputClasses = "block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors duration-150";
  const formLabelClasses = "block text-sm font-medium leading-6 text-gray-900 mb-2";

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-lg space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Kreirajte novi nalog
          </h2>
        </div>
        <div className="bg-white p-8 shadow-xl rounded-2xl">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                 <div>
                    <label htmlFor="name" className={formLabelClasses}>Ime i prezime</label>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                    <div>
                        <label htmlFor="password" className={formLabelClasses}>Lozinka</label>
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
                    <div>
                        <label htmlFor="confirm-password" className={formLabelClasses}>Potvrdi lozinku</label>
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

              {error && (
                <div className="text-red-600 text-sm text-center pt-4">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    'Registruj se'
                  )}
                </button>
              </div>
            </form>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Već imate nalog?{' '}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate({ name: 'login' }); }}
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Prijavite se
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;