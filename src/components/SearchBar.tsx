"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { cn, debounce } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search posts...",
  initialValue = "",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  // Stable debounced function
  const debouncedSearch = useMemo(
    () => debounce((searchQuery: string) => onSearch(searchQuery), 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search
          size={16}
          className="text-gray-400 dark:text-gray-500"
          aria-hidden="true"
        />
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg",
          "bg-white text-gray-900 placeholder-gray-500",
          "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400",
          "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "dark:focus:ring-blue-400",
          "transition-colors"
        )}
      />

      {query && (
        <button
          onClick={handleClear}
          className={cn(
            "absolute inset-y-0 right-0 pr-3 flex items-center",
            "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300",
            "transition-colors"
          )}
          aria-label="Clear search"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
