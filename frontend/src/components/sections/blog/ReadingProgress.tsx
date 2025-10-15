'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ReadingProgressProps {
  className?: string;
}

export function ReadingProgress({ className }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      // Get scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Get total scrollable height
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      // Calculate progress percentage
      const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    });
  }, []);

  useEffect(() => {
    // Update on scroll with passive listener for better performance
    window.addEventListener('scroll', updateProgress, { passive: true });

    // Initial update
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [updateProgress]);

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50 h-1 bg-transparent", className)}>
      <div
        className="h-full bg-gradient-to-r from-accent via-accent/80 to-accent/70 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </div>
  );
}

