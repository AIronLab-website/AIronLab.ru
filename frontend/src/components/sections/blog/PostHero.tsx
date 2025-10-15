'use client';

import { Calendar, Clock, User, ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { formatRelativeDate } from '@/lib/blogUtils';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

interface PostHeroProps {
  post: BlogPost;
}

export function PostHero({ post }: PostHeroProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${post.featuredImage?.url || '/images/blog/default.jpg'})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between container-custom py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-white/80 text-sm">
          <Link 
            href="/" 
            className="flex items-center hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href="/blog" 
            className="hover:text-white transition-colors"
          >
            Блог
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href={`/blog/category/${post.category.slug}`}
            className="hover:text-white transition-colors"
          >
            {post.category.name}
          </Link>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl">
          {/* Floating Tag Badges */}
          <div className="flex flex-wrap gap-2 mb-6 animate-slide-up">
            {post.tags?.slice(0, 3).map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="px-4 py-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-sm font-medium rounded-full transition-all duration-200 border border-white/30"
              >
                #{tag.name}
              </Link>
            ))}
          </div>

          {/* Title Overlay */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl animate-slide-up">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 animate-slide-up">
            {/* Author */}
            <div className="flex items-center space-x-3">
              {post.author.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full border-2 border-white/50 shadow-lg"
                />
              )}
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{post.author.name}</span>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>

            {/* Read Time */}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} мин чтения</span>
            </div>
          </div>
        </div>

        {/* Back to Blog Button - Bottom Left */}
        <div className="animate-fade-in">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/30 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Вернуться к блогу</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

