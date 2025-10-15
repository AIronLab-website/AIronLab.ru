'use client';

import { Mail, Linkedin, Twitter, Github, CheckCircle, UserPlus } from 'lucide-react';
import { BlogAuthor } from '@/types/blog';
import { cn } from '@/lib/utils';

interface AuthorSectionProps {
  author: BlogAuthor;
  variant?: 'full' | 'compact';
  className?: string;
}

export function AuthorSection({ author, variant = 'full', className }: AuthorSectionProps) {
  const isCompact = variant === 'compact';

  return (
    <section className={cn(
      "mt-16 p-8 md:p-10 rounded-3xl",
      "bg-gradient-to-br from-gray-50 to-white",
      "border border-gray-100 shadow-xl",
      className
    )}>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Author Avatar with Verified Badge */}
        <div className="relative flex-shrink-0">
          <div className={cn(
            "rounded-full overflow-hidden ring-4 ring-accent/20 shadow-xl",
            isCompact ? "w-20 h-20" : "w-24 h-24"
          )}>
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center text-white text-3xl font-bold">
                {author.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Verified Badge */}
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
            <CheckCircle className="w-6 h-6 text-accent fill-current" />
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1">
          {/* Name and Role */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {author.name}
            </h3>
            {author.role && (
              <p className="text-lg text-accent font-medium">
                {author.role}
              </p>
            )}
          </div>

          {/* Bio */}
          {author.bio && !isCompact && (
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              {author.bio}
            </p>
          )}

          {/* Stats */}
          {author.stats && !isCompact && (
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-accent">
                  {author.stats.articles}
                </span>
                <span className="text-sm text-gray-600">
                  {author.stats.articles === 1 ? 'статья' : author.stats.articles < 5 ? 'статьи' : 'статей'}
                </span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-accent">
                  {author.stats.experience}
                </span>
                <span className="text-sm text-gray-600">
                  {author.stats.experience === 1 ? 'год' : author.stats.experience < 5 ? 'года' : 'лет'} опыта
                </span>
              </div>
            </div>
          )}

          {/* Social Links and Actions */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Social Links with Glass Morphism */}
            <div className="flex items-center gap-3">
              {author.socialLinks?.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2.5 rounded-lg backdrop-blur-sm",
                    "bg-white/80 hover:bg-white",
                    "text-gray-600 hover:text-accent",
                    "border border-gray-200/50 hover:border-accent/30",
                    "shadow-sm hover:shadow-md",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-accent/20"
                  )}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}

              {author.socialLinks?.twitter && (
                <a
                  href={author.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2.5 rounded-lg backdrop-blur-sm",
                    "bg-white/80 hover:bg-white",
                    "text-gray-600 hover:text-accent",
                    "border border-gray-200/50 hover:border-accent/30",
                    "shadow-sm hover:shadow-md",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-accent/20"
                  )}
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}

              {author.socialLinks?.github && (
                <a
                  href={author.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2.5 rounded-lg backdrop-blur-sm",
                    "bg-white/80 hover:bg-white",
                    "text-gray-600 hover:text-accent",
                    "border border-gray-200/50 hover:border-accent/30",
                    "shadow-sm hover:shadow-md",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-accent/20"
                  )}
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}

              {author.email && (
                <a
                  href={`mailto:${author.email}`}
                  className={cn(
                    "p-2.5 rounded-lg backdrop-blur-sm",
                    "bg-white/80 hover:bg-white",
                    "text-gray-600 hover:text-accent",
                    "border border-gray-200/50 hover:border-accent/30",
                    "shadow-sm hover:shadow-md",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-accent/20"
                  )}
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Subscribe Button - Outline Variant */}
            <button
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                "bg-transparent border-2 border-accent",
                "text-accent font-semibold",
                "hover:bg-accent hover:text-white",
                "transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                "shadow-sm hover:shadow-md"
              )}
              onClick={() => {
                // Scroll to newsletter section
                const newsletter = document.querySelector('#newsletter');
                newsletter?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <UserPlus className="w-4 h-4" />
              <span>Подписаться</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

