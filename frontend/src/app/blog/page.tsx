import { BlogHeader } from '@/components/layout/BlogHeader';
import { LightFooter } from '@/components/layout/LightFooter';
import { Calendar, Clock, ArrowRight, Tag, User } from 'lucide-react';

// Типы для статей
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  slug: string;
}

// Данные статей
const blogPosts: BlogPost[] = [
  {
    id: '5',
    title: 'Как 5 ИИ-агентов за 4 дня создали вирусный face-swap бот для избирательной кампании',
    excerpt: 'Рассказываем, как команда искусственного интеллекта разработала telegram-бота с технологией замены лиц, который превращает фото пользователей в персональные мемы-стикеры за 60 секунд',
    content: 'Полное содержание статьи...',
    author: 'Александр Гребенщиков',
    date: '2025-08-25',
    readTime: '12 мин',
    tags: ['Кейсы', 'Telegram'],
    image: '/images/blog/ChatGPT Image 25 авг. 2025 г., 15_43_30.png',
    slug: 'ai-agents-face-swap-bot'
  }
];

export default function BlogPage() {
  return (
    <>
      <BlogHeader />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container-custom">
          {/* Заголовок блога */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 mb-8">
              <Tag className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Блог AIronLab
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Статьи об ИИ и автоматизации
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Экспертные материалы о том, как искусственный интеллект меняет бизнес и создает новые возможности
            </p>
          </div>

          {/* Сетка статей */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post, index) => (
              <article 
                key={post.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Изображение статьи */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {post.image ? (
                    <a href={`/blog/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </a>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/20">
                      <div className="text-accent/60">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Теги */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Контент статьи */}
                <div className="p-6">
                  {/* Метаданные */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('ru-RU', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Заголовок */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Автор */}
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>

                  {/* Краткое описание */}
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Кнопка "Читать далее" */}
                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors duration-200 group-hover:translate-x-1"
                  >
                    <span>Читать далее</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Заглушка для будущих статей */}
          <div className="text-center py-16 bg-white/50 rounded-2xl border border-gray-100">
            <div className="text-gray-400 mb-6">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Больше статей скоро
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Мы готовим для вас интересные материалы об ИИ, автоматизации и технологиях будущего
            </p>
          </div>

          {/* Кнопка возврата */}
          <div className="text-center mt-12">
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