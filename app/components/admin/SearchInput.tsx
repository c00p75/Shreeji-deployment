"use client";

import { forwardRef, memo, useRef, useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  label?: string;
}

const SearchInputComponent = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, placeholder = "Search...", id, name, label }, ref) => {
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const onChangeRef = useRef(onChange);
    
    // Keep onChange ref updated
    useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);
    
    // Sync local value when external value changes (e.g., when filters are cleared)
    useEffect(() => {
      setLocalValue(value);
    }, [value]);
    
    const handleSearch = () => {
      onChangeRef.current(localValue);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
    };
    
    // Expose ref to parent
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current);
        } else {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
        }
      }
    }, [ref]);
    
    return (
      <>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={inputRef}
            id={id}
            name={name}
            type="text"
            placeholder={placeholder}
            value={localValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-primary-500 absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </>
    );
  }
);

SearchInputComponent.displayName = 'SearchInput';

const SearchInput = memo(SearchInputComponent);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
