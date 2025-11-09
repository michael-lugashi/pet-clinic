import React, { forwardRef } from "react";
import Search from "svg/Search";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, placeholder, className = "" }, ref) => {
    return (
      <div className={`flex flex-row items-center gap-4 justify-start pl-2 ${className}`}>
        <Search className="h-5 w-5 text-gray pointer-events-none" />
        <input
          ref={ref}
          type="text"
          className="w-full outline-none h-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
