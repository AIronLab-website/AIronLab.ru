'use client';

import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: 'Политика конфиденциальности', href: '/privacy' },
    { name: 'Публичная оферта', href: '/offer' },
    { name: 'Пользовательское соглашение', href: '/terms' },
    { name: 'Политика использования cookies', href: '/cookies' }
  ];

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="bg-gray-900 border-t border-gray-800"
    >
      <div className="container-custom py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Копирайт */}
          <div className="text-gray-400 text-sm" role="contentinfo">
            © {currentYear} AIronLab. Все права защищены.
          </div>

          {/* Правовые ссылки */}
          <nav
            role="navigation"
            aria-label="Legal and policy links"
            className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6"
          >
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                data-clickable="true"
                aria-label={`View ${link.name}`}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}; 