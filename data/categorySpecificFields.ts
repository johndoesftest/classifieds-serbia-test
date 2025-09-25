export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'select';
    options?: string[];
    placeholder?: string;
    required?: boolean;
}

export const CATEGORY_SPECIFIC_FIELDS: Record<string, FormField[]> = {
    automobili: [
        { name: 'address', label: 'Adresa', type: 'text', placeholder: 'Npr. Adresa auto placa', required: false },
        { name: 'brand', label: 'Marka', type: 'select', options: ['Alfa Romeo', 'Audi', 'BMW', 'Chevrolet', 'Citroen', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar', 'Jeep', 'Kia', 'Lada', 'Lancia', 'Land Rover', 'Lexus', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Rover', 'Saab', 'Seat', 'Skoda', 'Smart', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo', 'Ostalo'], required: true },
        { name: 'model', label: 'Model', type: 'text', placeholder: 'Npr. Golf 7', required: true },
        { name: 'year', label: 'Godište', type: 'number', placeholder: 'Npr. 2018', required: true },
        { name: 'mileage', label: 'Kilometraža (km)', type: 'number', placeholder: 'Npr. 120000', required: true },
        { name: 'bodyType', label: 'Karoserija', type: 'select', options: ['Limuzina', 'Hečbek', 'Karavan', 'SUV/Džip', 'Monovolumen (MiniVan)', 'Kupe', 'Kabriolet', 'Ostalo'], required: true },
        { name: 'fuelType', label: 'Vrsta goriva', type: 'select', options: ['Dizel', 'Benzin', 'TNG', 'Hibrid', 'Električni'], required: true },
        { name: 'displacement', label: 'Kubikaža (cm³)', type: 'number', placeholder: 'Npr. 1968', required: false },
        { name: 'enginePower', label: 'Snaga motora (kW)', type: 'number', placeholder: 'Npr. 110', required: false },
        { name: 'transmission', label: 'Menjač', type: 'select', options: ['Manuelni', 'Automatski'], required: true },
        { name: 'drivetrain', label: 'Pogon', type: 'select', options: ['Prednji', 'Zadnji', '4x4'], required: false },
        { name: 'emissionsClass', label: 'Emisiona klasa', type: 'select', options: ['Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6'], required: false },
        { name: 'registeredUntil', label: 'Registrovan do', type: 'text', placeholder: 'Npr. 08/2024', required: false },
    ],
    nekretnine: [
        { name: 'address', label: 'Adresa', type: 'text', placeholder: 'Npr. Krunska 52, Kalenić, Vračar', required: true },
        { name: 'area', label: 'Kvadratura (m²)', type: 'number', placeholder: 'Npr. 65', required: true },
        { name: 'rooms', label: 'Broj soba', type: 'select', options: ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5+'], required: true },
        { name: 'propertyType', label: 'Tip nekretnine', type: 'select', options: ['Stan', 'Kuća', 'Poslovni prostor', 'Garaža', 'Plac'], required: true },
        { name: 'heating', label: 'Grejanje', type: 'select', options: ['Centralno', 'Etažno', 'Na struju', 'Gas', 'Nema grejanja'], required: false },
        { name: 'floor', label: 'Sprat', type: 'text', placeholder: 'Npr. 5 or Prizemlje', required: false },
        { name: 'totalPages', label: 'Ukupan broj spratova', type: 'number', placeholder: 'Npr. 10', required: false },
        { name: 'furnished', label: 'Nameštenost', type: 'select', options: ['Namešten', 'Polunamešten', 'Nenamešten'], required: false },
        { name: 'deposit', label: 'Depozit', type: 'text', placeholder: 'Npr. 500 EUR', required: false },
        { name: 'availableFrom', label: 'Dostupno od', type: 'text', placeholder: 'Npr. Odmah ili 01.09.2024.', required: false },
    ],
    poslovi: [
        { name: 'address', label: 'Adresa', type: 'text', placeholder: 'Npr. Adresa kancelarije', required: false },
        { name: 'jobType', label: 'Tip posla', type: 'select', options: ['Puno radno vreme', 'Pola radnog vremena', 'Privremeni', 'Praksa', 'Volontiranje'], required: true },
        { name: 'experience', label: 'Potrebno iskustvo', type: 'select', options: ['Nije neophodno', 'Manje od 1 godine', '1-3 godine', '3-5 godina', 'Više od 5 godina'], required: true },
        { name: 'companyName', label: 'Naziv kompanije', type: 'text', placeholder: 'Npr. OglasiSrbija Tech', required: true },
        { name: 'educationLevel', label: 'Nivo obrazovanja', type: 'select', options: ['Osnovna škola', 'Srednja škola', 'Viša škola', 'Fakultet', 'Master', 'Doktorat'], required: false },
        { name: 'requiredSkills', label: 'Potrebne veštine', type: 'text', placeholder: 'Npr. React, TypeScript, Git', required: false },
        { name: 'workLocationType', label: 'Lokacija rada', type: 'select', options: ['Rad iz kancelarije', 'Rad od kuće (Remote)', 'Hibridno'], required: true },
        { name: 'contractType', label: 'Tip ugovora', type: 'select', options: ['Neodređeno', 'Određeno', 'Privremeni/povremeni poslovi'], required: false },
        { name: 'applicationDeadline', label: 'Rok za prijavu', type: 'text', placeholder: 'Npr. 30.06.2024.', required: false },
        { name: 'contactPerson', label: 'Kontakt osoba', type: 'text', placeholder: 'Npr. Marko Marković', required: false },
    ],
    usluge: [
        { name: 'address', label: 'Adresa', type: 'text', placeholder: 'Npr. Adresa radnje ili kancelarije', required: false },
        { name: 'companyName', label: 'Naziv firme/pružaoca usluge', type: 'text', placeholder: 'Npr. Petrović Gradnja', required: false },
        { name: 'availability', label: 'Dostupnost', type: 'select', options: ['Radnim danima', 'Vikendom', 'Svaki dan', 'Po dogovoru'], required: true },
        { name: 'experienceYears', label: 'Godine iskustva', type: 'number', placeholder: 'Npr. 10', required: false },
        { name: 'serviceArea', label: 'Područje pružanja usluge', type: 'text', placeholder: 'Npr. Beograd i okolina', required: false },
        { name: 'paymentMethods', label: 'Načini plaćanja', type: 'text', placeholder: 'Npr. Gotovina, Kartica, Faktura', required: false },
        { name: 'portfolioUrl', label: 'Portfolio/Web sajt (URL)', type: 'text', placeholder: 'https://primer-sajta.com', required: false },
    ],
    'roba-i-proizvodi': [
        { name: 'address', label: 'Adresa', type: 'text', placeholder: 'Npr. Adresa preuzimanja', required: false },
        { name: 'brand', label: 'Proizvođač', type: 'text', placeholder: 'Npr. Samsung, Gorenje, Nike...', required: false },
    ],
    'kucni-ljubimci': [
        { name: 'address', label: 'Adresa', type: 'text', placeholder: 'Npr. Adresa odgajivačnice', required: false },
        { name: 'species', label: 'Vrsta', type: 'select', options: ['Pas', 'Mačka', 'Ptica', 'Glodar', 'Riba', 'Reptil', 'Drugo'], required: true },
        { name: 'breed', label: 'Rasa', type: 'text', placeholder: 'Npr. Zlatni Retriver', required: false },
        { name: 'gender', label: 'Pol', type: 'select', options: ['Mužjak', 'Ženka'], required: true },
        { name: 'age', label: 'Starost', type: 'text', placeholder: 'Npr. 3 meseca', required: true },
        { name: 'vaccinated', label: 'Vakcinisan', type: 'select', options: ['Da', 'Ne', 'Delimično'], required: false },
        { name: 'chipped', label: 'Čipovan', type: 'select', options: ['Da', 'Ne'], required: false },
    ]
};