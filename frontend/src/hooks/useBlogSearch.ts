"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { BlogPostPreview } from "@/types/blog";

/**
 * useBlogSearch Hook
 * Client-side blog post filtering and searching with URL sync
 *
 * Features:
 * - Full-text search across title and excerpt
 * - Tag-based filtering (multi-select)
 * - Category filtering
 * - Combined filtering logic
 * - Memoized results for performance
 * - URL query params synchronization
 * - Sharable filter states
 */

interface UseBlogSearchOptions {
  posts: BlogPostPreview[];
  initialSearchQuery?: string;
  initialSelectedTags?: string[];
  initialCategory?: string;
  enableUrlSync?: boolean; // Enable URL synchronization
}

export function useBlogSearch({
  posts,
  initialSearchQuery = "",
  initialSelectedTags = [],
  initialCategory = "",
  enableUrlSync = true,
}: UseBlogSearchOptions) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize from URL params if available
  const urlSearch = searchParams.get('search') || initialSearchQuery;
  const urlTags = searchParams.get('tags')?.split(',').filter(Boolean) || initialSelectedTags;
  const urlCategory = searchParams.get('category') || initialCategory;

  const [searchQuery, setSearchQueryState] = useState(urlSearch);
  const [selectedTags, setSelectedTagsState] = useState<string[]>(urlTags);
  const [selectedCategory, setSelectedCategoryState] = useState(urlCategory);

  // Update URL params when filters change
  const updateUrlParams = useCallback((
    search: string,
    tags: string[],
    category: string
  ) => {
    if (!enableUrlSync) return;

    const params = new URLSearchParams();
    
    if (search.trim()) {
      params.set('search', search.trim());
    }
    
    if (tags.length > 0) {
      params.set('tags', tags.join(','));
    }
    
    if (category) {
      params.set('category', category);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.replace(newUrl, { scroll: false });
  }, [enableUrlSync, pathname, router]);

  // Setters that update both state and URL
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    updateUrlParams(query, selectedTags, selectedCategory);
  }, [selectedTags, selectedCategory, updateUrlParams]);

  const setSelectedTags = useCallback((tags: string[] | ((prev: string[]) => string[])) => {
    const newTags = typeof tags === 'function' ? tags(selectedTags) : tags;
    setSelectedTagsState(newTags);
    updateUrlParams(searchQuery, newTags, selectedCategory);
  }, [searchQuery, selectedCategory, selectedTags, updateUrlParams]);

  const setSelectedCategory = useCallback((category: string) => {
    setSelectedCategoryState(category);
    updateUrlParams(searchQuery, selectedTags, category);
  }, [searchQuery, selectedTags, updateUrlParams]);

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
  const handleTagSelect = useCallback((tagSlug: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagSlug)) {
        return prev;
      }
      return [...prev, tagSlug];
    });
  }, [setSelectedTags]);

  // Handle tag deselection
  const handleTagDeselect = useCallback((tagSlug: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagSlug));
  }, [setSelectedTags]);

  // Clear all tags
  const clearTags = useCallback(() => {
    setSelectedTags([]);
  }, [setSelectedTags]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedCategory("");
  }, [setSearchQuery, setSelectedTags, setSelectedCategory]);

  // Count active filters
  const activeFiltersCount = 
    (searchQuery.trim() ? 1 : 0) +
    selectedTags.length +
    (selectedCategory ? 1 : 0);

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
    activeFiltersCount,
    resultsCount: filteredPosts.length,
    totalCount: posts.length,
  };
}
