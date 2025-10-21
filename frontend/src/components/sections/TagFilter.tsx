"use client";

import React, { useState } from "react";
import { X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { BlogTag } from "@/types/blog";

interface TagFilterProps {
  tags: BlogTag[];
  selectedTags?: string[];
  onTagSelect?: (tagSlug: string) => void;
  onTagDeselect?: (tagSlug: string) => void;
  onClearAll?: () => void;
  showClearAll?: boolean;
  className?: string;
  maxVisibleTags?: number;
}

/**
 * TagFilter Component
 * Interactive tag filtering system for blog posts
 *
 * Features:
 * - Single or multi-select tag filtering
 * - "All" option to clear all filters
 * - Active/inactive visual states with accent color
 * - Smooth animations on selection
 * - Horizontal scrollable on mobile
 * - Responsive touch-friendly design
 * - Accessible keyboard navigation
 * - Optional tag count display
 */
export function TagFilter({
  tags,
  selectedTags = [],
  onTagSelect,
  onTagDeselect,
  onClearAll,
  showClearAll = true,
  className,
  maxVisibleTags,
}: TagFilterProps) {
  const [showAll, setShowAll] = useState(false);

  const handleTagClick = (tagSlug: string) => {
    if (selectedTags.includes(tagSlug)) {
      onTagDeselect?.(tagSlug);
    } else {
      onTagSelect?.(tagSlug);
    }
  };

  const handleClearAll = () => {
    onClearAll?.();
  };

  const isAllActive = selectedTags.length === 0;
  const visibleTags = maxVisibleTags && !showAll ? tags.slice(0, maxVisibleTags) : tags;
  const hasMoreTags = maxVisibleTags && tags.length > maxVisibleTags;

  return (
    <div className={cn("w-full", className)}>
      {/* Sticky Glass Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-white/20 py-4 -mx-4 px-4 md:-mx-8 md:px-8">
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-accent" aria-hidden="true" />
            <h3 className="text-responsive-h4">Фильтр по тегам</h3>
            {selectedTags.length > 0 && (
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-accent text-white text-xs font-bold">
                {selectedTags.length}
              </span>
            )}
          </div>
          {showClearAll && selectedTags.length > 0 && (
            <button
              onClick={handleClearAll}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full",
                "text-sm font-medium text-muted-foreground",
                "hover:text-accent hover:bg-accent/10",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              )}
              aria-label="Clear all filters"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span>Очистить</span>
            </button>
          )}
        </div>

        {/* Tags Container */}
        <div
          className={cn(
            "flex gap-2 overflow-x-auto scrollbar-hide pb-2",
            "mobile-friendly-touch"
          )}
          role="group"
          aria-label="Filter posts by tag"
        >
          {/* All Tags Button */}
          <button
            onClick={handleClearAll}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm",
              "transition-all duration-200 ease-out",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
              "mobile-friendly-touch",
              isAllActive
                ? "bg-accent text-white shadow-lg shadow-accent/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
            )}
            aria-pressed={isAllActive}
            aria-label="Show all posts without filtering"
          >
            Все
          </button>

          {/* Individual Tag Buttons */}
          {visibleTags.map((tag) => {
            const isActive = selectedTags.includes(tag.slug);

            return (
              <button
                key={tag.id}
                onClick={() => handleTagClick(tag.slug)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm",
                  "transition-all duration-200 ease-out",
                  "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                  "mobile-friendly-touch",
                  "relative overflow-hidden",
                  isActive
                    ? "bg-accent text-white shadow-lg shadow-accent/30"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                )}
                aria-pressed={isActive}
                aria-label={`${isActive ? "Remove" : "Filter by"} ${tag.name} tag${tag.postCount ? `, ${tag.postCount} posts available` : ""}`}
              >
              {/* Active Indicator Animation */}
              {isActive && (
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                  aria-hidden="true"
                />
              )}

              {/* Tag Content */}
              <span className="relative flex items-center gap-2">
                #{tag.name}
                {tag.postCount !== undefined && (
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full",
                      isActive ? "bg-white/20" : "bg-black/10"
                    )}
                  >
                    {tag.postCount}
                  </span>
                )}
              </span>
            </button>
          );
        })}

          {/* Show More Button */}
          {hasMoreTags && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm",
                "bg-gray-100 text-accent hover:bg-gray-200 hover:scale-105",
                "transition-all duration-200 ease-out",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                "mobile-friendly-touch"
              )}
              aria-label={`Show ${tags.length - maxVisibleTags} more tags`}
            >
              Показать еще ({tags.length - maxVisibleTags})
            </button>
          )}

          {/* Show Less Button */}
          {hasMoreTags && showAll && (
            <button
              onClick={() => setShowAll(false)}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm",
                "bg-gray-100 text-accent hover:bg-gray-200 hover:scale-105",
                "transition-all duration-200 ease-out",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                "mobile-friendly-touch"
              )}
              aria-label="Show fewer tags"
            >
              Скрыть
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * TagBadge Component
 * Simplified tag badge for displaying tags without filtering functionality
 */
interface TagBadgeProps {
  tag: BlogTag;
  onClick?: () => void;
  className?: string;
}

export function TagBadge({ tag, onClick, className }: TagBadgeProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg",
        "glass-effect text-sm font-medium",
        "transition-all duration-200",
        onClick && "hover:bg-accent hover:text-white hover:scale-105 cursor-pointer",
        onClick && "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        className
      )}
      {...(onClick && { role: "button", "aria-label": `Filter by ${tag.name}` })}
    >
      <span>#</span>
      <span>{tag.name}</span>
      {tag.postCount !== undefined && (
        <span className="text-xs opacity-70">({tag.postCount})</span>
      )}
    </Component>
  );
}
