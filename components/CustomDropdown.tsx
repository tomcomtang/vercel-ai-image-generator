import React, { useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomDropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  className = ""
}: CustomDropdownProps) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentText, setCurrentText] = React.useState('');
  const [nextText, setNextText] = React.useState('');
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize current text
  React.useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    setCurrentText(selectedOption ? selectedOption.label : placeholder);
  }, [options, value, placeholder]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleCloseDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Listen to value changes, trigger text fade in/out transition effect
  useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    const newText = selectedOption ? selectedOption.label : placeholder;
    
    if (newText !== currentText) {
      setNextText(newText);
      setIsTransitioning(true);
      
      // Complete transition after 300ms
      const timer = setTimeout(() => {
        setCurrentText(newText);
        setNextText('');
        setIsTransitioning(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [value, options, placeholder, currentText]);

  const handleOpenDropdown = () => {
    setShowDropdown(true);
    // Use requestAnimationFrame to ensure DOM update before starting animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  const handleCloseDropdown = () => {
    setIsVisible(false);
    // Wait for animation to complete before hiding element
    setTimeout(() => {
      setShowDropdown(false);
    }, 400); // Animation duration
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => showDropdown ? handleCloseDropdown() : handleOpenDropdown()}
        className="w-full bg-black border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent text-white py-2 px-3 pr-4 rounded-lg transition-colors text-left flex items-center justify-between text-xs"
      >
        <div className="relative text-xs">
          {/* Current text - fade out */}
          <span 
            className={`transition-opacity duration-300 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {currentText}
          </span>
          
          {/* New text - fade in */}
          {isTransitioning && nextText && (
            <span 
              className="absolute inset-0 transition-opacity duration-300 ease-in-out opacity-100"
            >
              {nextText}
            </span>
          )}
        </div>
        <svg 
          className={`w-4 h-4 text-white transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {showDropdown && (
        <div className={`absolute bottom-full left-0 right-0 mb-1 bg-black border border-gray-600 rounded-lg shadow-lg z-50 transition-all duration-500 ease-out transform origin-bottom ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-y-100' 
            : 'opacity-0 translate-y-4 scale-y-90'
        }`}>
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => {
                if (!option.disabled) {
                  onChange(option.value);
                  handleCloseDropdown();
                }
              }}
              disabled={option.disabled}
              className={`w-full text-left px-3 py-2 text-xs ${
                index === 0 ? 'first:rounded-t-lg' : ''
              } ${
                index === options.length - 1 ? 'last:rounded-b-lg' : ''
              } ${
                option.disabled
                  ? 'text-gray-500 cursor-not-allowed'
                  : value === option.value 
                    ? 'bg-gray-700 text-white' 
                    : 'text-white hover:bg-gray-800'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
