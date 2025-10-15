'use client';

import { Search, Book, Tag, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

type EmptyStateType = 'no-results' | 'coming-soon' | 'no-category' | 'no-posts';

interface EmptyStateProps {
  type: EmptyStateType;
  onReset?: () => void;
  className?: string;
}

const emptyStateConfig = {
  'no-results': {
    icon: Search,
    title: 'Статьи не найдены',
    description: 'Попробуйте изменить поисковый запрос или фильтры. Возможно, статья еще не опубликована.',
    showResetButton: true,
  },
  'coming-soon': {
    icon: Book,
    title: 'Больше статей скоро',
    description: 'Мы активно работаем над новым контентом. Подпишитесь на рассылку, чтобы не пропустить публикации.',
    showResetButton: false,
  },
  'no-category': {
    icon: Tag,
    title: 'Пока нет статей в этой категории',
    description: 'Мы скоро добавим статьи по этой теме. А пока можете посмотреть другие материалы.',
    showResetButton: false,
  },
  'no-posts': {
    icon: FileText,
    title: 'Пока нет опубликованных статей',
    description: 'Скоро здесь появятся интересные материалы об ИИ и автоматизации.',
    showResetButton: false,
  },
};

export function EmptyState({ type, onReset, className }: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 md:py-24 px-4",
      "animate-fade-in",
      className
    )}>
      {/* Icon with subtle animation */}
      <div className="mb-6 p-6 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/10 animate-bounce-subtle">
        <Icon className="h-16 w-16 md:h-20 md:w-20 text-accent" />
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
        {config.title}
      </h3>

      {/* Description */}
      <p className="text-base md:text-lg text-gray-600 text-center max-w-md mb-8">
        {config.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {config.showResetButton && onReset && (
          <Button
            onClick={onReset}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-200"
          >
            Сбросить фильтры
          </Button>
        )}
        
        {type === 'coming-soon' && (
          <Link href="#newsletter">
            <Button
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-200"
            >
              Подписаться на рассылку
            </Button>
          </Link>
        )}

        {type === 'no-category' && (
          <Link href="/blog">
            <Button
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-200"
            >
              Все статьи
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

