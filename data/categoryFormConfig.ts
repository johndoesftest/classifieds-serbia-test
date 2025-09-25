import { Listing } from '../types';

export type PriceTypeOption = {
    value: NonNullable<Listing['priceType']>;
    label: string;
}

export type ConditionOption = {
    value: NonNullable<Listing['condition']>;
    label: string;
}

interface CategoryConfig {
    showCondition: boolean;
    conditionOptions?: ConditionOption[];
    showPrice: boolean;
    priceLabel: string;
    priceTypes?: PriceTypeOption[];
    showCurrency: boolean;
}

export const CATEGORY_FORM_CONFIG: Record<string, CategoryConfig> & { default: CategoryConfig } = {
    default: {
        showCondition: true,
        conditionOptions: [
            { value: 'new', label: 'Novo' },
            { value: 'used', label: 'Polovan' }
        ],
        showPrice: true,
        priceLabel: 'Cena',
        priceTypes: [{ value: 'fixed', label: 'Fiksno' }],
        showCurrency: true,
    },
    automobili: {
        showCondition: true,
        conditionOptions: [
            { value: 'new', label: 'Novo' },
            { value: 'used', label: 'Polovan' },
        ],
        showPrice: true,
        priceLabel: 'Cena',
        priceTypes: undefined, // Simple price input
        showCurrency: true,
    },
    nekretnine: {
        showCondition: true,
        conditionOptions: [
            { value: 'new_build', label: 'Novo (Novogradnja)' },
            { value: 'used', label: 'Starogradnja' },
            { value: 'renovation_needed', label: 'Potrebno renoviranje' },
        ],
        showPrice: true,
        priceLabel: 'Cena',
        priceTypes: undefined,
        showCurrency: true,
    },
    poslovi: {
        showCondition: false,
        showPrice: true,
        priceLabel: 'Plata',
        priceTypes: [
            { value: 'salary_monthly', label: 'Mesečno' },
            { value: 'salary_yearly', label: 'Godišnje' },
        ],
        showCurrency: true,
    },
    usluge: {
        showCondition: false,
        showPrice: true,
        priceLabel: 'Cena',
        priceTypes: [
            { value: 'fixed', label: 'Fiksno' },
            { value: 'per_hour', label: 'Po satu' },
        ],
        showCurrency: true,
    },
    'roba-i-proizvodi': {
        showCondition: true,
        conditionOptions: [
            { value: 'new', label: 'Novo' },
            { value: 'used', label: 'Polovan' },
        ],
        showPrice: true,
        priceLabel: 'Cena',
        priceTypes: undefined,
        showCurrency: true,
    },
    'kucni-ljubimci': {
        showCondition: false,
        showPrice: true,
        priceLabel: 'Cena',
        priceTypes: undefined,
        showCurrency: true,
    }
};
