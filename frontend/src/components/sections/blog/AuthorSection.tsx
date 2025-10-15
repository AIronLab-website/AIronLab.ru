'use client';

import { Mail, Linkedin, Twitter, Github, CheckCircle, Bell } from 'lucide-react';
import { BlogAuthor } from '@/types/blog';
import { cn } from '@/lib/utils';

interface AuthorSectionProps {
  author: BlogAuthor;
  className?: string;
}

export function AuthorSection({ author, className }: AuthorSectionProps) {
  return (
    <section className={cn(
      "mt-16 p-8 md:p-10 rounded-3xl",
      "bg-gradient-to-br from-accent/5 via-white/80 to-accent/10",
      "border border-gray-100 shadow-xl",
      className
    )}>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Author Avatar with Verified Badge */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
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
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {author.name}
            </h3>
            {author.role && (
              <p className="text-lg text-accent font-medium">
                {author.role}
              </p>
            )}
          </div>

          {/* Bio */}
          {author.bio && (
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              {author.bio}
            </p>
          )}

          {/* Social Links and Actions */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {author.socialLinks?.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white hover:bg-accent/10 text-gray-600 hover:text-accent border border-gray-200 hover:border-accent/30 transition-all duration-200"
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
                  className="p-2 rounded-lg bg-white hover:bg-accent/10 text-gray-600 hover:text-accent border border-gray-200 hover:border-accent/30 transition-all duration-200"
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
                  className="p-2 rounded-lg bg-white hover:bg-accent/10 text-gray-600 hover:text-accent border border-gray-200 hover:border-accent/30 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}

              {author.email && (
                <a
                  href={`mailto:${author.email}`}
                  className="p-2 rounded-lg bg-white hover:bg-accent/10 text-gray-600 hover:text-accent border border-gray-200 hover:border-accent/30 transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Subscribe Button */}
            <button
              className={cn(
                "inline-flex items-center space-x-2 px-6 py-3 rounded-full",
                "bg-accent text-white font-semibold",
                "hover:bg-accent/90 hover:scale-105",
                "transition-all duration-300 shadow-lg hover:shadow-xl",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              )}
              onClick={() => {
                // Scroll to newsletter section
                const newsletter = document.querySelector('#newsletter');
                newsletter?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Bell className="w-4 h-4" />
              <span>Подписаться</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

