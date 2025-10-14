"use client";

import React from "react";
import { BlogCard } from "./BlogCard";
import { TagFilter } from "./TagFilter";
import { SearchBar } from "./SearchBar";
import { NewsletterCTA } from "./NewsletterCTA";
import { useBlogSearch } from "@/hooks/useBlogSearch";
import { getUniqueTags } from "@/lib/blogUtils";
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
    hasActiveFilters,
    resultsCount,
    totalCount,
  } = useBlogSearch({ posts });

  // Get unique tags from all posts
  const availableTags = getUniqueTags(posts);

  return (
    <section className={cn("spacing-responsive container-custom", className)}>
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-responsive-h1 mb-4 animate-slide-up">{title}</h1>
        <p className="text-responsive-lead text-muted-foreground max-w-3xl mx-auto animate-slide-up">
          {description}
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && !hasActiveFilters && (
        <div className="mb-12 md:mb-16 animate-fade-in">
          <BlogCard post={featuredPost} variant="featured" />
        </div>
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

      {/* Results Summary */}
      {hasActiveFilters && (
        <div className="mb-8 p-4 rounded-lg glass-effect border border-white/20 animate-slide-down">
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
        </div>
      )}

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard post={post} variant="standard" />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 animate-fade-in">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4" role="img" aria-label="No results">
              📝
            </div>
            <h3 className="text-responsive-h3 mb-4">Статьи не найдены</h3>
            <p className="text-responsive-body text-muted-foreground mb-6">
              {hasActiveFilters
                ? "Попробуйте изменить параметры поиска или фильтры"
                : "В данный момент статьи отсутствуют"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  clearTags();
                }}
                className={cn(
                  "px-6 py-3 rounded-lg",
                  "bg-accent text-white font-medium",
                  "hover:bg-accent/90 hover:scale-105",
                  "transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                )}
              >
                Сбросить фильтры
              </button>
            )}
          </div>
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
