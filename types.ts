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
    id: string;
    name: string;
    avatar: string;
    phone?: string;
    email?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Report {
  id: string;
  listingId: string;
  reason: string;
  reportedAt: string;
}

export type Page =
  | { name: 'home' }
  | { name: 'listings'; filters?: Partial<FilterState> }
  | { name: 'detail'; id: string }
  | { name: 'create' }
  | { name: 'about' }
  | { name: 'login'; redirectPage?: Page }
  | { name: 'register' }
  | { name: 'forgot-password' }
  | { name: 'reset-password'; token: string }
  | { name: 'profile'; userId: string };


export interface FilterState {
  searchTerm: string;
  category: string;
  location: string[];
  minPrice: string;
  maxPrice: string;
  condition: string;
}