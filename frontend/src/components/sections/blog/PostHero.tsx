'use client';

import { Calendar, Clock, User, ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PostHeroProps {
  post: BlogPost;
  className?: string;
}

/**
 * PostHero Component
 * Full-width hero header for blog post pages with responsive design
 *
 * Features:
 * - Responsive heights: 60vh (desktop), 50vh (tablet), 40vh (mobile)
 * - Next.js Image optimization
 * - Breadcrumb navigation
 * - Floating tag badges with glass morphism
 * - Author meta information
 * - Excellent text readability on images
 */
export function PostHero({ post, className }: PostHeroProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        // Responsive heights
        "min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh]",
        "h-[40vh] md:h-[50vh] lg:h-[60vh]",
        className
      )}
    >
      {/* Background Image with Next.js Image */}
      <div className="absolute inset-0">
        <Image
          src={post.featuredImage?.url || '/images/blog/default.jpg'}
          alt={post.featuredImage?.alt || post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between container-custom py-6 md:py-8 lg:py-12">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center space-x-2 text-white/80 text-sm animate-fade-in"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
            aria-label="Главная"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <Link
            href="/blog"
            className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
          >
            Блог
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
          >
            {post.category.name}
          </Link>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl space-y-4 md:space-y-6">
          {/* Floating Tag Badges */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 animate-slide-up">
              {post.tags.slice(0, 3).map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className={cn(
                    "px-3 py-1.5 md:px-4 md:py-2",
                    "bg-white/20 backdrop-blur-md",
                    "hover:bg-white/30 hover:scale-105",
                    "text-white text-xs md:text-sm font-medium",
                    "rounded-full transition-all duration-200",
                    "border border-white/30",
                    "focus:outline-none focus:ring-2 focus:ring-white/50"
                  )}
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title with enhanced readability */}
          <h1
            className={cn(
              "font-bold text-white leading-tight",
              "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
              "animate-slide-up",
              // Enhanced text shadow for better readability
              "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]",
              "[text-shadow:_0_2px_12px_rgb(0_0_0_/_80%)]"
            )}
          >
            {post.title}
          </h1>

          {/* Meta Info Row */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6",
              "text-white/90 text-sm md:text-base",
              "animate-slide-up"
            )}
          >
            {/* Author */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/50 shadow-lg"
                />
              )}
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">{post.author.name}</span>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>

            {/* Read Time */}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{post.readTime} мин чтения</span>
            </div>
          </div>
        </div>

        {/* Back to Blog Button */}
        <div className="animate-fade-in">
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center space-x-2",
              "px-4 py-2 md:px-6 md:py-3",
              "bg-white/10 backdrop-blur-md",
              "hover:bg-white/20 hover:scale-105",
              "text-white text-sm md:text-base",
              "rounded-full border border-white/30",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-white/50"
            )}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Вернуться к блогу</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

