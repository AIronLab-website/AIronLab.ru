"use client";

import { useState, useMemo } from "react";
import type { BlogPostPreview } from "@/types/blog";

/**
 * useBlogSearch Hook
 * Client-side blog post filtering and searching
 *
 * Features:
 * - Full-text search across title and excerpt
 * - Tag-based filtering (multi-select)
 * - Category filtering
 * - Combined filtering logic
 * - Memoized results for performance
 */

interface UseBlogSearchOptions {
  posts: BlogPostPreview[];
  initialSearchQuery?: string;
  initialSelectedTags?: string[];
  initialCategory?: string;
}

export function useBlogSearch({
  posts,
  initialSearchQuery = "",
  initialSelectedTags = [],
  initialCategory = "",
}: UseBlogSearchOptions) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialSelectedTags);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.name.toLowerCase().includes(query)) ||
          post.category.name.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (post) => post.category.slug === selectedCategory
      );
    }

    // Apply tags filter (posts must have ALL selected tags)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.every((selectedTag) =>
          post.tags.some((tag) => tag.slug === selectedTag)
        )
      );
    }

    return filtered;
  }, [posts, searchQuery, selectedCategory, selectedTags]);

  // Handle tag selection
  const handleTagSelect = (tagSlug: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagSlug)) {
        return prev;
      }
      return [...prev, tagSlug];
    });
  };

  // Handle tag deselection
  const handleTagDeselect = (tagSlug: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagSlug));
  };

  // Clear all tags
  const clearTags = () => {
    setSelectedTags([]);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedCategory("");
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedTags.length > 0 ||
    selectedCategory !== "";

  return {
    searchQuery,
    setSearchQuery,
    selectedTags,
    selectedCategory,
    setSelectedCategory,
    filteredPosts,
    handleTagSelect,
    handleTagDeselect,
    clearTags,
    clearAllFilters,
    hasActiveFilters,
    resultsCount: filteredPosts.length,
    totalCount: posts.length,
  };
}
