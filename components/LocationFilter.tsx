import React, { useState, useEffect, useRef } from 'react';
import { LOCATIONS } from '../constants';
import { XIcon, ChevronUpDownIcon } from './Icons';

interface LocationFilterProps {
  selectedLocations: string[];
  onSelectionChange: (locations: string[]) => void;
  singleSelection?: boolean;
  placeholder?: string;
}

// Fuzzy search function to find a pattern as a subsequence in a text.
// E.g., 'nsd' will match 'Novi Sad', making search more forgiving.
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

const LocationFilter: React.FC<LocationFilterProps> = ({ 
  selectedLocations, 
  onSelectionChange, 
  singleSelection = false, 
  placeholder = "Pretražite lokacije..." 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredLocations = LOCATIONS.filter(loc =>
    fuzzySearch(searchTerm, loc)
  );

  const handleSelect = (location: string) => {
    if (singleSelection) {
      onSelectionChange([location]);
      setIsOpen(false);
      setSearchTerm('');
    } else {
      const newSelection = selectedLocations.includes(location)
        ? selectedLocations.filter(l => l !== location)
        : [...selectedLocations, location];
      onSelectionChange(newSelection);
    }
    inputRef.current?.focus();
  };

  const handleRemove = (location: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectionChange(selectedLocations.filter(l => l !== location));
  };

  const handleContainerClick = () => {
    setIsOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div 
        className="flex flex-wrap gap-2 items-center w-full min-h-[3.2rem] cursor-text rounded-lg border border-gray-300 bg-white p-2.5 pr-10 transition-colors duration-150 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30"
        onClick={handleContainerClick}
        tabIndex={-1} // Make div focusable for focus-within
      >
        {selectedLocations.map(loc => (
          <span key={loc} className="flex items-center gap-1.5 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full">
            {loc}
            <button 
              onClick={(e) => handleRemove(loc, e)} 
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
              aria-label={`Ukloni ${loc}`}
            >
              <XIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedLocations.length === 0 ? placeholder : ''}
          className="flex-grow border-none focus:ring-0 p-0 m-0 bg-transparent text-sm placeholder:text-gray-400"
          style={{ minWidth: '100px' }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-gray-600 pointer-events-auto">
                <ChevronUpDownIcon className="h-5 w-5" />
            </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul role="listbox">
            {filteredLocations.map(loc => (
              <li 
                key={loc} 
                onClick={() => handleSelect(loc)} 
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between group"
                role="option"
                aria-selected={selectedLocations.includes(loc)}
              >
                <span className="text-sm text-gray-800">{loc}</span>
                {!singleSelection && (
                  <div className={`w-4 h-4 border rounded flex items-center justify-center ${selectedLocations.includes(loc) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-500'}`}>
                    {selectedLocations.includes(loc) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                )}
              </li>
            ))}
            {filteredLocations.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-500">Nema rezultata</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationFilter;