import { Category } from './types';
import { CarIcon, RealEstateIcon, JobIcon, ServiceIcon, PackageIcon, PawPrintIcon } from './components/Icons';

export const CATEGORIES: Category[] = [
  { id: 'automobili', name: 'Automobili', icon: CarIcon },
  { id: 'nekretnine', name: 'Nekretnine', icon: RealEstateIcon },
  { id: 'poslovi', name: 'Poslovi', icon: JobIcon },
  { id: 'usluge', name: 'Usluge', icon: ServiceIcon },
  { id: 'roba-i-proizvodi', name: 'Roba i Proizvodi', icon: PackageIcon },
  { id: 'kucni-ljubimci', name: 'Kućni Ljubimci', icon: PawPrintIcon },
];

export const LOCATIONS: string[] = [
  'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica', 'Zrenjanin', 'Pančevo', 'Čačak', 'Kraljevo', 'Novi Pazar', 'Smederevo', 'Valjevo', 'Šabac', 'Užice'
];

export const PLACEHOLDER_LISTING_IMAGE_URL = 'https://via.placeholder.com/800x600/e2e8f0/64748b?text=Slika+nije+dostupna';
export const PLACEHOLDER_AVATAR_URL = 'https://via.placeholder.com/150/e2e8f0/64748b?text=Korisnik';