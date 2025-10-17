'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, ChevronDown, ChevronUp, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackToCClick } from '@/lib/analytics';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

/**
 * TableOfContents Component
 * Auto-generated table of contents with scroll spy functionality
 *
 * Features:
 * - Auto-generation from H2/H3 headings
 * - Scroll spy - highlights active section
 * - Smooth scroll navigation
 * - Sticky positioning on desktop
 * - Collapsible on mobile
 * - Reading progress indicator
 * - Full accessibility support
 */
export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate slug from heading text
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Extract headings and add IDs to them in the DOM
  useEffect(() => {
    // Get all headings from the article
    const articleElement = document.querySelector('#article-content');
    if (!articleElement) return;

    const headings = articleElement.querySelectorAll('h2, h3');
    const tocItems: TOCItem[] = [];

    headings.forEach((heading, index) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1));

      // Generate or use existing ID
      let id = heading.id;
      if (!id) {
        id = generateSlug(text) || `heading-${index}`;
        heading.id = id;
      }

      // Add scroll-margin for better UX
      heading.classList.add('scroll-mt-24');

      tocItems.push({ id, text, level });
    });

    setToc(tocItems);
  }, [content]);

  // Scroll spy - track active section with improved logic
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const intersecting = entries.find(entry => entry.isIntersecting);
        if (intersecting) {
          setActiveId(intersecting.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0,
      }
    );

    observerRef.current = observer;

    // Observe all headings in the article
    const articleElement = document.querySelector('#article-content');
    if (articleElement) {
      const headings = articleElement.querySelectorAll('h2, h3');
      headings.forEach((heading) => observer.observe(heading));
    }

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [toc]);

  // Reading progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const articleElement = document.querySelector('#article-content');
      if (!articleElement || !(articleElement instanceof HTMLElement)) return;

      const articleTop = articleElement.getBoundingClientRect().top + window.pageYOffset;
      const articleHeight = articleElement.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      // Calculate progress
      const scrollableDistance = articleHeight - windowHeight;
      const scrolled = scrollTop - articleTop;
      const progress = Math.min(Math.max((scrolled / scrollableDistance) * 100, 0), 100);

      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string, sectionText: string) => {
    // Track ToC click
    trackToCClick(sectionText);

    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Close mobile menu after click
      setIsOpen(false);
    }
  };

  if (toc.length === 0) return null;

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={cn(
          "hidden lg:block sticky top-24 h-fit max-h-[calc(100vh-8rem)]",
          className
        )}
        aria-label="Table of contents"
      >
        <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-accent">
              <List className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-bold text-lg">Содержание</h2>
            </div>
            <span className="text-xs text-gray-500">
              {Math.round(readingProgress)}%
            </span>
          </div>

          {/* Table of Contents Links */}
          <nav className="max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin">
            <ul className="space-y-1" role="list">
              {toc.map((item, index) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id, item.text)}
                    className={cn(
                      "w-full text-left text-sm py-3 px-3 rounded-lg min-h-[44px] flex items-center",
                      "transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                      item.level === 3 && "pl-6 text-xs",
                      activeId === item.id
                        ? "bg-accent/10 text-accent font-semibold border-l-4 border-accent"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:pl-4"
                    )}
                    aria-label={`Navigate to ${item.text}`}
                    aria-current={activeId === item.id ? 'location' : undefined}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Reading Progress Bar */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>Прогресс чтения</span>
              <span className="font-medium">{Math.round(readingProgress)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-300 ease-out"
                style={{ width: `${readingProgress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(readingProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Reading progress"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Collapsible */}
      <div className="lg:hidden mb-8" role="navigation" aria-label="Mobile table of contents">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between p-4 rounded-xl",
            "bg-white/70 backdrop-blur-sm border border-gray-100",
            "shadow-md hover:shadow-lg transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          )}
          aria-expanded={isOpen}
          aria-controls="mobile-toc-content"
        >
          <div className="flex items-center space-x-2 text-accent">
            <List className="h-5 w-5" aria-hidden="true" />
            <span className="font-bold">Содержание</span>
            <span className="text-xs text-gray-500">({toc.length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{Math.round(readingProgress)}%</span>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-600 transition-transform" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600 transition-transform" aria-hidden="true" />
            )}
          </div>
        </button>

        {isOpen && (
          <div
            id="mobile-toc-content"
            className="mt-2 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md animate-slide-down"
          >
            {/* Reading Progress Bar */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>Прогресс чтения</span>
                <span className="font-medium">{Math.round(readingProgress)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-300 ease-out"
                  style={{ width: `${readingProgress}%` }}
                  role="progressbar"
                  aria-valuenow={Math.round(readingProgress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Reading progress"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <nav>
              <ul className="space-y-1 max-h-96 overflow-y-auto" role="list">
                {toc.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id, item.text)}
                      className={cn(
                        "w-full text-left text-sm py-3 px-3 rounded-lg min-h-[44px] flex items-center",
                        "transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                        item.level === 3 && "pl-6 text-xs",
                        activeId === item.id
                          ? "bg-accent/10 text-accent font-semibold border-l-4 border-accent"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100"
                      )}
                      aria-label={`Navigate to ${item.text}`}
                      aria-current={activeId === item.id ? 'location' : undefined}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}

