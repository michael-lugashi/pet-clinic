import React from "react";
import Search from "svg/Search";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const SearchBar = ({ value, onChange, placeholder, className = "" }: SearchBarProps) => {
  return (
    <div className={`flex flex-row items-center gap-4 justify-start pl-2 ${className}`}>
      <Search className="h-5 w-5 text-gray pointer-events-none" />
      <input
        type="text"
        className="w-full outline-none h-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
