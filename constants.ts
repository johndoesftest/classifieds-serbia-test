import { Category } from './types';
import { CarIcon, RealEstateIcon, JobIcon, ServiceIcon, ElectronicsIcon, HomeIcon } from './components/Icons';

export const CATEGORIES: Category[] = [
  { id: 'automobili', name: 'Automobili', icon: CarIcon },
  { id: 'nekretnine', name: 'Nekretnine', icon: RealEstateIcon },
  { id: 'poslovi', name: 'Poslovi', icon: JobIcon },
  { id: 'usluge', name: 'Usluge', icon: ServiceIcon },
  { id: 'elektronika', name: 'Elektronika', icon: ElectronicsIcon },
  { id: 'kuca-i-basta', name: 'Kuća i Bašta', icon: HomeIcon },
];

export const LOCATIONS: string[] = [
  'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica', 'Zrenjanin', 'Pančevo', 'Čačak', 'Kraljevo', 'Novi Pazar', 'Smederevo', 'Valjevo', 'Šabac', 'Užice'
];
