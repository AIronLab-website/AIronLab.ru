import type { Metadata } from 'next';
import { BlogHeader } from '@/components/layout/BlogHeader';
import { LightFooter } from '@/components/layout/LightFooter';
import { Tag } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogHeader />
      <main
        role="main"
        aria-label="Blog page content"
        className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 flex items-center justify-center"
      >
        <div className="container-custom">
          {/* Заглушка */}
          <div className="text-center max-w-2xl mx-auto py-20">
            <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 mb-8">
              <Tag className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Блог AIronLab
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Блог в разработке
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Мы готовим для вас экспертные материалы об искусственном интеллекте и автоматизации бизнеса. Статьи появятся совсем скоро!
            </p>

            {/* Кнопка возврата */}
            <a
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 hover:border-accent/30 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Вернуться на главную</span>
            </a>
          </div>
        </div>
      </main>
      <LightFooter />
    </>
  );
}