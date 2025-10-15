'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ReadingProgressProps {
  className?: string;
}

export function ReadingProgress({ className }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Get scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Get total scrollable height
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate progress percentage
      const scrollProgress = (scrollTop / scrollHeight) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    // Update on scroll
    window.addEventListener('scroll', updateProgress);
    
    // Initial update
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/50", className)}>
      <div
        className="h-full bg-gradient-to-r from-accent via-accent/80 to-accent transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

