'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn, getImagePath } from '@/lib/utils';

export const BlogHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleContactClick = () => {
    // Переходим на главную страницу к секции контактов
    window.location.href = '/#contact';
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'animate-slide-down',
        isScrolled 
          ? 'glass-effect border-b border-white/30' 
          : 'bg-transparent'
      )}
    >
      {/* Граница снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between h-12">
          {/* Кликабельный логотип */}
          <button
            onClick={handleLogoClick}
            className="flex items-center hover:scale-105 transition-transform duration-200 active:scale-95"
            data-clickable="true"
            aria-label="Вернуться на главную"
          >
            <img
              src={getImagePath('/images/logo.png')}
              alt="AIronLab Logo"
              className="h-6 sm:h-8 md:h-9 w-auto object-contain"
            />
          </button>

          {/* Кнопка оставить заявку */}
          <Button
            onClick={handleContactClick}
            className="relative overflow-hidden group px-4 py-2"
            size="sm"
            data-clickable="true"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Оставить заявку</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      </nav>
    </header>
  );
}; 