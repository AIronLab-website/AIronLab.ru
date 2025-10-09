"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, scrollToSection, getImagePath } from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  id: string;
  isExternal?: boolean;
}

const navigationItems: NavigationItem[] = [
  { name: "Главная", href: "#hero", id: "hero" },
  { name: "Преимущества", href: "#benefits", id: "benefits" },
  { name: "Услуги", href: "#services", id: "services" },
  { name: "Проекты", href: "#projects", id: "projects" },
  { name: "Тарифы", href: "#pricing", id: "pricing" },
  { name: "FAQ", href: "#faq", id: "faq" },
  { name: "Блог", href: "/blog", id: "blog", isExternal: true },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleSectionChange = () => {
      const sections = navigationItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('header')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionChange);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionChange);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId: string, isExternal?: boolean, href?: string) => {
    if (isExternal && href) {
      window.location.href = href;
    } else {
      scrollToSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    scrollToSection("contact");
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "animate-slide-down",
        isScrolled 
          ? "glass-effect border-b border-white/30" 
          : "bg-transparent"
      )}
    >
      {/* Граница снизу как в макете */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between h-12">
          {/* Логотип */}
          <div className="flex items-center">
            <img
              src={getImagePath("/images/logo.png")}
              alt="AIronLab Logo"
              className="h-6 sm:h-8 md:h-9 w-auto object-contain"
            />
          </div>

          {/* Навигация для десктопа */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => {
              // Для внешних ссылок (блог) используем <a>, для якорных ссылок - <button>
              if (item.isExternal) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    data-clickable="true"
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
                      "hover:scale-105 active:scale-95",
                      "animate-fade-in",
                      "text-foreground/80 hover:text-foreground hover:bg-white/10"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                  </a>
                );
              }
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.isExternal, item.href)}
                  data-clickable="true"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
                    "hover:scale-105 active:scale-95",
                    "animate-fade-in",
                    activeSection === item.id && !item.isExternal
                      ? "text-accent bg-accent/10"
                      : "text-foreground/80 hover:text-foreground hover:bg-white/10"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  {activeSection === item.id && !item.isExternal && (
                    <div className="absolute inset-0 bg-accent/5 rounded-lg -z-10 animate-scale-in" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Кнопки действий для десктопа */}
          <div className="hidden lg:flex items-center space-x-3">
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

          {/* Мобильная кнопка меню */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Меню"
            data-clickable="true"
          >
            <div className={cn(
              "transition-all duration-200",
              isMobileMenuOpen ? "rotate-180" : "rotate-0"
            )}>
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 animate-spin-in" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 animate-spin-in" />
              )}
            </div>
          </button>
        </div>

        {/* Мобильное меню */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen 
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0 hidden"
        )}>
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-white/20 shadow-xl z-40">
            <div className="container-custom py-6 space-y-3">
              {navigationItems.map((item, index) => {
                // Для внешних ссылок (блог) используем <a>, для якорных ссылок - <button>
                if (item.isExternal) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      data-clickable="true"
                      className={cn(
                        "block w-full text-left px-4 py-3 rounded-lg text-base font-medium",
                        "transition-all duration-200 active:scale-98",
                        "animate-slide-up",
                        "text-foreground/80 hover:text-foreground hover:bg-white/10"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {item.name}
                    </a>
                  );
                }
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, item.isExternal, item.href)}
                    data-clickable="true"
                    className={cn(
                      "block w-full text-left px-4 py-3 rounded-lg text-base font-medium",
                      "transition-all duration-200 active:scale-98",
                      "animate-slide-up",
                      activeSection === item.id && !item.isExternal
                        ? "text-accent bg-accent/10"
                        : "text-foreground/80 hover:text-foreground hover:bg-white/10"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                  </button>
                );
              })}
              
                              <div className="pt-4 border-t border-white/20 space-y-3">
                  <Button
                    onClick={handleContactClick}
                    className="w-full justify-center group"
                    size="lg"
                    data-clickable="true"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Оставить заявку</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}; 