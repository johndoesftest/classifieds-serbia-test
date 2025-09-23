import { Listing, User } from '../types';
import { findUserById } from './users';

const LISTINGS_DB_KEY = 'oglasisrbija_listings_db';

// Helper function to get a random user for a listing
const getRandomUser = (): User => {
    // This is a bit of a hack since we don't want data/listings to depend on the full user list.
    // In a real app, this would be handled differently. We'll use a few known IDs.
    const userIds = ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-41'];
    const randomId = userIds[Math.floor(Math.random() * userIds.length)];
    const user = findUserById(randomId);
    if (!user) {
        // Fallback to user-1 if something goes wrong
        return findUserById('user-1')!;
    }
    return user;
};

const INITIAL_MOCK_LISTINGS: Listing[] = [
    {
        id: 'listing-1',
        title: 'Volkswagen Golf 7 2.0 TDI',
        description: 'Odlično očuvan Golf 7, redovno servisiran u ovlašćenom servisu. Uvezen iz Nemačke. Bez ulaganja. Uz auto idu i zimske gume.',
        price: 12500,
        currency: 'EUR',
        category: 'automobili',
        condition: 'used',
        location: 'Beograd',
        images: ['https://picsum.photos/seed/golf7/800/600', 'https://picsum.photos/seed/golf7-2/800/600'],
        seller: findUserById('user-1')!,
        postedDate: new Date('2023-10-26T10:00:00Z').toISOString(),
        specifics: { 
            brand: 'Volkswagen',
            model: 'Golf 7',
            year: 2017, 
            mileage: 155000, 
            bodyType: 'Hečbek',
            fuelType: 'Dizel', 
            displacement: 1968,
            enginePower: 110,
            transmission: 'Manuelni',
            drivetrain: 'Prednji',
            registeredUntil: '07/2024'
        },
    },
    {
        id: 'listing-2',
        title: 'Dvosoban stan na Vračaru',
        description: 'Prodaje se renoviran dvosoban stan na odličnoj lokaciji na Vračaru. Uknjižen, 55m2, svetao, sa terasom. Blizina Kalenić pijace.',
        price: 150000,
        currency: 'EUR',
        category: 'nekretnine',
        condition: 'used',
        location: 'Beograd',
        images: ['https://picsum.photos/seed/stan1/800/600', 'https://picsum.photos/seed/stan2/800/600', 'https://picsum.photos/seed/stan3/800/600'],
        seller: findUserById('user-2')!,
        postedDate: new Date('2023-10-25T14:30:00Z').toISOString(),
        specifics: { area: 55, rooms: '2', propertyType: 'Stan', heating: 'Centralno' },
    },
    {
        id: 'listing-3',
        title: 'Potreban Frontend Developer (React)',
        description: 'Tražimo iskusnog React developera da se pridruži našem timu. Rad na zanimljivim internacionalnim projektima. Mogućnost remote rada.',
        price: 0, // No price for jobs
        currency: 'EUR',
        category: 'poslovi',
        condition: 'new',
        location: 'Novi Sad',
        images: ['https://picsum.photos/seed/job/800/600'],
        seller: findUserById('user-3')!,
        postedDate: new Date('2023-10-24T09:00:00Z').toISOString(),
        specifics: { jobType: 'Puno radno vreme', experience: '3-5 godina' },
    },
    {
        id: 'listing-4',
        title: 'iPhone 13 Pro, 128GB, Sierra Blue',
        description: 'Prodajem iPhone 13 Pro, kao nov, bez ijedne ogrebotine. Baterija na 95%. Originalna kutija i kabl. Garancija istekla.',
        price: 750,
        currency: 'EUR',
        category: 'roba-i-proizvodi', // Updated category
        condition: 'used',
        location: 'Niš',
        images: ['https://picsum.photos/seed/iphone13/800/600', 'https://picsum.photos/seed/iphone13-2/800/600'],
        seller: findUserById('user-4')!,
        postedDate: new Date('2023-10-26T12:15:00Z').toISOString(),
        specifics: { brand: 'Apple' },
    },
    {
        id: 'listing-5',
        title: 'Krečenje i gletovanje',
        description: 'Profesionalne usluge krečenja, gletovanja i drugih završnih radova u građevinarstvu. Brzo, čisto i povoljno. Višegodišnje iskustvo.',
        price: 0, // Price by agreement
        currency: 'EUR',
        category: 'usluge',
        condition: 'new',
        location: 'Kragujevac',
        images: ['https://picsum.photos/seed/krecenje/800/600'],
        seller: findUserById('user-5')!,
        postedDate: new Date('2023-10-23T18:00:00Z').toISOString(),
    },
    {
        id: 'listing-6',
        title: 'Garnitura za sedenje',
        description: 'Moderna i udobna garnitura, trosed i dvosed. Malo korišćena, bez oštećenja. Prodaje se zbog selidbe. Materijal štof, tamno siva boja.',
        price: 35000,
        currency: 'RSD',
        category: 'roba-i-proizvodi', // Updated category
        condition: 'used',
        location: 'Subotica',
        images: ['https://picsum.photos/seed/garnitura/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2023-10-22T11:00:00Z').toISOString(),
    },
    {
        id: 'listing-7',
        title: 'Audi A4 2.0 TDI S-Line',
        description: 'Audi A4 u S-Line opremi. Automatski menjač, virtuelni kokpit, sportska sedišta. Garažiran. Urađen veliki servis.',
        price: 21000,
        currency: 'EUR',
        category: 'automobili',
        condition: 'used',
        location: 'Novi Sad',
        images: ['https://picsum.photos/seed/audia4/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2023-10-26T18:30:00Z').toISOString(),
        specifics: { 
            brand: 'Audi',
            model: 'A4',
            year: 2018, 
            mileage: 110000, 
            bodyType: 'Limuzina',
            fuelType: 'Dizel', 
            displacement: 1968,
            enginePower: 140,
            transmission: 'Automatski',
            drivetrain: 'Prednji',
            registeredUntil: '11/2023'
        },
    },
    {
        id: 'listing-8',
        title: 'Garsonjera na prodaju, Grbavica',
        description: 'Odlična prilika za investiciju. Garsonjera od 28m2 na najtraženijoj lokaciji u Novom Sadu. Idealna za izdavanje. Kompletno opremljena.',
        price: 70000,
        currency: 'EUR',
        category: 'nekretnine',
        condition: 'used',
        location: 'Novi Sad',
        images: ['https://picsum.photos/seed/garsonjera/800/600'],
        seller: findUserById('user-41')!,
        postedDate: new Date().toISOString(), // Newest listing
        specifics: { area: 28, rooms: '1', propertyType: 'Stan', heating: 'Centralno' },
    },
    {
        id: 'listing-9',
        title: 'Štenci Zlatnog Retrivera',
        description: 'Prelepi štenci Zlatnog Retrivera, oštenjeni 15.08.2023. Očišćeni od parazita, vakcinisani i spremni za novi dom. Od izložbenih roditelja.',
        price: 300,
        currency: 'EUR',
        category: 'kucni-ljubimci',
        condition: 'new',
        location: 'Kraljevo',
        images: ['https://picsum.photos/seed/retriver/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2023-10-27T08:00:00Z').toISOString(),
        specifics: { species: 'Pas', breed: 'Zlatni Retriver', gender: 'Mužjak', age: '3 meseca', vaccinated: 'Da', chipped: 'Da' },
    }
];

// In-memory cache
let listingsCache: Listing[] = [];

const getAllListingsFromStorage = (): Listing[] => {
    if (listingsCache.length > 0) {
        return listingsCache;
    }
    try {
        const listingsJson = localStorage.getItem(LISTINGS_DB_KEY);
        const listings = listingsJson ? (JSON.parse(listingsJson) as Listing[]) : [];
        listingsCache = listings;
        return listings;
    } catch (error) {
        console.error("Failed to parse listings from storage", error);
        return [];
    }
};

const saveAllListings = (listings: Listing[]): void => {
    localStorage.setItem(LISTINGS_DB_KEY, JSON.stringify(listings));
    listingsCache = listings; // Update cache
};

const initializeListingsDatabase = (): void => {
    const storedListings = localStorage.getItem(LISTINGS_DB_KEY);
    if (!storedListings) {
        saveAllListings(INITIAL_MOCK_LISTINGS);
    } else {
        getAllListingsFromStorage();
    }
};

// --- Exported Functions ---

export const getAllListings = (): Listing[] => {
    return getAllListingsFromStorage();
};

export const addNewListing = (newListing: Listing): Listing => {
    const allListings = getAllListingsFromStorage();
    const updatedListings = [newListing, ...allListings];
    saveAllListings(updatedListings);
    return newListing;
};

export const deleteListing = (listingId: string): void => {
    const allListings = getAllListingsFromStorage();
    const updatedListings = allListings.filter(l => l.id !== listingId);
    saveAllListings(updatedListings);
};


// Initialize DB on module load
initializeListingsDatabase();
