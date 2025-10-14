"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  autoFocus?: boolean;
  minCharacters?: number;
  showLoadingIndicator?: boolean;
  defaultValue?: string;
}

/**
 * SearchBar Component
 * Advanced search bar with debouncing and loading states
 *
 * Features:
 * - Debounced search (default 300ms, customizable)
 * - Clear button when text is present
 * - Glass morphism background
 * - Focus states with accent color
 * - Mobile-friendly touch targets (44×44px minimum)
 * - Search icon with visual feedback
 * - Loading indicator during search
 * - Accessible keyboard navigation
 * - Auto-focus option
 * - Minimum character threshold option
 */
export function SearchBar({
  onSearch,
  placeholder = "Поиск статей...",
  debounceMs = 300,
  className,
  autoFocus = false,
  minCharacters = 0,
  showLoadingIndicator = true,
  defaultValue = "",
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    (query: string) => {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set loading state
      if (query.length >= minCharacters) {
        setIsSearching(true);
      }

      // Create new timer
      debounceTimerRef.current = setTimeout(() => {
        if (query.length >= minCharacters || query.length === 0) {
          onSearch(query);
        }
        setIsSearching(false);
      }, debounceMs);
    },
    [onSearch, debounceMs, minCharacters]
  );

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle clear button
  const handleClear = () => {
    setSearchQuery("");
    setIsSearching(false);
    onSearch("");

    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Focus input after clearing
    inputRef.current?.focus();
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Escape key clears search
    if (event.key === "Escape") {
      handleClear();
      event.preventDefault();
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const showClearButton = searchQuery.length > 0;
  const showMinCharWarning = searchQuery.length > 0 && searchQuery.length < minCharacters;

  return (
    <div className={cn("w-full", className)}>
      {/* Search Input Container */}
      <div
        className={cn(
          "relative flex items-center",
          "glass-effect rounded-xl border border-white/20",
          "transition-all duration-300",
          "focus-within:border-accent focus-within:shadow-lg focus-within:shadow-accent/20",
          "mobile-friendly-touch"
        )}
      >
        {/* Search Icon */}
        <div
          className="absolute left-4 flex items-center pointer-events-none"
          aria-hidden="true"
        >
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Input Field */}
        <Input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            "flex-1 pl-12 pr-24 h-12 md:h-14",
            "border-0 bg-transparent",
            "text-base md:text-lg",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "placeholder:text-muted-foreground/70"
          )}
          aria-label="Search blog posts"
          aria-describedby={showMinCharWarning ? "search-min-char-warning" : undefined}
        />

        {/* Right Side Controls */}
        <div className="absolute right-2 flex items-center gap-2">
          {/* Loading Indicator */}
          {showLoadingIndicator && isSearching && (
            <div
              className="flex items-center justify-center"
              role="status"
              aria-live="polite"
              aria-label="Searching"
            >
              <Loader2 className="h-5 w-5 text-accent animate-spin" aria-hidden="true" />
            </div>
          )}

          {/* Clear Button */}
          {showClearButton && (
            <button
              onClick={handleClear}
              className={cn(
                "flex items-center justify-center",
                "h-8 w-8 md:h-10 md:w-10 rounded-lg",
                "text-muted-foreground hover:text-accent",
                "hover:bg-accent/10",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                "mobile-friendly-touch"
              )}
              aria-label="Clear search"
              type="button"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Minimum Characters Warning */}
      {showMinCharWarning && (
        <p
          id="search-min-char-warning"
          className="mt-2 text-sm text-muted-foreground animate-slide-down"
          role="alert"
        >
          Введите минимум {minCharacters} символов для поиска
        </p>
      )}

      {/* Search Results Count (optional, can be shown via props) */}
      {searchQuery.length >= minCharacters && !isSearching && (
        <div
          className="mt-2 text-sm text-muted-foreground animate-fade-in"
          role="status"
          aria-live="polite"
        >
          Поиск по запросу: <span className="font-medium text-foreground">&quot;{searchQuery}&quot;</span>
        </div>
      )}
    </div>
  );
}

/**
 * CompactSearchBar Component
 * Simplified search bar for compact layouts
 */
interface CompactSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function CompactSearchBar({
  onSearch,
  placeholder = "Поиск...",
  className,
}: CompactSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Focus input when expanding
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Clear search when collapsing
      setSearchQuery("");
      onSearch("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className={cn("relative", className)}>
      {isExpanded ? (
        <div
          className={cn(
            "flex items-center gap-2 p-2 rounded-lg",
            "glass-effect border border-white/20",
            "animate-scale-in"
          )}
        >
          <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <Input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent h-8 focus-visible:ring-0"
            aria-label="Search"
          />
          <button
            onClick={handleToggle}
            className="p-1 hover:bg-accent/10 rounded transition-colors"
            aria-label="Close search"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleToggle}
          className={cn(
            "flex items-center justify-center",
            "h-10 w-10 rounded-lg",
            "glass-effect text-foreground hover:text-accent",
            "hover:bg-accent/10",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-accent"
          )}
          aria-label="Open search"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
