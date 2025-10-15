'use client';

import { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  // Extract headings from content
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    
    const tocItems: TOCItem[] = Array.from(headings).map((heading, index) => {
      const id = `heading-${index}`;
      const level = parseInt(heading.tagName.substring(1));
      return {
        id,
        text: heading.textContent || '',
        level,
      };
    });

    setToc(tocItems);
  }, [content]);

  // Scroll spy - track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    );

    // Observe all headings in the document
    const headings = document.querySelectorAll('article h2, article h3');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [toc]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
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
      <aside className={cn(
        "hidden lg:block sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto",
        className
      )}>
        <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
          <div className="flex items-center space-x-2 mb-4 text-accent">
            <BookOpen className="h-5 w-5" />
            <h3 className="font-bold text-lg">Содержание</h3>
          </div>

          <nav>
            <ul className="space-y-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200",
                      item.level === 3 && "pl-6",
                      activeId === item.id
                        ? "bg-accent/10 text-accent font-semibold border-l-4 border-accent"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Collapsible */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center space-x-2 text-accent">
            <BookOpen className="h-5 w-5" />
            <span className="font-bold">Содержание</span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600" />
          )}
        </button>

        {isOpen && (
          <div className="mt-2 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md animate-slide-down">
            <nav>
              <ul className="space-y-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200",
                        item.level === 3 && "pl-6",
                        activeId === item.id
                          ? "bg-accent/10 text-accent font-semibold border-l-4 border-accent"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
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

