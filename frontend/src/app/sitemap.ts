import { MetadataRoute } from 'next';
import { mockBlogPosts } from '@/lib/mockBlogData';

/**
 * Dynamic Sitemap Generation for AIronLab
 * Automatically includes all blog posts with proper metadata
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aironlab.ru';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2025-10-09'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date('2025-10-09'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/offer`,
      lastModified: new Date('2025-10-09'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2025-10-09'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Blog posts - dynamically generated
  const blogPosts = mockBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: post.isFeatured ? 0.8 : 0.7,
  }));

  // Blog categories - dynamically generated
  const categories = Array.from(
    new Set(mockBlogPosts.map((post) => post.category.slug))
  ).map((categorySlug) => ({
    url: `${baseUrl}/blog/category/${categorySlug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Blog tags - dynamically generated
  const allTags = mockBlogPosts.flatMap((post) => post.tags);
  const uniqueTags = Array.from(
    new Set(allTags.map((tag) => tag.slug))
  ).map((tagSlug) => ({
    url: `${baseUrl}/blog/tag/${tagSlug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...blogPosts, ...categories, ...uniqueTags];
}
