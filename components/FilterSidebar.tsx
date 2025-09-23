import React from 'react';
import { CATEGORIES } from '../constants';
import { FilterState } from '../types';
import LocationFilter from './LocationFilter';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, onReset }) => {
  const handleInputChange = <T,>(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Filteri</h3>
      <div className="space-y-6">
        <div>
          <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">Pretraga</label>
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleInputChange}
            placeholder="Npr. 'Golf 7'"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategorija</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sve kategorije</option>
            {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lokacija</label>
          <LocationFilter
            selectedLocations={filters.location}
            onSelectionChange={(newLocations) => onFilterChange({ ...filters, location: newLocations })}
            placeholder="Pretražite lokacije..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cena <span className="text-xs text-gray-500">(samo za EUR)</span></label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="Od"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <span>-</span>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="Do"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stanje</label>
          <select
            name="condition"
            value={filters.condition}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sve</option>
            <option value="new">Novo</option>
            <option value="used">Korišćeno</option>
          </select>
        </div>
        <button 
          onClick={onReset}
          className="w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Resetuj Filtere
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;