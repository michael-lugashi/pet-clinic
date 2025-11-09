import React, { useState, useRef, useEffect } from "react";

export interface DropdownOption<T> {
  value: T;
  label: string;
}

interface DropdownSelectProps<T> {
  options: DropdownOption<T>[];
  selectedValue: T | null;
  onSelect: (value: T | null) => void;
  trigger: React.ReactNode;
  placeholder?: string;
  showAllOption?: boolean;
  allOptionLabel?: string;
  className?: string;
  dropdownClassName?: string;
}

const DropdownSelect = <T,>({
  options,
  selectedValue,
  onSelect,
  trigger,
  placeholder = "Select...",
  showAllOption = false,
  allOptionLabel = "All",
  className = "",
  dropdownClassName = "",
}: DropdownSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (value: T | null) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-lg text-gray hover:bg-light-purple transition-colors"
      >
        {trigger}
      </button>
      {isOpen && (
        <div
          className={`absolute top-full right-0 mt-2 bg-white border border-black/10 rounded-lg shadow-lg z-20 min-w-[150px] overflow-hidden ${dropdownClassName}`}
        >
          {showAllOption && (
            <button
              onClick={() => handleSelect(null)}
              className={`w-full text-left px-4 py-2 hover:bg-gray/5 transition-colors ${
                selectedValue === null ? "bg-dark-purple/10 text-dark-purple font-medium" : "text-black"
              }`}
            >
              {allOptionLabel}
            </button>
          )}
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-4 py-2 hover:bg-gray/5 transition-colors ${
                selectedValue === option.value ? "bg-dark-purple/10 text-dark-purple font-medium" : "text-black"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
