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
  // Automobili
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
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-1', name: 'Marko Petrović', avatar: 'https://i.pravatar.cc/150?u=marko', phone: '064 123 4567', email: 'marko.p@example.com' }
  },
  {
    id: '7',
    title: 'Audi A4 2.0 TDI S-Line',
    description: 'Prodajem Audi A4, S-Line oprema. U odličnom stanju, garažiran. Urađen veliki servis pre 10.000km. Dva seta felni.',
    price: 14200,
    currency: 'EUR',
    category: 'automobili',
    location: 'Novi Sad',
    condition: 'used',
    images: ['https://picsum.photos/seed/audia4/800/600', 'https://picsum.photos/seed/audia4interior/800/600'],
    postedDate: '2024-07-23T12:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-3', name: 'Nikola Nikolić', avatar: 'https://i.pravatar.cc/150?u=nikola', phone: '061 111 2222', email: 'nikola.n@example.com' }
  },
  {
    id: '10',
    title: 'BMW Serija 3 320d - M Paket',
    description: 'BMW 320d, 2018. godište, sa M paketom opreme. Uvezen iz Nemačke, prvi vlasnik u Srbiji. Automatski menjač, kožna sedišta. Bez ulaganja.',
    price: 21000,
    currency: 'EUR',
    category: 'automobili',
    location: 'Beograd',
    condition: 'used',
    images: ['https://picsum.photos/seed/bmw3/800/600', 'https://picsum.photos/seed/bmw3interior/800/600'],
    postedDate: '2024-07-24T08:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-4', name: 'Petar Popović', avatar: 'https://i.pravatar.cc/150?u=petar', phone: '069 876 5432', email: 'petar.p@example.com' }
  },
  {
    id: '11',
    title: 'Mercedes C220 Avantgarde',
    description: 'Mercedes C klasa, 2017. godište, automatik. Uvezen iz Švajcarske, prvi vlasnik u Srbiji. Full oprema, redovno održavan. Bez i jedne mane.',
    price: 23500,
    currency: 'EUR',
    category: 'automobili',
    location: 'Novi Sad',
    condition: 'used',
    images: ['https://picsum.photos/seed/mercedesC/800/600', 'https://picsum.photos/seed/mercedesCinterior/800/600'],
    postedDate: '2024-07-24T10:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-5', name: 'Dragan Kostić', avatar: 'https://i.pravatar.cc/150?u=dragan', phone: '063 123 4567' }
  },
  {
    id: '12',
    title: 'Fiat Punto 1.2 - Idealan za grad',
    description: 'Jeftin za održavanje, mali potrošač. Registrovan do marta 2025. Urađen mali servis. Odličan za početnike.',
    price: 1800,
    currency: 'EUR',
    category: 'automobili',
    location: 'Kragujevac',
    condition: 'used',
    images: ['https://picsum.photos/seed/fiatpunto/800/600'],
    postedDate: '2024-07-23T18:15:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-6', name: 'Ivana Simić', avatar: 'https://i.pravatar.cc/150?u=ivanasimic', phone: '065 223 3445' }
  },
  {
    id: '13',
    title: 'Opel Astra J 1.7 CDTI',
    description: 'Opel Astra u odličnom stanju, 2012. godište. Domaće tablice, vlasnik. Garažiran, dva ključa. Motor, menjač, trap perfektni.',
    price: 6200,
    currency: 'EUR',
    category: 'automobili',
    location: 'Niš',
    condition: 'used',
    images: ['https://picsum.photos/seed/opelastra/800/600', 'https://picsum.photos/seed/opelinterior/800/600'],
    postedDate: '2024-07-22T14:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-7', name: 'Miloš Pavlović', avatar: 'https://i.pravatar.cc/150?u=milosp', phone: '064 333 4444' }
  },
  {
    id: '14',
    title: 'Škoda Octavia 2.0 TDI DSG',
    description: 'Škoda Octavia, 2019. godište. Automatski menjač, visok paket opreme. Kupljena nova u Srbiji. Svi servisi rađeni na vreme. Moguća svaka provera.',
    price: 17800,
    currency: 'EUR',
    category: 'automobili',
    location: 'Beograd',
    condition: 'used',
    images: ['https://picsum.photos/seed/skodaoctavia/800/600'],
    postedDate: '2024-07-21T11:45:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-8', name: 'Auto plac "Stefan"', avatar: 'https://i.pravatar.cc/150?u=autoplacstefan', phone: '011 456 7890' }
  },
   {
    id: '15',
    title: 'Renault Clio 1.5 dCi',
    description: 'Mali gradski auto, izuzetno mali potrošač. Registrovan godinu dana. Uvezen iz Francuske pre 3 godine. Vredi pogledati.',
    price: 4500,
    currency: 'EUR',
    category: 'automobili',
    location: 'Valjevo',
    condition: 'used',
    images: ['https://picsum.photos/seed/renaultclio/800/600'],
    postedDate: '2024-07-20T16:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-9', name: 'Jovana Ristić', avatar: 'https://i.pravatar.cc/150?u=jovanar', phone: '062 987 6543' }
  },
  {
    id: '16',
    title: 'Peugeot 308 1.6 BlueHDi',
    description: 'Peugeot 308, 2018. godište. Business paket opreme, navigacija, tempomat. U odličnom stanju, bez ulaganja.',
    price: 9900,
    currency: 'EUR',
    category: 'automobili',
    location: 'Subotica',
    condition: 'used',
    images: ['https://picsum.photos/seed/peugeot308/800/600'],
    postedDate: '2024-07-19T09:30:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-10', name: 'Goran Tadić', avatar: 'https://i.pravatar.cc/150?u=gorant', phone: '061 777 8899' }
  },
   {
    id: '17',
    title: 'Ford Focus 1.0 EcoBoost',
    description: 'Odličan Ford Focus, 2019. godište. Benzinski motor sa malom potrošnjom. Prvi vlasnik, kupljen u Srbiji. Servisna knjiga.',
    price: 11500,
    currency: 'EUR',
    category: 'automobili',
    location: 'Čačak',
    condition: 'used',
    images: ['https://picsum.photos/seed/fordfocus/800/600'],
    postedDate: '2024-07-18T12:20:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-11', name: 'Tijana Marković', avatar: 'https://i.pravatar.cc/150?u=tijanam', phone: '063 555 1234' }
  },
  
  // Nekretnine
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
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-2', name: 'Jelena Jovanović', avatar: 'https://i.pravatar.cc/150?u=jelena', phone: '065 987 6543', email: 'jelena.j@example.com' }
  },
  {
    id: '8',
    title: 'Garsonjera na Novom Beogradu, 28m²',
    description: 'Svetla i funkcionalna garsonjera u Bloku 45. Kompletno opremljena. U blizini reke, idealna za studente ili samce. Odmah useljiva.',
    price: 75000,
    currency: 'EUR',
    category: 'nekretnine',
    location: 'Beograd',
    condition: 'used',
    images: ['https://picsum.photos/seed/stanbg2/800/600', 'https://picsum.photos/seed/stanbg2living/800/600'],
    postedDate: '2024-07-22T16:45:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-12', name: 'Agencija "Moj Dom"', avatar: 'https://i.pravatar.cc/150?u=agencija', phone: '011 333 4444', email: 'kontakt@mojdom.rs' }
  },
  {
    id: '18',
    title: 'Kuća na prodaju - Telep, Novi Sad',
    description: 'Spratna kuća na odličnoj lokaciji na Telepu. 200m2, plac 500m2. Dva odvojena stana. Uknjižena, bez tereta. Potrebno minimalno ulaganje.',
    price: 250000,
    currency: 'EUR',
    category: 'nekretnine',
    location: 'Novi Sad',
    condition: 'used',
    images: ['https://picsum.photos/seed/kucans/800/600', 'https://picsum.photos/seed/kucans2/800/600'],
    postedDate: '2024-07-24T11:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-13', name: 'Agencija "NS Home"', avatar: 'https://i.pravatar.cc/150?u=nshome', phone: '021 111 2233' }
  },
  {
    id: '19',
    title: 'Vikendica na Fruškoj Gori',
    description: 'Prodajem vikendicu sa prelepim pogledom na Fruškoj Gori. Plac 10 ari, zasađeno voće. Objekat ima struju i vodu. Idealno za odmor.',
    price: 45000,
    currency: 'EUR',
    category: 'nekretnine',
    location: 'Novi Sad',
    condition: 'used',
    images: ['https://picsum.photos/seed/vikendicafg/800/600'],
    postedDate: '2024-07-23T13:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-14', name: 'Petar Jovanović', avatar: 'https://i.pravatar.cc/150?u=petarj', phone: '065 432 1098' }
  },
  {
    id: '20',
    title: 'Lokal u centru Niša, 40m²',
    description: 'Izdajem lokal na prometnoj lokaciji u centru Niša. Pogodan za razne delatnosti. Mokri čvor, izlog ka ulici. Odmah useljiv.',
    price: 350,
    currency: 'EUR',
    category: 'nekretnine',
    location: 'Niš',
    condition: 'new',
    images: ['https://picsum.photos/seed/lokalnis/800/600'],
    postedDate: '2024-07-22T10:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-15', name: 'Ljubica Stanković', avatar: 'https://i.pravatar.cc/150?u=ljubicas', phone: '069 112 2334' }
  },
   {
    id: '21',
    title: 'Građevinsko zemljište - Vrčin',
    description: 'Plac u Vrčinu, 15 ari, na lepoj lokaciji blizu autoputa. Dozvoljena gradnja. Vlasnik 1/1. Struja i voda do placa.',
    price: 30000,
    currency: 'EUR',
    category: 'nekretnine',
    location: 'Beograd',
    condition: 'new',
    images: ['https://picsum.photos/seed/placvrcin/800/600'],
    postedDate: '2024-07-21T17:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-1', name: 'Marko Petrović', avatar: 'https://i.pravatar.cc/150?u=marko', phone: '064 123 4567' }
  },
   {
    id: '22',
    title: 'Izdavanje stana - Kragujevac Centar',
    description: 'Izdajem namešten dvosoban stan u centru Kragujevca. Novogradnja, niske režije. Depozit obavezan.',
    price: 280,
    currency: 'EUR',
    category: 'nekretnine',
    location: 'Kragujevac',
    condition: 'used',
    images: ['https://picsum.photos/seed/stankg/800/600'],
    postedDate: '2024-07-20T12:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-16', name: 'Sanja Đorđević', avatar: 'https://i.pravatar.cc/150?u=sanjadj', phone: '063 888 9900' }
  },
  {
    id: '23',
    title: 'Garaža na prodaju - Subotica',
    description: 'Prodajem uknjiženu garažu od 15m2 u kolektivnoj garaži. Suva, sa strujom. Rolo vrata. Čisti papiri.',
    price: 8000,
    currency: 'EUR',
    category: 'nekretnine',
    location: 'Subotica',
    condition: 'used',
    images: ['https://picsum.photos/seed/garaza/800/600'],
    postedDate: '2024-07-19T15:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-17', name: 'Atila Horvat', avatar: 'https://i.pravatar.cc/150?u=atila', phone: '066 123 1234' }
  },
  {
    id: '24',
    title: 'Poslovni prostor - Pančevo',
    description: 'Izdajem poslovni prostor od 120m2 na dva nivoa. Nov, neuseljavan. Pogodan za kancelarije, ordinaciju, salon. Dva parking mesta.',
    price: 700,
    currency: 'EUR',
    category: 'nekretnine',
    location: 'Pančevo',
    condition: 'new',
    images: ['https://picsum.photos/seed/prostorpa/800/600'],
    postedDate: '2024-07-18T11:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-18', name: 'Invest Gradnja', avatar: 'https://i.pravatar.cc/150?u=invest', phone: '013 333 444' }
  },
  {
    id: '25',
    title: 'Apartman na Zlatiboru - Izdavanje',
    description: 'Izdajem nov, kompletno opremljen apartman na Zlatiboru. Blizu centra. Pogodan za 4 osobe. Slobodan za Novu Godinu.',
    price: 50,
    currency: 'EUR',
    category: 'nekretnine',
    location: 'Užice',
    condition: 'new',
    images: ['https://picsum.photos/seed/zlatibor/800/600'],
    postedDate: '2024-07-17T19:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-19', name: 'Porodica Lukić', avatar: 'https://i.pravatar.cc/150?u=lukic', phone: '064 555 6677' }
  },

  // Poslovi
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
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-20', name: 'IT Solutions d.o.o.', avatar: 'https://i.pravatar.cc/150?u=itsolutions', phone: '021 555 1234', email: 'posao@itsolutions.rs' }
  },
  {
    id: '26',
    title: 'Backend Developer (Java)',
    description: 'Kompanija traži Java Backend developera sa iskustvom u radu sa Spring Boot-om i mikroservisima. Rad iz kancelarije u Beogradu.',
    price: 0,
    currency: 'RSD',
    category: 'poslovi',
    location: 'Beograd',
    condition: 'new',
    images: ['https://picsum.photos/seed/jobjava/800/600'],
    postedDate: '2024-07-24T09:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-21', name: 'TechCorp', avatar: 'https://i.pravatar.cc/150?u=techcorp', email: 'hr@techcorp.rs' }
  },
  {
    id: '27',
    title: 'Marketing menadžer',
    description: 'Potreban nam je iskusan marketing menadžer za vođenje digitalnih kampanja i razvoj marketing strategije. Iskustvo u vođenju timova je prednost.',
    price: 0,
    currency: 'RSD',
    category: 'poslovi',
    location: 'Beograd',
    condition: 'new',
    images: ['https://picsum.photos/seed/jobmarketing/800/600'],
    postedDate: '2024-07-23T10:30:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-22', name: 'MarketPlus Agencija', avatar: 'https://i.pravatar.cc/150?u=marketplus', email: 'karijera@marketplus.rs' }
  },
  {
    id: '28',
    title: 'Kuvar u restoranu',
    description: 'Restoran domaće kuhinje u centru Niša traži iskusnog kuvara. Rad u smenama, prijava, redovna plata.',
    price: 80000,
    currency: 'RSD',
    category: 'poslovi',
    location: 'Niš',
    condition: 'new',
    images: ['https://picsum.photos/seed/jobkuvar/800/600'],
    postedDate: '2024-07-22T15:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-23', name: 'Restoran "Merak"', avatar: 'https://i.pravatar.cc/150?u=merak', phone: '018 123 456' }
  },
  {
    id: '29',
    title: 'Vozač B kategorije - Dostava',
    description: 'Kurirska služba traži vozače B kategorije za dostavu pošiljki na teritoriji Novog Sada. Službeno vozilo obezbeđeno.',
    price: 75000,
    currency: 'RSD',
    category: 'poslovi',
    location: 'Novi Sad',
    condition: 'new',
    images: ['https://picsum.photos/seed/jobvozac/800/600'],
    postedDate: '2024-07-21T14:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-24', name: 'Brza Pošta d.o.o.', avatar: 'https://i.pravatar.cc/150?u=brzaposta', email: 'posao@brzaposta.rs' }
  },
  {
    id: '30',
    title: 'Građevinski radnik',
    description: 'Potrebni fizički radnici za rad na gradilištu u Beogradu. Isplata na nedeljnom nivou. Smeštaj obezbeđen po potrebi.',
    price: 0,
    currency: 'RSD',
    category: 'poslovi',
    location: 'Beograd',
    condition: 'new',
    images: ['https://picsum.photos/seed/jobgradjevina/800/600'],
    postedDate: '2024-07-20T11:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-25', name: 'Zidar Gradnja', avatar: 'https://i.pravatar.cc/150?u=zidar', phone: '061 999 8877' }
  },
  {
    id: '31',
    title: 'Agent prodaje osiguranja',
    description: 'Tražimo ambiciozne kandidate za poziciju agenta prodaje životnog osiguranja. Mogućnost odlične zarade. Obuka obezbeđena.',
    price: 0,
    currency: 'RSD',
    category: 'poslovi',
    location: 'Kragujevac',
    condition: 'new',
    images: ['https://picsum.photos/seed/jobosiguranje/800/600'],
    postedDate: '2024-07-19T16:20:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-26', name: 'Sigurnost Osiguranje', avatar: 'https://i.pravatar.cc/150?u=sigurnost', email: 'hr@sigurnost.rs' }
  },
  {
    id: '32',
    title: 'Medicinska sestra',
    description: 'Privatna klinika traži medicinsku sestru sa iskustvom. Rad u prijatnom okruženju, odlični uslovi. Potreban položen stručni ispit.',
    price: 90000,
    currency: 'RSD',
    category: 'poslovi',
    location: 'Beograd',
    condition: 'new',
    images: ['https://picsum.photos/seed/jobsestra/800/600'],
    postedDate: '2024-07-18T09:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-27', name: 'Klinika "Zdravlje"', avatar: 'https://i.pravatar.cc/150?u=zdravlje', email: 'posao@zdravlje.rs' }
  },
  {
    id: '33',
    title: 'Call centar operater - Nemački jezik',
    description: 'Potrebni operateri sa znanjem nemačkog jezika (nivo B2 minimum). Rad od kuće. Fiksna plata plus bonusi.',
    price: 120000,
    currency: 'RSD',
    category: 'poslovi',
    location: 'Novi Sad',
    condition: 'new',
    images: ['https://picsum.photos/seed/jobcallcenter/800/600'],
    postedDate: '2024-07-17T13:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-28', name: 'SupportPro', avatar: 'https://i.pravatar.cc/150?u=supportpro', email: 'jobs@supportpro.com' }
  },
  {
    id: '34',
    title: 'Knjigovođa',
    description: 'Knjigovodstvena agencija traži samostalnog knjigovođu sa iskustvom u vođenju poslovnih knjiga za pravna lica i preduzetnike.',
    price: 0,
    currency: 'RSD',
    category: 'poslovi',
    location: 'Pančevo',
    condition: 'new',
    images: ['https://picsum.photos/seed/jobknjigovodja/800/600'],
    postedDate: '2024-07-16T17:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-29', name: 'Finansije Plus', avatar: 'https://i.pravatar.cc/150?u=finansije', email: 'office@finansijeplus.rs' }
  },

  // Usluge
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
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-30', name: 'Majstor Pera', avatar: 'https://i.pravatar.cc/150?u=pera', phone: '061 555 8899', email: 'majstor.pera@example.com' }
  },
  {
    id: '35',
    title: 'Časovi engleskog jezika',
    description: 'Profesorka sa dugogodišnjim iskustvom drži privatne časove engleskog jezika za sve nivoe. Online ili uživo u Beogradu.',
    price: 1500,
    currency: 'RSD',
    category: 'usluge',
    location: 'Beograd',
    condition: 'new',
    images: ['https://picsum.photos/seed/uslugaengleski/800/600'],
    postedDate: '2024-07-24T12:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-31', name: 'Jelena English Teacher', avatar: 'https://i.pravatar.cc/150?u=engleski', phone: '065 123 1234' }
  },
  {
    id: '36',
    title: 'Dubinsko pranje nameštaja',
    description: 'Profesionalno dubinsko pranje nameštaja, tepiha i automobila. Koristimo Karcher mašine i ekološka sredstva. Dolazak na adresu.',
    price: 0,
    currency: 'RSD',
    category: 'usluge',
    location: 'Novi Sad',
    condition: 'new',
    images: ['https://picsum.photos/seed/uslugapranje/800/600'],
    postedDate: '2024-07-23T11:30:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-32', name: 'Čisto NS', avatar: 'https://i.pravatar.cc/150?u=cistons', phone: '062 333 4455' }
  },
  {
    id: '37',
    title: 'Servis klima uređaja',
    description: 'Godišnji servis i dopuna freona za sve tipove klima uređaja. Brzo i profesionalno. Rešavamo sve kvarove.',
    price: 3000,
    currency: 'RSD',
    category: 'usluge',
    location: 'Niš',
    condition: 'new',
    images: ['https://picsum.photos/seed/uslugaklima/800/600'],
    postedDate: '2024-07-22T09:45:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-33', name: 'Klima Servis "Sveže"', avatar: 'https://i.pravatar.cc/150?u=klimaservis', phone: '061 222 3344' }
  },
  {
    id: '38',
    title: 'Vodoinstalaterske usluge',
    description: 'Sve vrste vodoinstalaterskih popravki. Odgušenje kanalizacije, zamena ventila, slavina, bojlera. Hitne intervencije 00-24h.',
    price: 0,
    currency: 'RSD',
    category: 'usluge',
    location: 'Beograd',
    condition: 'new',
    images: ['https://picsum.photos/seed/uslugavoda/800/600'],
    postedDate: '2024-07-21T19:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-34', name: 'Vodoinstalater Mića', avatar: 'https://i.pravatar.cc/150?u=mica', phone: '064 987 6543' }
  },
  {
    id: '39',
    title: 'Prevoz i selidbe',
    description: 'Pružamo usluge prevoza robe i selidbi na teritoriji cele Srbije. Pouzdan tim, kombi vozila različitih veličina. Montaža i demontaža nameštaja.',
    price: 0,
    currency: 'RSD',
    category: 'usluge',
    location: 'Smederevo',
    condition: 'new',
    images: ['https://picsum.photos/seed/uslugaselidbe/800/600'],
    postedDate: '2024-07-20T14:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-35', name: 'Selidbe Express', avatar: 'https://i.pravatar.cc/150?u=selidbe', phone: '066 555 4433' }
  },
  {
    id: '40',
    title: 'Izrada web sajtova',
    description: 'Profesionalna izrada modernih i responzivnih web sajtova. Dizajn, programiranje, SEO optimizacija. Povoljne cene.',
    price: 300,
    currency: 'EUR',
    category: 'usluge',
    location: 'Novi Sad',
    condition: 'new',
    images: ['https://picsum.photos/seed/uslugaweb/800/600'],
    postedDate: '2024-07-19T11:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-36', name: 'Web Studio Creative', avatar: 'https://i.pravatar.cc/150?u=webstudio', email: 'kontakt@webcreative.rs' }
  },
  {
    id: '41',
    title: 'Šetanje pasa',
    description: 'Pouzdana i odgovorna devojka nudi usluge šetanja pasa na teritoriji Novog Beograda. Višegodišnje iskustvo sa životinjama.',
    price: 500,
    currency: 'RSD',
    category: 'usluge',
    location: 'Beograd',
    condition: 'new',
    images: ['https://picsum.photos/seed/uslugapas/800/600'],
    postedDate: '2024-07-18T16:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-37', name: 'Ana Dog Walker', avatar: 'https://i.pravatar.cc/150?u=anadog', phone: '065 888 7766' }
  },
  {
    id: '42',
    title: 'Popravka računara',
    description: 'Servis desktop i laptop računara. Čišćenje od virusa, instalacija sistema, zamena komponenti. Brza dijagnostika i popravka. Dolazak na adresu.',
    price: 0,
    currency: 'RSD',
    category: 'usluge',
    location: 'Kraljevo',
    condition: 'new',
    images: ['https://picsum.photos/seed/uslugapc/800/600'],
    postedDate: '2024-07-17T10:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-38', name: 'PC Doktor', avatar: 'https://i.pravatar.cc/150?u=pcdoktor', phone: '036 123 123' }
  },
  {
    id: '43',
    title: 'Frizerske usluge - dolazak na adresu',
    description: 'Profesionalni frizer sa kompletnom opremom dolazi na vašu kućnu adresu. Šišanje, farbanje, feniranje, svečane frizure.',
    price: 2000,
    currency: 'RSD',
    category: 'usluge',
    location: 'Beograd',
    condition: 'new',
    images: ['https://picsum.photos/seed/uslugafrizer/800/600'],
    postedDate: '2024-07-16T14:30:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-39', name: 'Frizer Vlada', avatar: 'https://i.pravatar.cc/150?u=vladafrizer', phone: '069 333 2211' }
  },

  // Elektronika
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
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-40', name: 'Stefan Ilić', avatar: 'https://i.pravatar.cc/150?u=stefan', phone: '063 112 2334', email: 'stefan.ilic@example.com' }
  },
  {
    id: '9',
    title: 'Samsung Galaxy S23 Ultra, 512GB',
    description: 'Prodajem Samsung S23 Ultra, kao nov. Kupljen pre 6 meseci u domaćoj radnji, fiskalni račun i garancija. Minimalni tragovi korišćenja. Full pakovanje.',
    price: 950,
    currency: 'EUR',
    category: 'elektronika',
    location: 'Beograd',
    condition: 'used',
    images: ['https://picsum.photos/seed/samsungs23/800/600', 'https://picsum.photos/seed/samsungs23back/800/600'],
    postedDate: '2024-07-23T10:30:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-41', name: 'Ana Kovač', avatar: 'https://i.pravatar.cc/150?u=ana', phone: '062 444 7766', email: 'ana.kovac@example.com' }
  },
  {
    id: '44',
    title: 'Laptop Dell XPS 15',
    description: 'Vrhunski laptop, i7 procesor, 16GB RAM, 512GB SSD, 4K ekran osetljiv na dodir. Korišćen za posao, u odličnom stanju.',
    price: 1100,
    currency: 'EUR',
    category: 'elektronika',
    location: 'Novi Sad',
    condition: 'used',
    images: ['https://picsum.photos/seed/laptopdell/800/600'],
    postedDate: '2024-07-24T14:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-42', name: 'Ivan Horvat', avatar: 'https://i.pravatar.cc/150?u=ivanhorvat', email: 'ivan.h@example.com' }
  },
  {
    id: '45',
    title: 'Sony PlayStation 5 - Disk verzija',
    description: 'Prodajem PS5 sa dva džojstika i tri igrice. Konzola je malo korišćena, kao nova. Originalna kutija. Bez zamena.',
    price: 550,
    currency: 'EUR',
    category: 'elektronika',
    location: 'Beograd',
    condition: 'used',
    images: ['https://picsum.photos/seed/ps5/800/600'],
    postedDate: '2024-07-23T17:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-43', name: 'Nemanja Simić', avatar: 'https://i.pravatar.cc/150?u=nemanjas', phone: '063 999 0000' }
  },
  {
    id: '46',
    title: 'Televizor LG OLED 55"',
    description: 'LG OLED55C1, kupljen pre godinu i po dana. Savršena slika. Bez ikakvih oštećenja ili burn-in efekta. Smart TV, magični daljinski.',
    price: 700,
    currency: 'EUR',
    category: 'elektronika',
    location: 'Pančevo',
    condition: 'used',
    images: ['https://picsum.photos/seed/lgoled/800/600'],
    postedDate: '2024-07-22T19:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-44', name: 'Porodica Savić', avatar: 'https://i.pravatar.cc/150?u=savic', phone: '064 111 8888' }
  },
  {
    id: '47',
    title: 'Fotoaparat Canon EOS R6',
    description: 'Full-frame mirrorless aparat, sa RF 24-105mm f/4 L objektivom. U perfektnom stanju, ispucao oko 5000 okidanja. Razlog prodaje je prelazak na drugi sistem.',
    price: 2200,
    currency: 'EUR',
    category: 'elektronika',
    location: 'Beograd',
    condition: 'used',
    images: ['https://picsum.photos/seed/canonr6/800/600'],
    postedDate: '2024-07-21T13:30:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-45', name: 'Foto Studio "Blic"', avatar: 'https://i.pravatar.cc/150?u=fotoblic', email: 'studio@blic.rs' }
  },
  {
    id: '48',
    title: 'Pametni sat Samsung Galaxy Watch 5',
    description: 'Sat je star par meseci, bez tragova korišćenja. Crna boja. Meri puls, kiseonik, EKG, pritisak. Baterija traje dva dana.',
    price: 180,
    currency: 'EUR',
    category: 'elektronika',
    location: 'Kragujevac',
    condition: 'used',
    images: ['https://picsum.photos/seed/galaxywatch/800/600'],
    postedDate: '2024-07-20T20:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-46', name: 'Milica Tasić', avatar: 'https://i.pravatar.cc/150?u=milicat', phone: '062 777 6655' }
  },
  {
    id: '49',
    title: 'Slušalice Sony WH-1000XM5',
    description: 'Najbolje noise-cancelling slušalice na tržištu. Kao nove, korišćene na par putovanja. Kompletno pakovanje.',
    price: 280,
    currency: 'EUR',
    category: 'elektronika',
    location: 'Novi Sad',
    condition: 'used',
    images: ['https://picsum.photos/seed/sonyxm5/800/600'],
    postedDate: '2024-07-19T18:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-47', name: 'Luka Jović', avatar: 'https://i.pravatar.cc/150?u=lukaj', phone: '065 444 3322' }
  },
  {
    id: '50',
    title: 'Grafička kartica NVIDIA RTX 4070',
    description: 'Gigabyte model. Kupljena za gejming, ali slabo korišćena zbog nedostatka vremena. Domaća garancija još 2 godine.',
    price: 600,
    currency: 'EUR',
    category: 'elektronika',
    location: 'Beograd',
    condition: 'used',
    images: ['https://picsum.photos/seed/rtx4070/800/600'],
    postedDate: '2024-07-18T14:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-48', name: 'PC Shop "Gamer"', avatar: 'https://i.pravatar.cc/150?u=pcgamer', email: 'prodaja@pcgamer.rs' }
  },
  {
    id: '51',
    title: 'Monitor Dell UltraSharp 27" 4K',
    description: 'Profesionalni monitor U2723QE. Korišćen za obradu fotografija. Savršena slika, USB-C hub. Bez mrtvih piksela. U garanciji.',
    price: 500,
    currency: 'EUR',
    category: 'elektronika',
    location: 'Novi Sad',
    condition: 'used',
    images: ['https://picsum.photos/seed/dellmonitor/800/600'],
    postedDate: '2024-07-17T16:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-49', name: 'Dizajn Studio "Pixel"', avatar: 'https://i.pravatar.cc/150?u=pixel', phone: '021 888 777' }
  },

  // Kuća i bašta
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
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-41', name: 'Ana Kovač', avatar: 'https://i.pravatar.cc/150?u=ana', phone: '062 444 7766', email: 'ana.kovac@example.com' }
  },
  {
    id: '52',
    title: 'Ugaona garnitura',
    description: 'Prodajem ugaonu garnituru na razvlačenje, sa prostorom za odlaganje. Siva boja, materijal štof. Očuvana, bez oštećenja.',
    price: 35000,
    currency: 'RSD',
    category: 'kuca-i-basta',
    location: 'Beograd',
    condition: 'used',
    images: ['https://picsum.photos/seed/ugaonagarnitura/800/600'],
    postedDate: '2024-07-24T15:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-50', name: 'Porodica Matić', avatar: 'https://i.pravatar.cc/150?u=matic', phone: '064 222 1133' }
  },
  {
    id: '53',
    title: 'Kuhinja po meri',
    description: 'Izrada kuhinja i ostalog nameštaja po meri od pločastih materijala. Visok kvalitet, povoljne cene. Besplatan izlazak na teren i projektovanje.',
    price: 0,
    currency: 'EUR',
    category: 'kuca-i-basta',
    location: 'Šabac',
    condition: 'new',
    images: ['https://picsum.photos/seed/kuhinja/800/600'],
    postedDate: '2024-07-23T16:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-51', name: 'Stolar Mile', avatar: 'https://i.pravatar.cc/150?u=stolar', phone: '061 333 4455' }
  },
  {
    id: '54',
    title: 'Kosilica za travu - Villager',
    description: 'Motorna kosilica Villager, korišćena dve sezone. Samohodna. U odličnom stanju, redovno servisirana. Prodaje se zbog kupovine traktora.',
    price: 200,
    currency: 'EUR',
    category: 'kuca-i-basta',
    location: 'Zrenjanin',
    condition: 'used',
    images: ['https://picsum.photos/seed/kosilica/800/600'],
    postedDate: '2024-07-22T12:30:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-52', name: 'Slobodan Janković', avatar: 'https://i.pravatar.cc/150?u=slobodan', phone: '063 888 1122' }
  },
  {
    id: '55',
    title: 'Set alata - Bosch',
    description: 'Prodajem set Bosch alata u koferu. Bušilica, brusilica, ubodna testera. Malo korišćeno, sve ispravno.',
    price: 150,
    currency: 'EUR',
    category: 'kuca-i-basta',
    location: 'Novi Pazar',
    condition: 'used',
    images: ['https://picsum.photos/seed/alat/800/600'],
    postedDate: '2024-07-21T10:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-53', name: 'Admir Halilović', avatar: 'https://i.pravatar.cc/150?u=admir', phone: '062 111 2233' }
  },
  {
    id: '56',
    title: 'PVC stolarija - po meri',
    description: 'Proizvodnja i ugradnja PVC i ALU stolarije po najpovoljnijim cenama. Nemački profili, garancija kvaliteta. Prozori, vrata, roletne.',
    price: 0,
    currency: 'EUR',
    category: 'kuca-i-basta',
    location: 'Beograd',
    condition: 'new',
    images: ['https://picsum.photos/seed/pvc/800/600'],
    postedDate: '2024-07-20T13:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-54', name: 'ALU i PVC Stolarija "Dom"', avatar: 'https://i.pravatar.cc/150?u=pvcdom', phone: '011 777 8899' }
  },
  {
    id: '57',
    title: 'Baštenski roštilj',
    description: 'Prodajem zidan baštenski roštilj, ručni rad. Idealan za dvorište. Uz roštilj idu i dodaci. Potreban sopstveni prevoz.',
    price: 300,
    currency: 'EUR',
    category: 'kuca-i-basta',
    location: 'Valjevo',
    condition: 'used',
    images: ['https://picsum.photos/seed/rostilj/800/600'],
    postedDate: '2024-07-19T14:45:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-55', name: 'Miroslav Savić', avatar: 'https://i.pravatar.cc/150?u=miroslav', phone: '064 666 5544' }
  },
  {
    id: '58',
    title: 'Bračni krevet sa dušekom',
    description: 'Prodajem bračni krevet dimenzija 160x200cm, sa skoro novim dušekom od memorijske pene. Očuvano, bez oštećenja.',
    price: 25000,
    currency: 'RSD',
    category: 'kuca-i-basta',
    location: 'Niš',
    condition: 'used',
    images: ['https://picsum.photos/seed/krevet/800/600'],
    postedDate: '2024-07-18T20:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-56', name: 'Sandra Mitić', avatar: 'https://i.pravatar.cc/150?u=sandram', phone: '065 222 9988' }
  },
  {
    id: '59',
    title: 'Cveće i sadnice',
    description: 'Veliki izbor sobnog i baštenskog cveća, sadnica tuje, voća. Rasadnik na ulazu u Pančevo. Moguća dostava.',
    price: 0,
    currency: 'RSD',
    category: 'kuca-i-basta',
    location: 'Pančevo',
    condition: 'new',
    images: ['https://picsum.photos/seed/cvece/800/600'],
    postedDate: '2024-07-17T11:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-57', name: 'Rasadnik "Zeleni Svet"', avatar: 'https://i.pravatar.cc/150?u=rasadnik', phone: '013 444 555' }
  },
  {
    id: '60',
    title: 'Sistem za navodnjavanje "kap po kap"',
    description: 'Prodajem kompletan sistem za navodnjavanje "kap po kap" za baštu do 500m2. Malo korišćen, potpuno ispravan.',
    price: 100,
    currency: 'EUR',
    category: 'kuca-i-basta',
    location: 'Čačak',
    condition: 'used',
    images: ['https://picsum.photos/seed/navodnjavanje/800/600'],
    postedDate: '2024-07-16T18:00:00Z',
    // Fix: Added missing 'id' property to seller object.
    seller: { id: 'user-58', name: 'Radovan Popović', avatar: 'https://i.pravatar.cc/150?u=radovan', phone: '061 888 7766' }
  },
];