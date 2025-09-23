import React, { useState, useMemo } from 'react';
import { Page, Listing, FilterState } from '../types';
import FilterSidebar from '../components/FilterSidebar';
import ListingCard from '../components/ListingCard';

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

const ListingsPage: React.FC<ListingsPageProps> = ({ onNavigate, initialFilters, listings }) => {
  const [filters, setFilters] = useState<FilterState>({ ...initialFilterState, ...initialFilters });
  const [sortOrder, setSortOrder] = useState('newest');

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  const filteredAndSortedListings = useMemo(() => {
    let result = [...listings];

    // Filtering
    result = result.filter(listing => {
      const searchTermMatch = filters.searchTerm ? listing.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) : true;
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


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
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
          {filteredAndSortedListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} onNavigate={onNavigate} />
              ))}
            </div>
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