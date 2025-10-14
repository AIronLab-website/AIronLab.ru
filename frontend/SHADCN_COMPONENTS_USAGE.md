# shadcn/ui Components Usage Guide

This document provides examples of how to use the newly installed shadcn/ui components for the AIronLab blog.

## Installed Components

The following components have been successfully installed and are ready to use:

1. **Input** - Form input field
2. **Badge** - Small label/tag component
3. **Skeleton** - Loading placeholder
4. **Textarea** - Multi-line text input
5. **Avatar** - User profile picture component

## Component Examples

### 1. Input Component

```tsx
import { Input } from "@/components/ui/input"

// Basic usage
<Input type="email" placeholder="Enter your email" />

// With custom styling (matches AIronLab design)
<Input
  type="text"
  placeholder="Search articles..."
  className="glass-effect border-white/30"
/>
```

### 2. Badge Component

```tsx
import { Badge } from "@/components/ui/badge"

// Default variant (uses accent color #6366F1)
<Badge>New</Badge>

// Different variants
<Badge variant="default">AI & ML</Badge>
<Badge variant="secondary">Tutorial</Badge>
<Badge variant="destructive">Deprecated</Badge>
<Badge variant="outline">Draft</Badge>

// Custom styling for blog tags
<Badge className="bg-accent hover:bg-accent/80">
  Featured
</Badge>
```

### 3. Skeleton Component

```tsx
import { Skeleton } from "@/components/ui/skeleton"

// Blog post card skeleton
<div className="space-y-4">
  <Skeleton className="h-48 w-full rounded-lg" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>

// Avatar skeleton
<Skeleton className="h-12 w-12 rounded-full" />

// Text skeleton
<Skeleton className="h-4 w-full" />
```

### 4. Textarea Component

```tsx
import { Textarea } from "@/components/ui/textarea"

// Basic usage
<Textarea
  placeholder="Leave a comment..."
  rows={4}
/>

// With glass morphism effect
<Textarea
  placeholder="Write your feedback..."
  className="glass-effect border-white/30 min-h-[120px]"
/>
```

### 5. Avatar Component

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Basic avatar with image
<Avatar>
  <AvatarImage src="/authors/john-doe.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Author avatar for blog posts
<div className="flex items-center gap-3">
  <Avatar className="h-10 w-10">
    <AvatarImage src="/authors/author.jpg" alt="Author name" />
    <AvatarFallback className="bg-accent text-white">AN</AvatarFallback>
  </Avatar>
  <div>
    <p className="font-medium">Author Name</p>
    <p className="text-sm text-muted-foreground">2 days ago</p>
  </div>
</div>
```

## Blog-Specific Usage Examples

### Blog Post Card with Skeleton Loading

```tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

function BlogPostCard({ post, loading = false }) {
  if (loading) {
    return (
      <div className="glass-effect rounded-lg p-6 space-y-4">
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className="glass-effect rounded-lg p-6 hover:shadow-lg transition-shadow">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <div className="space-y-3">
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

        <h3 className="text-responsive-h3">{post.title}</h3>
        <p className="text-muted-foreground">{post.excerpt}</p>

        <div className="flex items-center gap-3 pt-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback className="bg-accent text-white">
              {post.author.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">{post.date}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
```

### Comment Form

```tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/Button"

function CommentForm() {
  return (
    <form className="space-y-4 glass-effect p-6 rounded-lg">
      <h3 className="text-responsive-h4">Leave a Comment</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Your name"
          className="glass-effect border-white/30"
        />
        <Input
          type="email"
          placeholder="Your email"
          className="glass-effect border-white/30"
        />
      </div>

      <Textarea
        placeholder="Your comment..."
        className="glass-effect border-white/30 min-h-[120px]"
      />

      <Button type="submit" className="w-full md:w-auto">
        Post Comment
      </Button>
    </form>
  )
}
```

### Search Bar

```tsx
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search articles..."
        className="pl-10 glass-effect border-white/30"
      />
    </div>
  )
}
```

## Design System Integration

All components are configured to work with the AIronLab design system:

- **Primary Color**: #000000 (Black)
- **Accent Color**: #6366F1 (Indigo)
- **Background**: #F5F5F5 (Light Gray)
- **Glass Morphism**: Use `glass-effect` utility class
- **Typography**: Use responsive text classes (`text-responsive-h1`, etc.)

## CSS Variables

The components use CSS variables defined in `globals.css`:

```css
--accent: #6366F1;
--accent-foreground: #FFFFFF;
--border: rgba(255, 255, 255, 0.3);
--muted: #F8FAFC;
--muted-foreground: #64748B;
```

## Accessibility Features

All components are built on Radix UI primitives and include:

- Keyboard navigation support
- Screen reader compatibility
- ARIA attributes
- Focus management
- Proper semantic HTML

## Mobile Responsiveness

Components are mobile-first and include:

- Touch-friendly sizes (min 44px tap targets)
- Responsive spacing
- Mobile-optimized layouts
- Accessible on all screen sizes

## Next Steps

1. Create blog post components using these UI elements
2. Implement loading states with Skeleton component
3. Add author information using Avatar component
4. Create comment/feedback forms with Input and Textarea
5. Add category/tag badges using Badge component
