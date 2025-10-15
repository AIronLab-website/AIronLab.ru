"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "../BlogCard";
import type { BlogPost, BlogPostPreview } from "@/types/blog";

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPostPreview[];
  maxPosts?: number;
  className?: string;
}

/**
 * RelatedPosts Component
 * Displays related blog posts based on tags and categories
 *
 * Features:
 * - Smart matching algorithm (tags > category > recency)
 * - Responsive grid layout (1 column mobile, 3 columns desktop)
 * - Uses compact card variant for space efficiency
 * - Automatically excludes current post
 *
 * Matching Algorithm:
 * 1. Posts with matching tags (weighted by number of matches)
 * 2. Posts from same category
 * 3. Recent posts as fallback
 */
export function RelatedPosts({
  currentPost,
  allPosts,
  maxPosts = 3,
  className = "",
}: RelatedPostsProps) {
  // Calculate relevance score for each post
  const getRelevanceScore = (post: BlogPostPreview): number => {
    let score = 0;

    // Exclude current post
    if (post.id === currentPost.id) return -1;

    // Match by tags (5 points per matching tag)
    const currentTags = currentPost.tags.map((t) => t.slug);
    const matchingTags = post.tags.filter((t) => currentTags.includes(t.slug));
    score += matchingTags.length * 5;

    // Match by category (3 points)
    if (post.category.slug === currentPost.category.slug) {
      score += 3;
    }

    // Recency bonus (1 point for posts in last 30 days)
    const postDate = new Date(post.publishedAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    if (postDate > thirtyDaysAgo) {
      score += 1;
    }

    return score;
  };

  // Sort posts by relevance and take top N
  const relatedPosts = allPosts
    .map((post) => ({
      post,
      score: getRelevanceScore(post),
    }))
    .filter(({ score }) => score > 0) // Exclude current post and irrelevant posts
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPosts)
    .map(({ post }) => post);

  // Don't render if no related posts
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section
      className={`py-16 bg-gradient-to-br from-gray-50 to-white ${className}`}
      aria-labelledby="related-posts-heading"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2
              id="related-posts-heading"
              className="text-responsive-h2 mb-3"
            >
              Похожие статьи
            </h2>
            <p className="text-responsive-body text-muted-foreground">
              Вам также может быть интересно
            </p>
          </div>

          {/* View All Link - Desktop */}
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-accent hover:text-accent/80 transition-colors group"
            aria-label="Посмотреть все статьи"
          >
            <span className="font-medium">Все статьи</span>
            <ArrowRight
              className="h-5 w-5 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Related Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {relatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} variant="compact" />
          ))}
        </div>

        {/* View All Link - Mobile */}
        <div className="mt-8 md:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors group px-6 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md"
            aria-label="Посмотреть все статьи"
          >
            <span className="font-medium">Все статьи</span>
            <ArrowRight
              className="h-5 w-5 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
