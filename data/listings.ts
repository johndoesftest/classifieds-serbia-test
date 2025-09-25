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
        priceType: 'fixed',
        currency: 'EUR',
        category: 'automobili',
        condition: 'used',
        location: 'Beograd',
        images: ['https://picsum.photos/seed/golf7/800/600', 'https://picsum.photos/seed/golf7-2/800/600'],
        seller: findUserById('user-1')!,
        postedDate: new Date('2024-05-26T10:00:00Z').toISOString(),
        specifics: { brand: 'Volkswagen', model: 'Golf 7', year: 2017, mileage: 155000, bodyType: 'Hečbek', fuelType: 'Dizel', displacement: 1968, enginePower: 110, transmission: 'Manuelni', drivetrain: 'Prednji', emissionsClass: 'Euro 6', registeredUntil: '07/2024'},
    },
    {
        id: 'listing-2',
        title: 'Dvosoban stan na Vračaru',
        description: 'Prodaje se renoviran dvosoban stan na odličnoj lokaciji na Vračaru. Uknjižen, 55m2, svetao, sa terasom. Blizina Kalenić pijace.',
        price: 150000,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'nekretnine',
        condition: 'used',
        location: 'Beograd',
        images: ['https://picsum.photos/seed/stan1/800/600', 'https://picsum.photos/seed/stan2/800/600', 'https://picsum.photos/seed/stan3/800/600'],
        seller: findUserById('user-2')!,
        postedDate: new Date('2024-05-25T14:30:00Z').toISOString(),
        specifics: { area: 55, rooms: '2', propertyType: 'Stan', heating: 'Centralno', floor: '4/6', furnished: 'Polunamešten', availableFrom: 'Odmah', address: 'Krunska 52, Kalenić, Vračar' },
    },
    {
        id: 'listing-3',
        title: 'Potreban Frontend Developer (React)',
        description: 'Tražimo iskusnog React developera da se pridruži našem timu. Rad na zanimljivim internacionalnim projektima. Mogućnost remote rada.',
        price: 2000,
        priceType: 'salary_monthly',
        currency: 'EUR',
        category: 'poslovi',
        condition: undefined,
        location: undefined,
        images: ['https://picsum.photos/seed/job/800/600'],
        seller: findUserById('user-3')!,
        postedDate: new Date('2024-05-24T09:00:00Z').toISOString(),
        specifics: { 
            jobType: 'Puno radno vreme', 
            experience: '3-5 godina',
            companyName: 'Tech Solutions Inc.',
            educationLevel: 'Fakultet',
            requiredSkills: 'React, TypeScript, Node.js',
            workLocationType: 'Rad od kuće (Remote)',
            contractType: 'Neodređeno',
            applicationDeadline: '15.07.2024.',
            contactPerson: 'Jelena Jovanović'
        },
    },
    {
        id: 'listing-4',
        title: 'iPhone 13 Pro, 128GB, Sierra Blue',
        description: 'Prodajem iPhone 13 Pro, kao nov, bez ijedne ogrebotine. Baterija na 95%. Originalna kutija i kabl. Garancija istekla.',
        price: 750,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'roba-i-proizvodi',
        condition: 'used',
        location: 'Niš',
        images: ['https://picsum.photos/seed/iphone13/800/600', 'https://picsum.photos/seed/iphone13-2/800/600'],
        seller: findUserById('user-4')!,
        postedDate: new Date('2024-05-26T12:15:00Z').toISOString(),
        specifics: { brand: 'Apple' },
    },
    {
        id: 'listing-5',
        title: 'Krečenje i gletovanje',
        description: 'Profesionalne usluge krečenja, gletovanja i drugih završnih radova u građevinarstvu. Brzo, čisto i povoljno. Višegodišnje iskustvo.',
        price: 15,
        priceType: 'per_hour',
        currency: 'EUR',
        category: 'usluge',
        condition: undefined,
        location: 'Kragujevac',
        images: ['https://picsum.photos/seed/krecenje/800/600'],
        seller: findUserById('user-5')!,
        postedDate: new Date('2024-05-23T18:00:00Z').toISOString(),
        specifics: {
            companyName: 'Molerski Radovi Petrović',
            address: 'Kneza Miloša 15',
            availability: 'Po dogovoru',
            experienceYears: 15,
            serviceArea: 'Kragujevac i okolina',
            paymentMethods: 'Gotovina, Plaćanje preko računa',
            portfolioUrl: ''
        }
    },
    {
        id: 'listing-6',
        title: 'Garnitura za sedenje',
        description: 'Moderna i udobna garnitura, trosed i dvosed. Malo korišćena, bez oštećenja. Prodaje se zbog selidbe. Materijal štof, tamno siva boja.',
        price: 35000,
        priceType: 'fixed',
        currency: 'RSD',
        category: 'roba-i-proizvodi',
        condition: 'used',
        location: 'Subotica',
        images: ['https://picsum.photos/seed/garnitura/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-22T11:00:00Z').toISOString(),
    },
    {
        id: 'listing-7',
        title: 'Audi A4 2.0 TDI S-Line',
        description: 'Audi A4 u S-Line opremi. Automatski menjač, virtuelni kokpit, sportska sedišta. Garažiran. Urađen veliki servis.',
        price: 21000,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'automobili',
        condition: 'used',
        location: 'Novi Sad',
        images: ['https://picsum.photos/seed/audia4/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-26T18:30:00Z').toISOString(),
        specifics: { brand: 'Audi', model: 'A4', year: 2018, mileage: 110000, bodyType: 'Limuzina', fuelType: 'Dizel', displacement: 1968, enginePower: 140, transmission: 'Automatski', drivetrain: 'Prednji', emissionsClass: 'Euro 6', registeredUntil: '11/2024'},
    },
    {
        id: 'listing-8',
        title: 'Garsonjera na prodaju, Grbavica',
        description: 'Odlična prilika za investiciju. Garsonjera od 28m2 na najtraženijoj lokaciji u Novom Sadu. Idealna za izdavanje. Kompletno opremljena.',
        price: 70000,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'nekretnine',
        condition: 'new_build',
        location: 'Novi Sad',
        images: ['https://picsum.photos/seed/garsonjera/800/600'],
        seller: findUserById('user-41')!,
        postedDate: new Date().toISOString(), // Newest listing
        specifics: { area: 28, rooms: '1', propertyType: 'Stan', heating: 'Centralno', floor: '3/5', furnished: 'Namešten', deposit: 'U visini jedne kirije', address: 'Braće Ribnikar 10, Grbavica' },
    },
    {
        id: 'listing-9',
        title: 'Štenci Zlatnog Retrivera',
        description: 'Prelepi štenci Zlatnog Retrivera, oštenjeni 15.08.2023. Očišćeni od parazita, vakcinisani i spremni za novi dom. Od izložbenih roditelja.',
        price: 300,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'kucni-ljubimci',
        condition: undefined,
        location: 'Kraljevo',
        images: ['https://picsum.photos/seed/retriver/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-27T08:00:00Z').toISOString(),
        specifics: { species: 'Pas', breed: 'Zlatni Retriver', gender: 'Mužjak', age: '3 meseca', vaccinated: 'Da', chipped: 'Da' },
    },
    // Adding more listings
    {
        id: 'listing-10',
        title: 'BMW Serija 3 320d',
        description: 'Odličan BMW 320d, M paket opreme. Automobil je u perfektnom stanju, bez ikakvih oštećenja. Redovno održavan, servisna knjiga. Moguća svaka provera.',
        price: 18500,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'automobili',
        condition: 'used',
        location: 'Beograd',
        images: ['https://picsum.photos/seed/bmw3/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-27T11:00:00Z').toISOString(),
        specifics: { brand: 'BMW', model: 'Serija 3', year: 2017, mileage: 130000, bodyType: 'Limuzina', fuelType: 'Dizel', enginePower: 140, transmission: 'Automatski', emissionsClass: 'Euro 6'},
    },
    {
        id: 'listing-11',
        title: 'Kuća sa placem, okolina Čačka',
        description: 'Prodaje se kuća od 120m2 na placu od 10 ari. Mirna lokacija, idealno za porodicu. Kuća je uknjižena i odmah useljiva.',
        price: 65000,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'nekretnine',
        condition: 'used',
        location: 'Čačak',
        images: ['https://picsum.photos/seed/kucacacak/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-26T09:20:00Z').toISOString(),
        specifics: { area: 120, rooms: '4', propertyType: 'Kuća', heating: 'Etažno', floor: 'Prizemlje + sprat', address: 'Glavna 123, Ljubić' },
    },
    {
        id: 'listing-12',
        title: 'Škoda Octavia 1.6 TDI',
        description: 'Škoda Octavia u odličnom stanju. Veoma mali potrošač. Kupljena nova u Srbiji. Prvi vlasnik. Dva seta guma.',
        price: 9800,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'automobili',
        condition: 'used',
        location: 'Kragujevac',
        images: ['https://picsum.photos/seed/skoda/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-25T20:00:00Z').toISOString(),
        specifics: { brand: 'Skoda', model: 'Octavia', year: 2016, mileage: 180000, bodyType: 'Karavan', fuelType: 'Dizel', emissionsClass: 'Euro 6'},
    },
    {
        id: 'listing-13',
        title: 'Trosoban stan, Liman 3, Novi Sad',
        description: 'Komforan trosoban stan na odličnoj lokaciji. Dve spavaće sobe, prostran dnevni boravak, odvojena kuhinja. Potrebno renoviranje.',
        price: 110000,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'nekretnine',
        condition: 'renovation_needed',
        location: 'Novi Sad',
        images: ['https://picsum.photos/seed/stannovisad/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-24T15:00:00Z').toISOString(),
        specifics: { area: 75, rooms: '3', propertyType: 'Stan', floor: '7/10', address: 'Narodnog fronta 50, Liman 3' },
    },
    {
        id: 'listing-14',
        title: 'Persijska mačka - mačići',
        description: 'Dostupni preslatki persijski mačići. Naviknuti na posip i život u stanu. Spremni za preuzimanje.',
        price: 250,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'kucni-ljubimci',
        condition: undefined,
        location: 'Beograd',
        images: ['https://picsum.photos/seed/persiancat/800/600'],
        seller: findUserById('user-41')!,
        postedDate: new Date('2024-05-27T14:00:00Z').toISOString(),
        specifics: { species: 'Mačka', breed: 'Persijska', gender: 'Ženka', age: '2 meseca', vaccinated: 'Da' },
    },
    {
        id: 'listing-15',
        title: 'Mercedes-Benz C-Klasa 220d',
        description: 'Elegancija i snaga. C-klasa u Avantgarde opremi. Očuvan enterijer, bez ulaganja. Garažiran i nepušački auto.',
        price: 24000,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'automobili',
        condition: 'used',
        location: 'Subotica',
        images: ['https://picsum.photos/seed/mercedes/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-23T10:00:00Z').toISOString(),
        specifics: { brand: 'Mercedes-Benz', model: 'C-Klasa', year: 2018, mileage: 95000, fuelType: 'Dizel', transmission: 'Automatski', emissionsClass: 'Euro 6' },
    },
    {
        id: 'listing-16',
        title: 'Novogradnja, jednoiposoban stan, Zvezdara',
        description: 'Direktna prodaja od investitora. Jednoiposoban stan od 42m2 u izgradnji. Visok kvalitet gradnje. Povraćaj PDV-a za kupce prvog stana.',
        price: 95000,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'nekretnine',
        condition: 'new_build',
        location: 'Beograd',
        images: ['https://picsum.photos/seed/novogradnja/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-22T19:00:00Z').toISOString(),
        specifics: { area: 42, rooms: '1.5', propertyType: 'Stan', furnished: 'Nenamešten', availableFrom: 'Po završetku gradnje', address: 'Vitezova Karađorđeve zvezde 45, Mirijevo, Zvezdara' },
    },
    {
        id: 'listing-17',
        title: 'Fiat 500 1.2 Lounge',
        description: 'Gradski auto sa stilom. Idealan za početnike. Redovno servisiran, sa panorama krovom. Registrovan godinu dana.',
        price: 6800,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'automobili',
        condition: 'used',
        location: 'Niš',
        images: ['https://picsum.photos/seed/fiat500/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-27T16:45:00Z').toISOString(),
        specifics: { brand: 'Fiat', model: '500', year: 2015, mileage: 85000, fuelType: 'Benzin', emissionsClass: 'Euro 6' },
    },
    {
        id: 'listing-18',
        title: 'Vikendica na Fruškoj Gori',
        description: 'Prodaje se vikendica sa prelepim pogledom. Plac od 15 ari pod voćem. Legalizovana, sa strujom i vodom.',
        price: 45000,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'nekretnine',
        condition: 'used',
        location: 'Irig',
        images: ['https://picsum.photos/seed/vikendica/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-26T21:00:00Z').toISOString(),
        specifics: { area: 60, propertyType: 'Kuća', address: 'Vrdnik' },
    },
    {
        id: 'listing-19',
        title: 'Štenci Francuskog Buldoga',
        description: 'Na prodaju štenci francuskog buldoga, egzotičnih boja. Profesionalno odnegovani, sa FCI rodovnikom.',
        price: 800,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'kucni-ljubimci',
        condition: undefined,
        location: 'Pančevo',
        images: ['https://picsum.photos/seed/bulldog/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-25T09:30:00Z').toISOString(),
        specifics: { species: 'Pas', breed: 'Francuski Buldog', age: '2 meseca' },
    },
    {
        id: 'listing-20',
        title: 'Opel Corsa D 1.3 CDTI',
        description: 'Pouzdana i ekonomična Corsa. Uvezena iz Holandije. Bez korozije. Odlične gume. Klima radi.',
        price: 4200,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'automobili',
        condition: 'used',
        location: 'Šabac',
        images: ['https://picsum.photos/seed/corsa/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-24T11:20:00Z').toISOString(),
        specifics: { brand: 'Opel', model: 'Corsa', year: 2011, mileage: 210000, fuelType: 'Dizel', emissionsClass: 'Euro 5' },
    },
    {
        id: 'listing-21',
        title: 'Akvarijum 100L sa opremom',
        description: 'Prodajem kompletan akvarijum od 100 litara sa svom pratećom opremom (filter, grejač, pumpa, dekoracija) i ribicama.',
        price: 120,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'kucni-ljubimci',
        condition: undefined,
        location: 'Zrenjanin',
        images: ['https://picsum.photos/seed/akvarijum/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-23T13:40:00Z').toISOString(),
        specifics: { species: 'Riba' },
    },
     {
        id: 'listing-22',
        title: 'Plac na Srebrnom Jezeru',
        description: 'Građevinski plac od 5 ari na 200m od obale. Dozvoljena gradnja. Sva infrastruktura do placa.',
        price: 25000,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'nekretnine',
        condition: undefined,
        location: 'Veliko Gradište',
        images: ['https://picsum.photos/seed/plac/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-22T09:00:00Z').toISOString(),
        specifics: { area: 500, propertyType: 'Plac', address: 'Srebrno Jezero' },
    },
     {
        id: 'listing-23',
        title: 'Renault Clio 1.5 dCi',
        description: 'Odličan gradski auto. Uvezen iz Francuske, ocarinjen i urađen AMSS. Kupcu ostaje samo registracija.',
        price: 7900,
        priceType: 'fixed',
        currency: 'EUR',
        category: 'automobili',
        condition: 'used',
        location: 'Užice',
        images: ['https://picsum.photos/seed/clio/800/600'],
        seller: getRandomUser(),
        postedDate: new Date('2024-05-27T19:00:00Z').toISOString(),
        specifics: { brand: 'Renault', model: 'Clio', year: 2017, mileage: 145000, fuelType: 'Dizel', emissionsClass: 'Euro 6' },
    },
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