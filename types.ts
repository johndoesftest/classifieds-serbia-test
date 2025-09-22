// Fix: Add React import to resolve 'Cannot find namespace React' error.
import React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'EUR' | 'RSD';
  category: string;
  location: string;
  condition: 'new' | 'used';
  images: string[];
  postedDate: string;
  seller: {
    name: string;
    avatar: string;
  };
}

export type Page =
  | { name: 'home' }
  | { name: 'listings'; filters?: Partial<FilterState> }
  | { name: 'detail'; id: string }
  | { name: 'create' };


export interface FilterState {
  searchTerm: string;
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  condition: string;
}