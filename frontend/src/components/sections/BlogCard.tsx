"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Sparkles, Brain, Cpu, Bot, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { trackBlogPostClick } from "@/lib/analytics";
import type { BlogPostPreview, BlogCardVariant } from "@/types/blog";

interface BlogCardProps {
  post: BlogPostPreview;
  variant?: BlogCardVariant;
  className?: string;
}

/**
 * BlogCard Component
 * Displays blog post previews in three variants: featured, standard, compact
 *
 * Features:
 * - Glass morphism design with hover effects
 * - Responsive layouts for all screen sizes
 * - Author information with avatar
 * - Category and tag badges
 * - Read time and publish date indicators
 * - Next.js Image optimization
 * - Accessible with keyboard navigation
 */
export function BlogCard({ post, variant = "standard", className }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getAuthorInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Track post click for analytics
  const handlePostClick = () => {
    trackBlogPostClick(post.title, post.slug);
  };

  // Featured Variant - Large hero card
  if (variant === "featured") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        onClick={handlePostClick}
        className={cn(
          "group block relative overflow-hidden rounded-2xl",
          "bg-white/50 backdrop-blur-md border border-gray-100",
          "transition-all duration-300 ease-out",
          "hover:scale-[1.02] hover:shadow-2xl hover:border-accent/30",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
          "animate-slide-up",
          className
        )}
        aria-label={`Read article: ${post.title}`}
      >
        {/* Floating AI Icons */}
        <div className="absolute top-8 right-8 text-accent/10 animate-float pointer-events-none" aria-hidden="true">
          <Brain className="h-16 w-16 md:h-20 md:w-20" />
        </div>
        <div className="absolute top-20 left-12 text-purple-400/10 animate-float-delayed pointer-events-none" aria-hidden="true">
          <Cpu className="h-12 w-12 md:h-16 md:w-16" />
        </div>
        <div className="absolute top-32 right-24 text-blue-400/10 animate-float pointer-events-none" aria-hidden="true">
          <Bot className="h-14 w-14 md:h-18 md:w-18" />
        </div>
        <div className="absolute top-16 left-32 text-accent/10 animate-float-delayed pointer-events-none" aria-hidden="true">
          <Network className="h-10 w-10 md:h-14 md:w-14" />
        </div>

        {/* Featured Image Container */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
          {/* Featured Badge + Category */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 text-sm md:text-base px-4 py-1.5 flex items-center gap-2">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Рекомендуем</span>
            </Badge>
            <Badge
              className="bg-accent text-white hover:bg-accent/90 text-sm md:text-base px-4 py-1.5"
              style={{ backgroundColor: post.category.color || "#6366F1" }}
            >
              {post.category.name}
            </Badge>
          </div>

          {/* Title */}
          <h2 className="text-responsive-h2 text-white mb-4 line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-responsive-body text-white/90 mb-6 line-clamp-3 max-w-3xl">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80">
            {/* Author */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 md:h-12 md:w-12 ring-2 ring-white/20">
                {post.author.avatar ? (
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                ) : null}
                <AvatarFallback className="bg-accent text-white text-sm">
                  {getAuthorInitials(post.author.name)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm md:text-base">{post.author.name}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm md:text-base">{formatDate(post.publishedAt)}</span>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm md:text-base">{post.readTime} мин</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag.slug}
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 text-xs md:text-sm"
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Read More Arrow */}
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12">
            <div className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-accent text-white group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Standard Variant - Grid card
  if (variant === "standard") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        onClick={handlePostClick}
        className={cn(
          "group block overflow-hidden rounded-xl",
          "bg-white/70 backdrop-blur-sm border border-gray-100",
          "transition-all duration-300 ease-out",
          "hover:scale-[1.02] hover:shadow-2xl hover:border-accent/30",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
          "h-full flex flex-col",
          className
        )}
        aria-label={`Read article: ${post.title}`}
      >
        {/* Featured Image */}
        <div className="relative h-48 md:h-56 w-full overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          {/* Category Badge Overlay */}
          <div className="absolute top-4 left-4">
            <Badge
              className="bg-accent text-white hover:bg-accent/90"
              style={{ backgroundColor: post.category.color || "#6366F1" }}
            >
              {post.category.name}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-responsive-h4 mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-responsive-small text-muted-foreground mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag.slug} variant="outline" className="text-xs">
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {/* Author */}
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {post.author.avatar ? (
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                ) : null}
                <AvatarFallback className="bg-accent text-white text-xs">
                  {getAuthorInitials(post.author.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{post.author.name}</span>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">{post.readTime} мин</span>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 mt-3 text-muted-foreground">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm">{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Compact Variant - List item
  return (
    <Link
      href={`/blog/${post.slug}`}
      onClick={handlePostClick}
      className={cn(
        "group flex gap-4 p-4 rounded-lg",
        "bg-white/70 backdrop-blur-sm border border-gray-100",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:shadow-2xl hover:border-accent/30",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        className
      )}
      aria-label={`Read article: ${post.title}`}
    >
      {/* Featured Image */}
      <div className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 80px, 96px"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Category */}
        <Badge
          className="mb-2 text-xs"
          style={{ backgroundColor: post.category.color || "#6366F1" }}
        >
          {post.category.name}
        </Badge>

        {/* Title */}
        <h4 className="text-base md:text-lg font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-300">
          {post.title}
        </h4>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground">
          {/* Author */}
          <span className="font-medium">{post.author.name}</span>

          {/* Date */}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          {/* Read Time */}
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            <span>{post.readTime} мин</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
