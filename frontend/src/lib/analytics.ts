/**
 * Analytics Tracking Utilities
 * Basic event tracking for blog interactions
 */

export interface BlogAnalyticsEvent {
  event: 'blog_search' | 'blog_filter_tag' | 'blog_filter_clear' | 'blog_post_click' | 'newsletter_subscribe' | 'newsletter_error';
  properties?: {
    query?: string;
    tag?: string;
    postTitle?: string;
    postSlug?: string;
    filterCount?: number;
    email?: string;
    source?: string;
    error?: string;
  };
}

/**
 * Track blog analytics event
 * Can be integrated with Yandex.Metrika, Google Analytics, or custom analytics
 */
export function trackBlogEvent(event: BlogAnalyticsEvent) {
  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event.event, event.properties);
  }

  // Yandex.Metrika integration
  if (typeof window !== 'undefined' && (window as any).ym) {
    (window as any).ym(process.env.NEXT_PUBLIC_YM_ID, 'reachGoal', event.event, event.properties);
  }

  // Google Analytics integration (if needed)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.event, event.properties);
  }

  // Custom analytics endpoint (optional)
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(event),
  // });
}

/**
 * Track search query
 */
export function trackBlogSearch(query: string) {
  trackBlogEvent({
    event: 'blog_search',
    properties: { query },
  });
}

/**
 * Track tag filter selection
 */
export function trackBlogTagFilter(tag: string, filterCount: number) {
  trackBlogEvent({
    event: 'blog_filter_tag',
    properties: { tag, filterCount },
  });
}

/**
 * Track filter clear
 */
export function trackBlogFilterClear() {
  trackBlogEvent({
    event: 'blog_filter_clear',
  });
}

/**
 * Track blog post click (conversion tracking)
 */
export function trackBlogPostClick(postTitle: string, postSlug: string) {
  trackBlogEvent({
    event: 'blog_post_click',
    properties: { postTitle, postSlug },
  });
}

/**
 * Track newsletter subscription
 */
export function trackNewsletterSubscribe(email: string, source: string = 'blog') {
  trackBlogEvent({
    event: 'newsletter_subscribe',
    properties: { 
      email: email.replace(/./g, '*'), // Hash email for privacy
      source 
    },
  });
}

/**
 * Track newsletter subscription error
 */
export function trackNewsletterError(error: string) {
  trackBlogEvent({
    event: 'newsletter_error',
    properties: { error },
  });
}

