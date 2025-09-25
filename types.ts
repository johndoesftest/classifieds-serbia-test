import React from 'react';

// Defines the shape of the page object used for navigation
export type Page =
  | { name: 'home' }
  | { name: 'listings'; filters?: Partial<FilterState> }
  | { name: 'detail'; id: string }
  | { name: 'create' }
  | { name: 'login'; redirectPage?: Page }
  | { name: 'register'; redirectPage?: Page }
  | { name: 'profile'; userId: string }
  | { name: 'about' }
  | { name: 'forgot-password' }
  | { name: 'reset-password'; token: string };

// Defines a user, including personal and optional business details
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  accountType: 'private' | 'business';
  businessName?: string;
  businessDescription?: string;
}

// Defines a single classifieds listing
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType?: 'fixed' | 'per_hour' | 'salary_monthly' | 'salary_yearly'; // 'negotiable' is implicit when price is 0
  currency: 'EUR' | 'RSD';
  category: string; // Corresponds to Category.id
  condition?: 'new' | 'used' | 'new_build' | 'renovation_needed';
  location?: string;
  images: string[];
  seller: User;
  postedDate: string; // ISO date string
  specifics?: Record<string, any>;
}

// Defines the state for filtering listings
export interface FilterState {
  searchTerm: string;
  category: string;
  location: string[];
  minPrice: string;
  maxPrice: string;
  condition: string;
}

// Defines a category for listings
export interface Category {
  id: string;
  name: string;
  icon: React.FC<any>;
}

// Defines a report submitted for a listing
export interface Report {
    id: string;
    listingId: string;
    reason: string;
    reportedAt: string; // ISO date string
}