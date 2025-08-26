'use client';

import React from 'react';

export const LightFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: 'Политика конфиденциальности', href: '/privacy' },
    { name: 'Публичная оферта', href: '/offer' },
    { name: 'Пользовательское соглашение', href: '/terms' },
    { name: 'Политика использования cookies', href: '/cookies' }
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container-custom py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Копирайт */}
          <div className="text-gray-600 text-sm">
            © {currentYear} AIronLab. Все права защищены.
          </div>
          
          {/* Правовые ссылки */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                data-clickable="true"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}; 