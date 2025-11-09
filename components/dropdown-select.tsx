import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

export interface DropdownOption<T> {
  value: T;
  label: string;
}

interface DropdownSelectProps<T> {
  options: DropdownOption<T>[];
  selectedValue: T | null;
  onSelect: (value: T | null) => void;
  trigger: React.ReactNode;
  showAllOption?: boolean;
  allOptionLabel?: string;
  className?: string;
  dropdownClassName?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export interface DropdownSelectRef {
  toggle: () => void;
}

function DropdownSelectInner<T>(
  {
    options,
    selectedValue,
    onSelect,
    trigger,
    showAllOption = false,
    allOptionLabel = "All",
    className = "",
    dropdownClassName = "",
    onOpenChange,
  }: DropdownSelectProps<T>,
  ref: React.Ref<DropdownSelectRef>
) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  // Expose toggle method to parent via ref
  useImperativeHandle(ref, () => ({
    toggle: toggleDropdown,
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  const handleSelect = (value: T | null) => {
    onSelect(value);
    setIsOpen(false);
    onOpenChange?.(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
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
              type="button"
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
              type="button"
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
}

const DropdownSelect = forwardRef(DropdownSelectInner) as <T>(
  props: DropdownSelectProps<T> & { ref?: React.Ref<DropdownSelectRef> }
) => ReturnType<typeof DropdownSelectInner>;

export default DropdownSelect;
