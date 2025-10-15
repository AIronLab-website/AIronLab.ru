'use client';

import { BlogPostPreview } from '@/types/blog';
import { Calendar, Clock, Sparkles, Brain, Cpu, Bot, Network } from 'lucide-react';
import { formatRelativeDate } from '@/lib/blogUtils';
import { trackBlogPostClick } from '@/lib/analytics';
import Link from 'next/link';

interface FeaturedPostProps {
  post: BlogPostPreview;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  // Track post click for analytics
  const handlePostClick = () => {
    trackBlogPostClick(post.title, post.slug);
  };
  return (
    <section className="relative mb-20 animate-slide-up">
      {/* Hero Container */}
      <div className="relative h-[450px] md:h-[500px] rounded-3xl overflow-hidden group">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url(${post.featuredImage?.url || '/images/blog/default.jpg'})`,
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        </div>

        {/* Floating AI Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Brain Icon - Top Left */}
          <div className="absolute top-10 left-10 animate-float opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <Brain className="w-12 h-12 md:w-16 md:h-16 text-accent" style={{ animationDelay: '0s' }} />
          </div>
          
          {/* CPU Icon - Top Right */}
          <div className="absolute top-16 right-16 animate-float opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <Cpu className="w-10 h-10 md:w-14 md:h-14 text-accent" style={{ animationDelay: '0.5s' }} />
          </div>
          
          {/* Bot Icon - Bottom Left */}
          <div className="absolute bottom-24 left-16 animate-float opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <Bot className="w-11 h-11 md:w-15 md:h-15 text-accent" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Network Icon - Bottom Right */}
          <div className="absolute bottom-32 right-12 animate-float opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <Network className="w-9 h-9 md:w-12 md:h-12 text-accent" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>

        {/* Content Card with Glass Morphism */}
        <div className="absolute inset-0 flex items-end p-6 md:p-10">
          <div className="w-full max-w-4xl bg-white/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl transition-all duration-500 hover:bg-white/60 hover:backdrop-blur-lg">
            {/* Featured Badge */}
            <div className="inline-flex items-center space-x-2 bg-accent/90 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-4 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Рекомендуем</span>
            </div>

            {/* Category */}
            <div className="mb-3">
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="inline-block px-3 py-1 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: `${post.category.color}20`,
                  color: post.category.color,
                }}
              >
                {post.category.name}
              </Link>
            </div>

            {/* Title */}
            <Link href={`/blog/${post.slug}`} onClick={handlePostClick}>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 line-clamp-2 hover:text-accent transition-colors duration-300 cursor-pointer">
                {post.title}
              </h2>
            </Link>

            {/* Excerpt */}
            <p className="text-base md:text-lg text-gray-700 mb-6 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Metadata and Tags Row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Author */}
              <div className="flex items-center space-x-2">
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  />
                )}
                <span className="text-sm font-medium text-gray-800">{post.author.name}</span>
              </div>

              {/* Date */}
              <div className="flex items-center space-x-1 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatRelativeDate(post.publishedAt)}</span>
              </div>

              {/* Read Time */}
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.readTime} мин</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.slice(0, 3).map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className="px-3 py-1 bg-gray-100/80 backdrop-blur-sm hover:bg-accent/10 text-gray-700 hover:text-accent text-sm rounded-full transition-all duration-200 border border-gray-200/50"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href={`/blog/${post.slug}`}
              onClick={handlePostClick}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group/btn"
            >
              <span>Читать статью</span>
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

