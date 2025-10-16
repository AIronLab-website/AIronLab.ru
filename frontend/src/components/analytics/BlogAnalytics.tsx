'use client';

import { useBlogAnalytics } from '@/hooks/useBlogAnalytics';

interface BlogAnalyticsProps {
  postTitle: string;
  postSlug: string;
}

/**
 * Client-side component for tracking blog post analytics
 * Automatically tracks: page views, scroll depth, time on page
 */
export function BlogAnalytics({ postTitle, postSlug }: BlogAnalyticsProps) {
  useBlogAnalytics({ postTitle, postSlug, enabled: true });

  // This component doesn't render anything
  return null;
}
