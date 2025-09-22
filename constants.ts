
import { Category, Listing } from './types';
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

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'VW Golf 7 2.0 TDI - Odlično stanje',
    description: 'Prodajem Golf 7, 2016. godište, u perfektnom stanju. Redovno servisiran u ovlašćenom servisu, poseduje servisnu knjižicu. Dva seta guma. Bez ulaganja.',
    price: 12500,
    currency: 'EUR',
    category: 'automobili',
    location: 'Beograd',
    condition: 'used',
    images: ['https://picsum.photos/seed/golf7/800/600', 'https://picsum.photos/seed/golf7interior/800/600', 'https://picsum.photos/seed/golf7back/800/600'],
    postedDate: '2024-07-20T10:00:00Z',
    seller: { name: 'Marko Petrović', avatar: 'https://i.pravatar.cc/150?u=marko' }
  },
  {
    id: '2',
    title: 'Stan na prodaju - Vračar, 55m²',
    description: 'Dvosoban stan na Vračaru, u blizini Kalenić pijace. Kompletno renoviran, svetao i prostran. Idealan za porodicu ili kao investicija. Uknjižen 1/1.',
    price: 165000,
    currency: 'EUR',
    category: 'nekretnine',
    location: 'Beograd',
    condition: 'used',
    images: ['https://picsum.photos/seed/stanvracar/800/600', 'https://picsum.photos/seed/stanvracarliving/800/600', 'https://picsum.photos/seed/stanvracarkitchen/800/600'],
    postedDate: '2024-07-19T14:30:00Z',
    seller: { name: 'Jelena Jovanović', avatar: 'https://i.pravatar.cc/150?u=jelena' }
  },
  {
    id: '3',
    title: 'Potreban Senior Frontend Developer',
    description: 'Tražimo iskusnog Frontend Developera za rad na inovativnim projektima. Potrebno odlično poznavanje React-a, TypeScript-a i modernih web tehnologija. Nudimo konkurentnu platu i odlične uslove.',
    price: 0,
    currency: 'EUR',
    category: 'poslovi',
    location: 'Novi Sad',
    condition: 'new',
    images: ['https://picsum.photos/seed/jobfrontend/800/600'],
    postedDate: '2024-07-21T09:00:00Z',
    seller: { name: 'IT Solutions d.o.o.', avatar: 'https://i.pravatar.cc/150?u=itsolutions' }
  },
    {
    id: '4',
    title: 'iPhone 14 Pro, 256GB, Space Black',
    description: 'Prodajem iPhone 14 Pro, 256GB memorije, u Space Black boji. Telefon je kao nov, bez ijedne ogrebotine. Battery health 95%. Originalna kutija i kabl. Garancija istekla.',
    price: 850,
    currency: 'EUR',
    category: 'elektronika',
    location: 'Niš',
    condition: 'used',
    images: ['https://picsum.photos/seed/iphone14pro/800/600', 'https://picsum.photos/seed/iphone14proback/800/600'],
    postedDate: '2024-07-22T11:00:00Z',
    seller: { name: 'Stefan Ilić', avatar: 'https://i.pravatar.cc/150?u=stefan' }
  },
  {
    id: '5',
    title: 'Krečenje i gletovanje - Povoljno',
    description: 'Profesionalne usluge krečenja, gletovanja i drugih molerskih radova. Čisto, brzo i pedantno. Dugogodišnje iskustvo. Besplatna procena radova.',
    price: 5,
    currency: 'EUR',
    category: 'usluge',
    location: 'Kragujevac',
    condition: 'new',
    images: ['https://picsum.photos/seed/krecenje/800/600'],
    postedDate: '2024-07-18T18:00:00Z',
    seller: { name: 'Majstor Pera', avatar: 'https://i.pravatar.cc/150?u=pera' }
  },
    {
    id: '6',
    title: 'Garnitura za dvorište - Ratan',
    description: 'Prodajem malo korišćenu garnituru od ratana. Sastoji se od dvoseda, dve fotelje i stočića. Jastuci idu uz garnituru. Idealno za terase i dvorišta.',
    price: 250,
    currency: 'EUR',
    category: 'kuca-i-basta',
    location: 'Subotica',
    condition: 'used',
    images: ['https://picsum.photos/seed/ratan/800/600', 'https://picsum.photos/seed/ratan2/800/600'],
    postedDate: '2024-07-21T15:20:00Z',
    seller: { name: 'Ana Kovač', avatar: 'https://i.pravatar.cc/150?u=ana' }
  }
];
   