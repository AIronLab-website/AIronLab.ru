'use client';

import { cn } from '@/lib/utils';

interface LoadingStateProps {
  count?: number;
  className?: string;
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100 p-6 animate-fade-in">
      {/* Image Skeleton */}
      <div className="relative h-48 mb-4 rounded-lg bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
      </div>

      {/* Category Badge Skeleton */}
      <div className="mb-3">
        <div className="inline-block h-6 w-24 rounded-full bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-6 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-5/6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Meta Info Skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Tags Skeleton */}
      <div className="flex gap-2 mt-4">
        <div className="h-6 w-16 rounded-full bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
        <div className="h-6 w-20 rounded-full bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
        <div className="h-6 w-14 rounded-full bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function LoadingState({ count = 9, className }: LoadingStateProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
      className
    )}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}

