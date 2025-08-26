'use client';

import React from 'react';
import { BlogHeader } from './BlogHeader';
import { LightFooter } from './LightFooter';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  lastUpdated,
  children
}) => {
  return (
    <>
      <BlogHeader />
      <main className="min-h-screen bg-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Заголовок страницы */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
              <p className="text-gray-600">
                Последнее обновление: {lastUpdated}
              </p>
            </div>

            {/* Контент */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
              <div className="prose prose-gray prose-lg max-w-none">
                {children}
              </div>
            </div>

            {/* Кнопка возврата */}
            <div className="text-center mt-8">
              <a
                href="/"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Вернуться на главную
              </a>
            </div>
          </div>
        </div>
      </main>
      <LightFooter />
    </>
  );
}; 