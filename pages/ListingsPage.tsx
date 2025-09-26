import React, { useState, useMemo, useEffect } from 'react';
import { Page, Listing, FilterState, User } from '../types';
import FilterSidebar from '../components/FilterSidebar';
import ListingCard from '../components/ListingCard';
import ListingCardSkeleton from '../components/ListingCardSkeleton';
import Pagination from '../components/Pagination';
import MapComponent from '../components/MapComponent';
import { ListIcon, MapIcon } from '../components/Icons';

interface ListingsPageProps {
  onNavigate: (page: Page) => void;
  initialFilters?: Partial<FilterState>;
  listings: Listing[];
  favorites: string[];
  onToggleFavorite: (listingId: string) => void;
  currentUser: User | null;
  onDeleteListing: (listingId: string) => void;
}

const initialFilterState: FilterState = {
  searchTerm: '',
  category: '',
  location: [],
  minPrice: '',
  maxPrice: '',
  condition: '',
};

const LISTINGS_PER_PAGE = 9;

// Fuzzy search function to find a pattern as a subsequence in a text.
// This is more forgiving for typos or abbreviations than a simple `includes` check.
const fuzzySearch = (needle: string, haystack: string): boolean => {
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  let nIndex = 0;
  for (let i = 0; i < h.length && nIndex < n.length; i++) {
    if (h[i] === n[nIndex]) {
      nIndex++;
    }
  }
  return nIndex === n.length;
};

const ListingsPage: React.FC<ListingsPageProps> = ({ onNavigate, initialFilters, listings, favorites, onToggleFavorite, currentUser, onDeleteListing }) => {
  const [filters, setFilters] = useState<FilterState>({ ...initialFilterState, ...initialFilters });
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isFiltering, setIsFiltering] = useState(false);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  useEffect(() => {
    setCurrentPage(1);
    setIsFiltering(true);
    // Simulate a brief loading period for better UX feedback when filters change.
    const timer = setTimeout(() => {
        setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, sortOrder]);

  const filteredAndSortedListings = useMemo(() => {
    let result = [...listings];

    // Filtering
    result = result.filter(listing => {
      // Fuzzy search for search term
      let searchTermMatch = true;
      if (filters.searchTerm) {
          const searchWords = filters.searchTerm.toLowerCase().split(' ').filter(word => word.length > 0);
          const listingContent = `${listing.title} ${listing.description} ${listing.location}`;
          // All search words must be found as subsequences in the content
          searchTermMatch = searchWords.every(word => fuzzySearch(word, listingContent));
      }
      
      const categoryMatch = filters.category ? listing.category === filters.category : true;
      const locationMatch = filters.location.length > 0 ? filters.location.includes(listing.location) : true;
      const conditionMatch = filters.condition ? listing.condition === filters.condition : true;

      // Price filtering logic that handles currency
      let priceMatch = true;
      const minPrice = parseFloat(filters.minPrice);
      const maxPrice = parseFloat(filters.maxPrice);
      const hasPriceFilter = !isNaN(minPrice) || !isNaN(maxPrice);

      if (hasPriceFilter) {
        if (listing.currency !== 'EUR') {
          priceMatch = false; // Filter out non-EUR listings if price filter is active
        } else {
          const minOk = isNaN(minPrice) || listing.price >= minPrice;
          const maxOk = isNaN(maxPrice) || listing.price <= maxPrice;
          priceMatch = minOk && maxOk;
        }
      }

      return searchTermMatch && categoryMatch && locationMatch && conditionMatch && priceMatch;
    });

    // Sorting
    switch (sortOrder) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
    }

    return result;
  }, [listings, filters, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedListings.length / LISTINGS_PER_PAGE);
  const currentListings = filteredAndSortedListings.slice(
    (currentPage - 1) * LISTINGS_PER_PAGE,
    currentPage * LISTINGS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 lg:sticky lg:top-28 self-start">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />
        </aside>
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">{filteredAndSortedListings.length} oglasa pronađeno</p>
            <div className="flex items-center gap-x-4">
               <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                  aria-label="Prikaz liste"
                >
                  <ListIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${viewMode === 'map' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                  aria-label="Prikaz mape"
                >
                  <MapIcon className="h-5 w-5" />
                </button>
              </div>
              <div>
                <label htmlFor="sortOrder" className="mr-2 text-sm font-medium text-gray-700">Sortiraj:</label>
                <select 
                  id="sortOrder"
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  className="border border-gray-300 rounded-lg py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Najnovije</option>
                  <option value="price_asc">Cena: Niža ka Višoj</option>
                  <option value="price_desc">Cena: Viša ka Nižoj</option>
                </select>
              </div>
            </div>
          </div>
          
          {viewMode === 'list' ? (
            isFiltering ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: LISTINGS_PER_PAGE }).map((_, index) => (
                  <ListingCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredAndSortedListings.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentListings.map(listing => (
                    <ListingCard 
                      key={listing.id} 
                      listing={listing} 
                      onNavigate={onNavigate} 
                      isFavorite={favorites.includes(listing.id)} 
                      onToggleFavorite={onToggleFavorite} 
                      isOwner={currentUser?.id === listing.seller.id}
                      onDelete={onDeleteListing}
                    />
                  ))}
                </div>
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow">
                  <h2 className="text-2xl font-semibold text-gray-700">Nema rezultata</h2>
                  <p className="text-gray-500 mt-2">Pokušajte da promenite filtere ili resetujte pretragu.</p>
              </div>
            )
          ) : ( // Map View
            filteredAndSortedListings.length > 0 ? (
              <MapComponent listings={filteredAndSortedListings} onNavigate={onNavigate} />
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow">
                  <h2 className="text-2xl font-semibold text-gray-700">Nema rezultata za prikaz na mapi</h2>
                  <p className="text-gray-500 mt-2">Pokušajte da promenite filtere.</p>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default ListingsPage;