"use client";

import React, { useEffect } from "react";
import { BlogCard } from "./BlogCard";
import { FeaturedPost } from "./blog/FeaturedPost";
import { EmptyState } from "./blog/EmptyState";
import { TagFilter } from "./TagFilter";
import { SearchBar } from "./SearchBar";
import { NewsletterCTA } from "./NewsletterCTA";
import { useBlogSearch } from "@/hooks/useBlogSearch";
import { getUniqueTags } from "@/lib/blogUtils";
import { trackBlogSearch, trackBlogTagFilter, trackBlogFilterClear } from "@/lib/analytics";
import type { BlogPostPreview } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogSectionProps {
  posts: BlogPostPreview[];
  featuredPost?: BlogPostPreview;
  showSearch?: boolean;
  showTagFilter?: boolean;
  showNewsletter?: boolean;
  className?: string;
  title?: string;
  description?: string;
}

/**
 * BlogSection Component
 * Complete blog section with search, filtering, and post grid
 *
 * Features:
 * - Featured post display
 * - Search functionality with debouncing
 * - Tag-based filtering
 * - Responsive grid layout
 * - Empty state handling
 * - Loading state support
 */
export function BlogSection({
  posts,
  featuredPost,
  showSearch = true,
  showTagFilter = true,
  showNewsletter = true,
  className,
  title = "Блог AIronLab",
  description = "Статьи и инсайты о разработке AI-решений",
}: BlogSectionProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    filteredPosts,
    handleTagSelect,
    handleTagDeselect,
    clearTags,
    clearAllFilters,
    hasActiveFilters,
    activeFiltersCount,
    resultsCount,
    totalCount,
  } = useBlogSearch({ posts });

  // Get unique tags from all posts
  const availableTags = getUniqueTags(posts);

  // Track search queries (debounced)
  useEffect(() => {
    if (searchQuery.trim()) {
      const timer = setTimeout(() => {
        trackBlogSearch(searchQuery);
      }, 1000); // Track after 1 second of no typing
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Track tag filter changes
  useEffect(() => {
    if (selectedTags.length > 0) {
      selectedTags.forEach(tag => {
        trackBlogTagFilter(tag, selectedTags.length);
      });
    }
  }, [selectedTags]);

  // Enhanced clear filters with analytics
  const handleClearAllFilters = () => {
    trackBlogFilterClear();
    clearAllFilters();
  };

  return (
    <section
      role="main"
      aria-label="Blog posts section"
      className={cn("spacing-responsive container-custom", className)}
    >
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-responsive-h1 mb-4 animate-slide-up">{title}</h1>
        <p className="text-responsive-lead text-muted-foreground max-w-3xl mx-auto animate-slide-up">
          {description}
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && !hasActiveFilters && (
        <FeaturedPost post={featuredPost} />
      )}

      {/* Search and Filter Controls */}
      {(showSearch || showTagFilter) && (
        <div className="mb-12 space-y-8 animate-slide-up">
          {/* Search Bar */}
          {showSearch && (
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Поиск по статьям..."
              debounceMs={300}
              minCharacters={2}
            />
          )}

          {/* Tag Filter */}
          {showTagFilter && availableTags.length > 0 && (
            <TagFilter
              tags={availableTags}
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
              onTagDeselect={handleTagDeselect}
              onClearAll={clearTags}
              maxVisibleTags={6}
            />
          )}
        </div>
      )}

      {/* Results Summary with Active Filters Badge */}
      {hasActiveFilters && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mb-8 p-4 rounded-lg glass-effect border border-white/20 animate-slide-down"
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Найдено статей:{" "}
                <span className="font-bold text-foreground text-lg">{resultsCount}</span>{" "}
                из {totalCount}
                {searchQuery && (
                  <span className="ml-2">
                    по запросу <span className="font-medium text-foreground">&quot;{searchQuery}&quot;</span>
                  </span>
                )}
              </p>
              {/* Active Filters Count Badge */}
              {activeFiltersCount > 0 && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                  <span className="text-xs font-medium text-accent">
                    Активных фильтров: {activeFiltersCount}
                  </span>
                </div>
              )}
            </div>
            {/* Clear All Filters Button */}
            <button
              onClick={handleClearAllFilters}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium min-h-[44px]",
                "bg-gray-100 hover:bg-gray-200 text-gray-700",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              )}
              aria-label="Clear all active filters"
            >
              Сбросить все фильтры
            </button>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div
          role="list"
          aria-label="Blog posts"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in"
        >
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              role="listitem"
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard post={post} variant="standard" />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div role="status" aria-live="polite">
          <EmptyState
            type={hasActiveFilters ? "no-results" : "no-posts"}
            onReset={hasActiveFilters ? handleClearAllFilters : undefined}
          />
        </div>
      )}

      {/* Newsletter CTA */}
      {showNewsletter && (
        <div className="mt-16 md:mt-20 animate-fade-in">
          <NewsletterCTA />
        </div>
      )}
    </section>
  );
}

/**
 * BlogList Component
 * Compact list view for blog posts
 */
interface BlogListProps {
  posts: BlogPostPreview[];
  className?: string;
  title?: string;
}

export function BlogList({ posts, className, title = "Последние статьи" }: BlogListProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {title && <h3 className="text-responsive-h3 mb-6">{title}</h3>}
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} variant="compact" />
      ))}
    </div>
  );
}
