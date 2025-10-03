import React, { useState, useEffect, useRef } from 'react';

interface SearchInputWithSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  suggestions: string[];
  icon: React.ReactNode;
  ariaLabel: string;
  inputClassName: string;
  iconContainerClassName: string;
}

const SearchInputWithSuggestions: React.FC<SearchInputWithSuggestionsProps> = ({
  value,
  onChange,
  placeholder,
  suggestions,
  icon,
  ariaLabel,
  inputClassName,
  iconContainerClassName
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredSuggestions = value
    ? suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())).slice(0, 7)
    : [];
    
  // Reset active index when input value changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [value]);
  
  // Auto-scroll to active item
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
        const activeItem = listRef.current.children[activeIndex] as HTMLLIElement;
        if (activeItem) {
            activeItem.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            });
        }
    }
  }, [activeIndex]);


  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setIsFocused(false);
    setActiveIndex(-1);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => (prev + 1) % filteredSuggestions.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
          break;
        case 'Enter':
          if (activeIndex >= 0 && activeIndex < filteredSuggestions.length) {
            e.preventDefault();
            handleSuggestionClick(filteredSuggestions[activeIndex]);
          }
          break;
        case 'Escape':
          setIsFocused(false);
          setActiveIndex(-1);
          break;
      }
    }
  };


  const showSuggestions = isFocused && value.length > 0 && filteredSuggestions.length > 0;
  
  const suggestionClasses = (index: number) => `
    px-4 py-3 text-sm text-gray-800 cursor-pointer transition-colors duration-150 ease-in-out
    ${index === activeIndex ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-50'}
  `;

  return (
    <div className="relative flex-1 h-full" ref={wrapperRef}>
      <div className="flex items-center w-full h-full">
        <div className={iconContainerClassName}>
          {icon}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClassName}
          aria-label={ariaLabel}
          autoComplete="off"
        />
      </div>
      {showSuggestions && (
        <div className="absolute z-20 w-full mt-2 bg-white rounded-lg shadow-2xl ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto">
          <ul role="listbox" ref={listRef}>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={suggestionClasses(index)}
                role="option"
                aria-selected={index === activeIndex}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInputWithSuggestions;