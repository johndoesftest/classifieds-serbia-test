import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants';
import { FilterState } from '../types';
import LocationFilter from './LocationFilter';
import { SearchIcon } from './Icons';
import { CATEGORY_FORM_CONFIG, ConditionOption } from '../data/categoryFormConfig';
import { CATEGORY_SPECIFIC_FIELDS } from '../data/categorySpecificFields';


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
  const [conditionOptions, setConditionOptions] = useState<ConditionOption[]>(CATEGORY_FORM_CONFIG.default.conditionOptions!);

  const categoryConfig = filters.category ? CATEGORY_FORM_CONFIG[filters.category] : CATEGORY_FORM_CONFIG.default;
  const specificFields = filters.category ? (CATEGORY_SPECIFIC_FIELDS[filters.category] || []) : [];

  useEffect(() => {
      setConditionOptions(categoryConfig?.conditionOptions || []);
  }, [filters.category, categoryConfig]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'category') {
        onFilterChange({
            ...filters,
            category: value,
            specifics: {},
            condition: ''
        });
    } else {
        onFilterChange({
            ...filters,
            [name]: value
        });
    }
  };

  const handleSpecificsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      specifics: {
        ...filters.specifics,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleConditionChange = (value: string) => {
      onFilterChange({ ...filters, condition: value });
  };
  
  const inputClasses = "block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-800 placeholder:text-gray-400 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors duration-150";
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
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
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

        {specificFields.map(field => {
            if (field.name === 'address') return null; // Address is handled by location filter
            return (
                <FilterSection key={field.name} title={field.label}>
                    {field.type === 'select' && (
                        <select name={field.name} value={filters.specifics[field.name] || ''} onChange={handleSpecificsChange} className={inputClasses}>
                            <option value="">Sve</option>
                            {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    )}
                    {field.type === 'text' && (
                        <input
                            type="text"
                            name={field.name}
                            value={filters.specifics[field.name] || ''}
                            onChange={handleSpecificsChange}
                            placeholder={field.placeholder || field.label}
                            className={inputClasses}
                        />
                    )}
                    {field.type === 'number' && (
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                name={`${field.name}_min`}
                                value={filters.specifics[`${field.name}_min`] || ''}
                                onChange={handleSpecificsChange}
                                placeholder="Od"
                                className={inputClasses} />
                            <span className="text-gray-400">-</span>
                            <input type="number"
                                name={`${field.name}_max`}
                                value={filters.specifics[`${field.name}_max`] || ''}
                                onChange={handleSpecificsChange}
                                placeholder="Do"
                                className={inputClasses} />
                        </div>
                    )}
                </FilterSection>
            )
        })}

        {categoryConfig?.showCondition && (
          <FilterSection title="Stanje">
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
               <button
                  key="sve"
                  onClick={() => handleConditionChange('')}
                  className={`${buttonClasses} ${filters.condition === '' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  Sve
                </button>
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
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;