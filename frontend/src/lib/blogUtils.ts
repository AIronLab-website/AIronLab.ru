/**
 * AIronLab Blog Utilities
 * Helper functions for blog-related operations
 */

import type { BlogPost, BlogPostPreview, BlogTag, BlogCategory } from "@/types/blog";

/**
 * Calculate reading time based on content length
 * Average reading speed: 200 words per minute
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readTime); // Minimum 1 minute
}

/**
 * Format date to localized string
 */
export function formatDate(
  dateString: string,
  locale: string = "ru-RU",
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(date);
}

/**
 * Format relative date (e.g., "2 days ago")
 */
export function formatRelativeDate(dateString: string, locale: string = "ru-RU"): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (locale === "ru-RU") {
    if (diffSeconds < 60) return "только что";
    if (diffMinutes < 60) return `${diffMinutes} мин назад`;
    if (diffHours < 24) return `${diffHours} ч назад`;
    if (diffDays < 7) return `${diffDays} дн назад`;
    if (diffWeeks < 4) return `${diffWeeks} нед назад`;
    if (diffMonths < 12) return `${diffMonths} мес назад`;
    return `${diffYears} г назад`;
  }

  // English fallback
  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} h ago`;
  if (diffDays < 7) return `${diffDays} d ago`;
  if (diffWeeks < 4) return `${diffWeeks} w ago`;
  if (diffMonths < 12) return `${diffMonths} mo ago`;
  return `${diffYears} y ago`;
}

/**
 * Generate blog post slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Extract excerpt from content
 */
export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove HTML tags if present
  const textContent = content.replace(/<[^>]*>/g, "");

  if (textContent.length <= maxLength) {
    return textContent;
  }

  // Find the last complete sentence within maxLength
  const truncated = textContent.slice(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf("."),
    truncated.lastIndexOf("!"),
    truncated.lastIndexOf("?")
  );

  if (lastSentenceEnd > 0) {
    return textContent.slice(0, lastSentenceEnd + 1);
  }

  // If no sentence end found, truncate at last space and add ellipsis
  const lastSpace = truncated.lastIndexOf(" ");
  return textContent.slice(0, lastSpace) + "...";
}

/**
 * Get unique tags from multiple posts
 */
export function getUniqueTags(posts: BlogPostPreview[]): BlogTag[] {
  const tagMap = new Map<string, BlogTag>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tagMap.has(tag.slug)) {
        tagMap.set(tag.slug, {
          ...tag,
          postCount: 1,
        });
      } else {
        const existingTag = tagMap.get(tag.slug)!;
        existingTag.postCount = (existingTag.postCount || 0) + 1;
      }
    });
  });

  // Sort by post count descending
  return Array.from(tagMap.values()).sort(
    (a, b) => (b.postCount || 0) - (a.postCount || 0)
  );
}

/**
 * Get unique categories from multiple posts
 */
export function getUniqueCategories(posts: BlogPostPreview[]): BlogCategory[] {
  const categoryMap = new Map<string, BlogCategory>();

  posts.forEach((post) => {
    if (!categoryMap.has(post.category.slug)) {
      categoryMap.set(post.category.slug, {
        ...post.category,
        postCount: 1,
      });
    } else {
      const existingCategory = categoryMap.get(post.category.slug)!;
      existingCategory.postCount = (existingCategory.postCount || 0) + 1;
    }
  });

  // Sort by post count descending
  return Array.from(categoryMap.values()).sort(
    (a, b) => (b.postCount || 0) - (a.postCount || 0)
  );
}

/**
 * Sort posts by different criteria
 */
export function sortPosts(
  posts: BlogPostPreview[],
  sortBy: "date" | "title" | "readTime" | "popular" = "date",
  order: "asc" | "desc" = "desc"
): BlogPostPreview[] {
  const sorted = [...posts];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "date":
        comparison =
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "readTime":
        comparison = a.readTime - b.readTime;
        break;
      case "popular":
        // If posts have views/likes, sort by those
        // Otherwise, sort by date
        comparison =
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        break;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Group posts by category
 */
export function groupPostsByCategory(
  posts: BlogPostPreview[]
): Record<string, BlogPostPreview[]> {
  return posts.reduce(
    (acc, post) => {
      const categorySlug = post.category.slug;
      if (!acc[categorySlug]) {
        acc[categorySlug] = [];
      }
      acc[categorySlug].push(post);
      return acc;
    },
    {} as Record<string, BlogPostPreview[]>
  );
}

/**
 * Group posts by month
 */
export function groupPostsByMonth(
  posts: BlogPostPreview[]
): Record<string, BlogPostPreview[]> {
  return posts.reduce(
    (acc, post) => {
      const date = new Date(post.publishedAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(post);
      return acc;
    },
    {} as Record<string, BlogPostPreview[]>
  );
}

/**
 * Convert full blog post to preview
 */
export function postToPreview(post: BlogPost): BlogPostPreview {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    author: {
      name: post.author.name,
      avatar: post.author.avatar,
    },
    publishedAt: post.publishedAt,
    category: {
      name: post.category.name,
      slug: post.category.slug,
      color: post.category.color,
    },
    tags: post.tags.map((tag) => ({
      name: tag.name,
      slug: tag.slug,
    })),
    featuredImage: {
      url: post.featuredImage.url,
      alt: post.featuredImage.alt,
    },
    readTime: post.readTime,
    isFeatured: post.isFeatured,
  };
}

/**
 * Generate SEO metadata for blog post
 */
export function generateBlogPostMetadata(post: BlogPost) {
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords || post.tags.map((tag) => tag.name),
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: [
        {
          url: post.seo?.ogImage || post.featuredImage.url,
          alt: post.featuredImage.alt,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags.map((tag) => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: [post.seo?.ogImage || post.featuredImage.url],
    },
  };
}

/**
 * Validate blog post data
 */
export function validateBlogPost(post: Partial<BlogPost>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!post.title || post.title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!post.slug || post.slug.trim().length === 0) {
    errors.push("Slug is required");
  }

  if (!post.excerpt || post.excerpt.trim().length === 0) {
    errors.push("Excerpt is required");
  }

  if (!post.content || post.content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (!post.author) {
    errors.push("Author is required");
  }

  if (!post.category) {
    errors.push("Category is required");
  }

  if (!post.featuredImage || !post.featuredImage.url) {
    errors.push("Featured image is required");
  }

  if (!post.publishedAt) {
    errors.push("Publish date is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
