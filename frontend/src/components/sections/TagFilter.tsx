"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
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
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-responsive-h4">Фильтр по тегам</h3>
        {showClearAll && selectedTags.length > 0 && (
          <button
            onClick={handleClearAll}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg",
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
        aria-label="Tag filter buttons"
      >
        {/* All Tags Button */}
        <button
          onClick={handleClearAll}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm",
            "transition-all duration-300 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
            "mobile-friendly-touch",
            isAllActive
              ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105"
              : "glass-effect text-foreground hover:bg-accent/10 hover:scale-105"
          )}
          aria-pressed={isAllActive}
          aria-label="Show all posts"
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
                "flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm",
                "transition-all duration-300 ease-out",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                "mobile-friendly-touch",
                "relative overflow-hidden",
                isActive
                  ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105"
                  : "glass-effect text-foreground hover:bg-accent/10 hover:scale-105"
              )}
              aria-pressed={isActive}
              aria-label={`Filter by ${tag.name} tag${tag.postCount ? ` (${tag.postCount} posts)` : ""}`}
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
              "flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm",
              "glass-effect text-accent hover:bg-accent/10 hover:scale-105",
              "transition-all duration-300 ease-out",
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
              "flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm",
              "glass-effect text-accent hover:bg-accent/10 hover:scale-105",
              "transition-all duration-300 ease-out",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
              "mobile-friendly-touch"
            )}
            aria-label="Show fewer tags"
          >
            Скрыть
          </button>
        )}
      </div>

      {/* Active Filters Summary */}
      {selectedTags.length > 0 && (
        <div className="mt-4 p-3 rounded-lg glass-effect animate-slide-down">
          <p className="text-sm text-muted-foreground">
            Активные фильтры:{" "}
            <span className="font-medium text-foreground">
              {selectedTags.length} {selectedTags.length === 1 ? "тег" : "тега"}
            </span>
          </p>
        </div>
      )}
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
