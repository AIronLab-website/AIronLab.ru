# AIronLab Blog System

Complete TypeScript-based blog system for AIronLab.ru with glass morphism design, full responsiveness, and accessibility features.

## Table of Contents

- [Overview](#overview)
- [Components](#components)
- [Types](#types)
- [Utilities](#utilities)
- [Hooks](#hooks)
- [Usage Examples](#usage-examples)
- [Design System Integration](#design-system-integration)
- [Accessibility](#accessibility)

## Overview

The AIronLab blog system includes:

- **Type-safe** - Full TypeScript support with comprehensive type definitions
- **Responsive** - Mobile-first design that works on all devices
- **Accessible** - WCAG AA compliant with keyboard navigation
- **Performant** - Optimized images, debounced search, memoized filtering
- **Beautiful** - Glass morphism design with smooth animations

## Components

### BlogCard

Display blog posts in three variants:

#### Variants

1. **Featured** - Large hero card for featured posts
2. **Standard** - Grid card for post listings
3. **Compact** - List item for sidebars

#### Props

```typescript
interface BlogCardProps {
  post: BlogPostPreview;
  variant?: BlogCardVariant; // 'featured' | 'standard' | 'compact'
  className?: string;
}
```

#### Example

```tsx
import { BlogCard } from "@/components/sections/blog";

<BlogCard post={post} variant="featured" />
<BlogCard post={post} variant="standard" />
<BlogCard post={post} variant="compact" />
```

### TagFilter

Interactive tag filtering component with multi-select support.

#### Features

- Single/multi-select tag filtering
- "All" option to clear filters
- Active/inactive visual states
- Horizontal scrollable on mobile
- Optional tag count display
- Show more/less functionality

#### Props

```typescript
interface TagFilterProps {
  tags: BlogTag[];
  selectedTags?: string[];
  onTagSelect?: (tagSlug: string) => void;
  onTagDeselect?: (tagSlug: string) => void;
  onClearAll?: () => void;
  showClearAll?: boolean;
  className?: string;
  maxVisibleTags?: number;
}
```

#### Example

```tsx
import { TagFilter } from "@/components/sections/blog";

<TagFilter
  tags={availableTags}
  selectedTags={selectedTags}
  onTagSelect={handleTagSelect}
  onTagDeselect={handleTagDeselect}
  onClearAll={clearTags}
  maxVisibleTags={6}
/>
```

### SearchBar

Advanced search bar with debouncing and loading states.

#### Features

- Debounced search (customizable delay)
- Clear button when text is present
- Glass morphism background
- Focus states with accent color
- Loading indicator
- Keyboard shortcuts (Escape to clear)
- Minimum character threshold

#### Props

```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  autoFocus?: boolean;
  minCharacters?: number;
  showLoadingIndicator?: boolean;
  defaultValue?: string;
}
```

#### Example

```tsx
import { SearchBar } from "@/components/sections/blog";

<SearchBar
  onSearch={setSearchQuery}
  placeholder="Поиск статей..."
  debounceMs={300}
  minCharacters={2}
/>
```

### BlogSection

Complete blog section with search, filtering, and post grid.

#### Features

- Featured post display
- Search functionality
- Tag-based filtering
- Responsive grid layout
- Empty state handling
- Results summary

#### Props

```typescript
interface BlogSectionProps {
  posts: BlogPostPreview[];
  featuredPost?: BlogPostPreview;
  showSearch?: boolean;
  showTagFilter?: boolean;
  className?: string;
  title?: string;
  description?: string;
}
```

#### Example

```tsx
import { BlogSection } from "@/components/sections/blog";

<BlogSection
  posts={allPosts}
  featuredPost={featuredPost}
  showSearch={true}
  showTagFilter={true}
  title="Блог AIronLab"
  description="Статьи и инсайты о разработке AI-решений"
/>
```

## Types

### BlogPost

Complete blog post data structure:

```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  tags: BlogTag[];
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
  };
  readTime: number;
  status?: BlogPostStatus;
  views?: number;
  likes?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  isFeatured?: boolean;
}
```

### BlogPostPreview

Lightweight version for lists:

```typescript
interface BlogPostPreview {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  category: {
    name: string;
    slug: string;
    color?: string;
  };
  tags: {
    name: string;
    slug: string;
  }[];
  featuredImage: {
    url: string;
    alt: string;
  };
  readTime: number;
  isFeatured?: boolean;
}
```

### Other Types

- `BlogAuthor` - Author information
- `BlogCategory` - Post category
- `BlogTag` - Post tag
- `BlogCardVariant` - Card display variant
- `BlogFilterOptions` - Filtering options
- `BlogPagination` - Pagination metadata

## Utilities

### blogUtils.ts

Helper functions for blog operations:

```typescript
// Calculate reading time
calculateReadTime(content: string): number

// Format dates
formatDate(dateString: string, locale?: string): string
formatRelativeDate(dateString: string, locale?: string): string

// Content manipulation
generateSlug(title: string): string
extractExcerpt(content: string, maxLength?: number): string

// Data aggregation
getUniqueTags(posts: BlogPostPreview[]): BlogTag[]
getUniqueCategories(posts: BlogPostPreview[]): BlogCategory[]

// Sorting and grouping
sortPosts(posts: BlogPostPreview[], sortBy?: string, order?: string): BlogPostPreview[]
groupPostsByCategory(posts: BlogPostPreview[]): Record<string, BlogPostPreview[]>
groupPostsByMonth(posts: BlogPostPreview[]): Record<string, BlogPostPreview[]>

// Conversion
postToPreview(post: BlogPost): BlogPostPreview

// SEO
generateBlogPostMetadata(post: BlogPost): Metadata

// Validation
validateBlogPost(post: Partial<BlogPost>): { isValid: boolean; errors: string[] }
```

## Hooks

### useBlogSearch

Client-side blog post filtering and searching:

```typescript
const {
  searchQuery,
  setSearchQuery,
  selectedTags,
  selectedCategory,
  setSelectedCategory,
  filteredPosts,
  handleTagSelect,
  handleTagDeselect,
  clearTags,
  clearAllFilters,
  hasActiveFilters,
  resultsCount,
  totalCount,
} = useBlogSearch({
  posts: allPosts,
  initialSearchQuery: "",
  initialSelectedTags: [],
  initialCategory: "",
});
```

## Usage Examples

### Basic Blog Page

```tsx
"use client";

import { BlogSection, mockBlogPosts } from "@/components/sections/blog";

export default function BlogPage() {
  const featuredPost = mockBlogPosts.find((post) => post.isFeatured);
  const regularPosts = mockBlogPosts.filter((post) => !post.isFeatured);

  return (
    <main>
      <BlogSection
        posts={regularPosts}
        featuredPost={featuredPost}
        showSearch={true}
        showTagFilter={true}
      />
    </main>
  );
}
```

### Custom Filtering

```tsx
"use client";

import {
  BlogCard,
  TagFilter,
  SearchBar,
  useBlogSearch,
  getUniqueTags,
  mockBlogPosts,
} from "@/components/sections/blog";

export default function CustomBlogPage() {
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    filteredPosts,
    handleTagSelect,
    handleTagDeselect,
    clearTags,
  } = useBlogSearch({ posts: mockBlogPosts });

  const availableTags = getUniqueTags(mockBlogPosts);

  return (
    <div className="container-custom spacing-responsive">
      <SearchBar onSearch={setSearchQuery} />

      <TagFilter
        tags={availableTags}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        onTagDeselect={handleTagDeselect}
        onClearAll={clearTags}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} variant="standard" />
        ))}
      </div>
    </div>
  );
}
```

### Sidebar Recent Posts

```tsx
import { BlogList, mockBlogPosts } from "@/components/sections/blog";

export function BlogSidebar() {
  const recentPosts = mockBlogPosts.slice(0, 5);

  return (
    <aside className="space-y-6">
      <BlogList posts={recentPosts} title="Последние статьи" />
    </aside>
  );
}
```

## Design System Integration

### Glass Morphism

All components use the `.glass-effect` utility class:

```css
.glass-effect {
  background: rgba(245, 245, 245, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
```

### Accent Color

Primary accent color: `#6366F1` (defined as `--accent` in CSS variables)

### Typography

Components use responsive typography classes:

- `.text-responsive-h1` - Main headings
- `.text-responsive-h2` - Section headings
- `.text-responsive-h3` - Card headings
- `.text-responsive-h4` - Small headings
- `.text-responsive-body` - Body text
- `.text-responsive-lead` - Lead text

### Animations

Available animation classes:

- `.animate-slide-up` - Slide up on mount
- `.animate-slide-down` - Slide down on mount
- `.animate-fade-in` - Fade in on mount
- `.animate-scale-in` - Scale in on mount

### Spacing

- `.spacing-responsive` - Responsive vertical spacing
- `.container-custom` - Container with responsive padding

## Accessibility

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Proper focus states with accent color ring
- Tab order follows visual layout

### Screen Readers

- Semantic HTML elements (`<article>`, `<nav>`, `<button>`)
- ARIA labels on all interactive elements
- ARIA live regions for dynamic content
- Proper heading hierarchy

### WCAG Compliance

- Color contrast ≥ 4.5:1 for normal text
- Touch targets ≥ 44×44 pixels
- Focus indicators clearly visible
- No information conveyed by color alone
- Reduced motion support

### Testing Checklist

- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces all content correctly
- [ ] Focus states are visible
- [ ] Touch targets are large enough
- [ ] Works with reduced motion preferences
- [ ] Color contrast meets WCAG AA standards

## Performance

### Optimizations

- **Next.js Image** - Automatic image optimization
- **Debounced Search** - Reduces unnecessary searches
- **Memoized Filtering** - Prevents unnecessary re-renders
- **Code Splitting** - Components load on demand
- **CSS-in-JS** - Only used styles are loaded

### Best Practices

- Use `BlogPostPreview` instead of full `BlogPost` for lists
- Implement pagination for large post counts
- Lazy load images below the fold
- Use static generation for blog pages when possible

## Future Enhancements

Potential features to add:

- [ ] Infinite scroll pagination
- [ ] Category filtering
- [ ] Sort by date/popularity
- [ ] Social sharing buttons
- [ ] Reading progress indicator
- [ ] Table of contents for long posts
- [ ] Related posts section
- [ ] Comments system
- [ ] Bookmark/favorite functionality
- [ ] RSS feed generation

## Support

For questions or issues, contact the AIronLab development team or refer to the main project documentation.
