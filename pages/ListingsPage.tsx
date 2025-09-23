import React, { useState, useMemo, useEffect } from 'react';
import { Page, Listing, FilterState } from '../types';
import FilterSidebar from '../components/FilterSidebar';
import ListingCard from '../components/ListingCard';
import Pagination from '../components/Pagination';

interface ListingsPageProps {
  onNavigate: (page: Page) => void;
  initialFilters?: Partial<FilterState>;
  listings: Listing[];
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

const ListingsPage: React.FC<ListingsPageProps> = ({ onNavigate, initialFilters, listings }) => {
  const [filters, setFilters] = useState<FilterState>({ ...initialFilterState, ...initialFilters });
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  // Reset page to 1 whenever filters change to avoid being on a non-existent page
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOrder]);

  const filteredAndSortedListings = useMemo(() => {
    let result = [...listings];

    // Filtering
    result = result.filter(listing => {
      // Improved search term logic
      let searchTermMatch = true;
      if (filters.searchTerm) {
          const searchWords = filters.searchTerm.toLowerCase().split(' ').filter(word => word.length > 0);
          const listingContent = `${listing.title} ${listing.description} ${listing.location}`.toLowerCase();
          searchTermMatch = searchWords.every(word => listingContent.includes(word));
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
            <div>
              <label htmlFor="sortOrder" className="mr-2 text-sm font-medium text-gray-700">Sortiraj:</label>
              <select 
                id="sortOrder"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Najnovije</option>
                <option value="price_asc">Cena: Niža ka Višoj</option>
                <option value="price_desc">Cena: Viša ka Nižoj</option>
              </select>
            </div>
          </div>
          {currentListings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} onNavigate={onNavigate} />
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
          )}
        </main>
      </div>
    </div>
  );
};

export default ListingsPage;