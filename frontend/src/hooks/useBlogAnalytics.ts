'use client';

import { useEffect, useRef } from 'react';
import { trackScrollDepth, trackTimeOnPage, trackBlogPostView } from '@/lib/analytics';

interface UseBlogAnalyticsProps {
  postTitle: string;
  postSlug: string;
  enabled?: boolean;
}

/**
 * Custom hook for tracking blog post analytics
 * Tracks: page view, scroll depth, time on page
 */
export function useBlogAnalytics({ postTitle, postSlug, enabled = true }: UseBlogAnalyticsProps) {
  const scrollDepthTracked = useRef<Set<number>>(new Set());
  const startTime = useRef<number>(Date.now());
  const timeTracked = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // Track page view on mount
    trackBlogPostView(postTitle, postSlug);

    // Reset refs
    scrollDepthTracked.current = new Set();
    startTime.current = Date.now();
    timeTracked.current = false;

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollDepthTracked.current.has(milestone)) {
          scrollDepthTracked.current.add(milestone);
          trackScrollDepth(milestone, postSlug);
        }
      });
    };

    // Track time on page (after 10 seconds, 30 seconds, 1 minute, 3 minutes, 5 minutes)
    const timeIntervals = [
      { interval: 10000, tracked: false }, // 10 seconds
      { interval: 30000, tracked: false }, // 30 seconds
      { interval: 60000, tracked: false }, // 1 minute
      { interval: 180000, tracked: false }, // 3 minutes
      { interval: 300000, tracked: false }, // 5 minutes
    ];

    const timers: NodeJS.Timeout[] = [];

    timeIntervals.forEach(({ interval }) => {
      const timer = setTimeout(() => {
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000); // in seconds
        trackTimeOnPage(timeSpent, postSlug);
      }, interval);
      timers.push(timer);
    });

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track time on page when user leaves (before unload)
    const handleBeforeUnload = () => {
      if (!timeTracked.current) {
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
        trackTimeOnPage(timeSpent, postSlug);
        timeTracked.current = true;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      timers.forEach((timer) => clearTimeout(timer));

      // Track final time on page
      if (!timeTracked.current) {
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
        if (timeSpent > 5) {
          // Only track if spent more than 5 seconds
          trackTimeOnPage(timeSpent, postSlug);
        }
      }
    };
  }, [postTitle, postSlug, enabled]);
}
