import React from 'react';
import { CATEGORIES } from '../constants';
import { FilterState } from '../types';
import LocationFilter from './LocationFilter';
import { SearchIcon } from './Icons';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="py-6 border-b border-gray-200 last:border-b-0">
      <h4 className="text-sm font-semibold text-gray-800 mb-4">{title}</h4>
      {children}
    </div>
);


const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, onReset }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleConditionChange = (value: string) => {
      onFilterChange({ ...filters, condition: value });
  };
  
  const conditionOptions = [
    { label: 'Sve', value: '' },
    { label: 'Novo', value: 'new' },
    { label: 'Korišćeno', value: 'used' }
  ];

  const inputClasses = "w-full border-gray-200 bg-gray-50 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const buttonClasses = "w-full text-center py-2 px-2 rounded-md text-sm font-semibold transition-all";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">Filteri</h3>
        <button 
          onClick={onReset}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Resetuj
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        <FilterSection title="Pretraga">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    name="searchTerm"
                    value={filters.searchTerm}
                    onChange={handleInputChange}
                    placeholder="Npr. 'Golf 7'"
                    className={`${inputClasses} pl-10`}
                />
            </div>
        </FilterSection>

        <FilterSection title="Kategorija">
          <select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Sve kategorije</option>
            {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </FilterSection>

        <FilterSection title="Lokacija">
          <LocationFilter
            selectedLocations={filters.location}
            onSelectionChange={(newLocations) => onFilterChange({ ...filters, location: newLocations })}
            placeholder="Pretražite lokacije..."
          />
        </FilterSection>

        <FilterSection title="Cena (EUR)">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="Od"
              className={inputClasses}
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="Do"
              className={inputClasses}
            />
          </div>
        </FilterSection>

        <FilterSection title="Stanje">
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
            {conditionOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleConditionChange(option.value)}
                className={`${buttonClasses} ${filters.condition === option.value ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterSidebar;