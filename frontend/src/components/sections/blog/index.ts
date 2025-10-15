/**
 * AIronLab Blog System - Component Exports
 * Central export point for all blog-related components
 */

export { BlogCard } from "../BlogCard";
export { TagFilter, TagBadge } from "../TagFilter";
export { SearchBar, CompactSearchBar } from "../SearchBar";
export { BlogSection, BlogList } from "../BlogSection";
export { FeaturedPost } from "./FeaturedPost";
export { EmptyState } from "./EmptyState";
export { LoadingState } from "./LoadingState";
export { PostHero } from "./PostHero";
export { TableOfContents } from "./TableOfContents";
export { ReadingProgress } from "./ReadingProgress";
export { AuthorSection } from "./AuthorSection";
export { Callout, InfoCallout, WarningCallout, SuccessCallout, TipCallout, DangerCallout } from "./Callout";

// Phase 4: Engagement Features
export { RelatedPosts } from "./RelatedPosts";
export { ShareBar } from "./ShareBar";
export { BookmarkButton } from "./BookmarkButton";
export { CommentsSection } from "./CommentsSection";

// Re-export types for convenience
export type {
  BlogPost,
  BlogPostPreview,
  BlogAuthor,
  BlogCategory,
  BlogTag,
  BlogCardVariant,
  BlogPostStatus,
  BlogFilterOptions,
  BlogPagination,
  BlogApiResponse,
} from "@/types/blog";

// Re-export utilities
export {
  calculateReadTime,
  formatDate,
  formatRelativeDate,
  generateSlug,
  extractExcerpt,
  getUniqueTags,
  getUniqueCategories,
  sortPosts,
  groupPostsByCategory,
  groupPostsByMonth,
  postToPreview,
  generateBlogPostMetadata,
  validateBlogPost,
} from "@/lib/blogUtils";

// Re-export hook
export { useBlogSearch } from "@/hooks/useBlogSearch";

// Re-export mock data
export {
  mockAuthors,
  mockCategories,
  mockTags,
  mockBlogPosts,
  mockFullBlogPost,
} from "@/lib/mockBlogData";
