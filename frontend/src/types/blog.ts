/**
 * AIronLab Blog System - TypeScript Type Definitions
 * Complete type system for blog posts, authors, categories, and tags
 */

/**
 * Blog Author Interface
 * Represents a content creator or team member
 */
export interface BlogAuthor {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  role?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  stats?: {
    articles: number;
    experience: number;
  };
}

/**
 * Blog Category Interface
 * Represents a high-level content category
 */
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  postCount?: number;
}

/**
 * Blog Tag Interface
 * Represents a topic or keyword for content classification
 */
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
}

/**
 * Blog Post Status
 * Represents the publication state of a blog post
 */
export type BlogPostStatus = 'draft' | 'published' | 'archived' | 'scheduled';

/**
 * Blog Post Interface
 * Complete blog post data structure
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;

  // Author and attribution
  author: BlogAuthor;
  coAuthors?: BlogAuthor[];

  // Dates and timestamps
  publishedAt: string; // ISO 8601 date string
  updatedAt?: string; // ISO 8601 date string
  createdAt?: string; // ISO 8601 date string
  scheduledFor?: string; // ISO 8601 date string for scheduled posts

  // Taxonomy
  category: BlogCategory;
  tags: BlogTag[];

  // Media
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
  };

  // Metadata
  readTime: number; // in minutes
  status?: BlogPostStatus;
  views?: number;
  likes?: number;

  // SEO
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };

  // Additional features
  isPinned?: boolean;
  isFeatured?: boolean;
  allowComments?: boolean;
  relatedPosts?: string[]; // Array of post IDs
}

/**
 * Blog Card Variant Type
 * Defines the display style of blog cards
 */
export type BlogCardVariant = 'featured' | 'standard' | 'compact';

/**
 * Blog Post Preview Interface
 * Lightweight version for lists and grids
 */
export interface BlogPostPreview {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  category: {
    name: string;
    slug: string;
    color?: string;
  };
  tags: {
    name: string;
    slug: string;
  }[];
  featuredImage: {
    url: string;
    alt: string;
  };
  readTime: number;
  isFeatured?: boolean;
}

/**
 * Blog Filter Options
 * Used for filtering and searching blog posts
 */
export interface BlogFilterOptions {
  category?: string;
  tags?: string[];
  author?: string;
  search?: string;
  status?: BlogPostStatus;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'publishedAt' | 'updatedAt' | 'views' | 'likes' | 'title';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * Blog Pagination
 * Pagination metadata for blog post lists
 */
export interface BlogPagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Blog API Response
 * Standard API response structure
 */
export interface BlogApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: BlogPagination;
  error?: {
    code: string;
    message: string;
  };
}
