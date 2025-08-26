import { BlogHeader } from '@/components/layout/BlogHeader';
import { LightFooter } from '@/components/layout/LightFooter';
import { Calendar, Clock, ArrowLeft, Tag, User, Share2, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

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

// Временные данные - заменить на полные данные
const blogPosts: BlogPost[] = [
  {
    id: '5',
    title: 'Как 5 ИИ-агентов за 4 дня создали вирусный face-swap бот для избирательной кампании',
    excerpt: 'Рассказываем, как команда искусственного интеллекта разработала telegram-бота с технологией замены лиц, который превращает фото пользователей в персональные мемы-стикеры за 60 секунд',
    content: `
      <p><i>Рассказываем, как команда искусственного интеллекта разработала telegram-бота с технологией замены лиц, который превращает фото пользователей в персональные мемы-стикеры за 60 секунд</i></p>

      <p>В сентябре к нам обратилась партия "Новые люди" с нестандартной задачей: нужен был инструмент для предвыборной кампании, который бы не просто информировал избирателей, а создавал эмоциональную связь через персонализированный контент. Идея — telegram-бот, который превращает селфи пользователей в мемы-стикеры.</p>

      <p>Казалось бы, типичная задача для веб-студии. Но мы решили поэкспериментировать и поручить весь процесс разработки команде из 5 специализированных ИИ-агентов. Результат превзошел ожидания: готовый продукт за неделю вместо месяца, 10 000+ строк качественного кода и 50+ пользователей в первые сутки после запуска ⚡</p>

      <h2>Вызов: политика + вирусность + технологическая сложность</h2>

      <p><b>Проблема клиента</b>: Как в условиях информационного шума привлечь внимание молодой аудитории к политической партии? Стандартные баннеры и листовки не работают, нужен интерактивный инструмент, который сам пользователь захочет попробовать и поделиться результатом.</p>

      <p><b>Техническая сложность</b>: Face-swap технологии требуют в первую очередь качественной обработки изображений. При этом всё должно работать быстро, в рамках telegram-бота, без установки дополнительных приложений.</p>

      <p><b>Ограничения по времени</b>: До выборов оставалось чуть больше месяца, классическая разработка заняла бы 3-4 недели только на программирование, не считая планирования и тестирования.</p>

      <p>Именно тогда мы решили протестировать нашу экспериментальную систему — команду ИИ-агентов, каждый из которых специализируется на определённом этапе разработки.</p>

      <h2>💻 Решение: делегируем разработку искусственному интеллекту</h2>

      <h2>Архитектура ИИ-команды</h2>

      <div class="mb-8">
        <img src="/images/blog/ChatGPT Image 25 авг. 2025 г., 15_43_30.png" alt="Архитектура ИИ-команды" class="w-full rounded-lg shadow-lg">
      </div>

      <p>Мы создали 5 специализированных агентов:</p>

      <ol>
        <li><b>Product manager</b> — анализирует требования и планирует техническую архитектуру</li>
        <li><b>Backend developer</b> — пишет код на Node.js, интегрирует API</li>
        <li><b>QA-developer</b> — создаёт тесты и проверяет работоспособность</li>
        <li><b>Analyst agent</b> — проектирует систему сбора метрик и аналитики</li>
        <li><b>Project-manager</b> — создает план проекта, задачи и контролирует их выполнение</li>
      </ol>

      <p>Каждый агент работает автономно, но синхронизируется с остальными через общую базу знаний проекта.</p>

      <h2>⚙ Технический стек</h2>

      <p><b>Backend</b>: Node.js + Express.js для обработки webhook'ов от Telegram <b>AI Engine</b>: Piapi AI для face-swap технологии (выбрали за скорость обработки и качество результата) <b>База данных</b>: SupaBase для хранения пользователей, метрик и истории операций <b>Telegram Bot API</b>: для взаимодействия с пользователями и автоматического создания стикер-паков <b>Инфраструктура</b>: Docker-контейнеры на Railway с автоматическим масштабированием</p>

      <h2>Как это работает с точки зрения пользователя</h2>

      <ol>
        <li>Пользователь присылает селфи в бота @NewPeopleStickers_bot</li>
        <li>Бот предлагает выбрать шаблон (мем с политиком или актуальная картинка)</li>
        <li>ИИ обрабатывает фото: извлекает лицо, адаптирует под шаблон, накладывает</li>
        <li>За ~3 минуты готов персональный стикер-пак из 12 изображений</li>
        <li>Бот автоматически создаёт стикер-пак в Telegram и отправляет ссылку пользователю</li>
      </ol>

      <div class="carousel-container mb-8">
        <div class="carousel-wrapper flex space-x-4 overflow-x-auto">
          <img src="/images/blog/IMG_5532.jpg" alt="Процесс создания стикеров - шаг 1" class="flex-shrink-0 h-64 w-auto rounded-lg shadow-lg">
          <img src="/images/blog/IMG_5536.jpg" alt="Процесс создания стикеров - шаг 2" class="flex-shrink-0 h-64 w-auto rounded-lg shadow-lg">
          <img src="/images/blog/IMG_5534.jpg" alt="Процесс создания стикеров - шаг 3" class="flex-shrink-0 h-64 w-auto rounded-lg shadow-lg">
          <img src="/images/blog/IMG_5535.jpg" alt="Процесс создания стикеров - шаг 4" class="flex-shrink-0 h-64 w-auto rounded-lg shadow-lg">
        </div>
      </div>

      <h2>📊 Результаты: цифры и инсайты</h2>

      <div class="mb-8">
        <img src="/images/blog/Снимок экрана 2025-08-21 в 14.23.02.png" alt="Результаты проекта" class="w-full rounded-lg shadow-lg">
      </div>

      <h3>Технические метрики</h3>

      <ul>
        <li><b>10 000 строк кода</b> — написано ИИ-агентами с минимальным участием человека 🤖</li>
        <li><b>Время разработки</b>: 4 дня против планируемых 3 недель (сокращение в 5 раз) ⏰</li>
        <li><b>Скорость обработки</b>: 3 минуты на создание стикер-пака из 12 изображений ⚡</li>
        <li><b>Покрытие тестами</b>: 31% кода покрыто автотестами ✅</li>
      </ul>

      <p><i>P.S. Бот @NewPeopleStickers_bot работает — можете попробовать сами и оценить качество работы ИИ-команды.</i></p>

      <div class="mb-8 text-center">
        <img src="/images/blog/лого бот.png" alt="Логотип бота" class="w-64 mx-auto rounded-lg shadow-lg">
      </div>

      <p><b>Попробовать face-swap бота:</b> @NewPeopleStickers_bot<br>
      <b>Обсудить автоматизацию для вашего проекта:</b> info@aironlab.ru<br>
      <b>Наш Telegram канал:</b> https://tlgg.ru/@Aironlab<br>
      <b>Наш сайт:</b> https://aironlab.ru/</p>
    `,
    author: 'Команда AIronLab',
    date: '2025-01-20',
    readTime: '12 мин',
    tags: ['ИИ', 'Кейсы', 'Политика', 'Telegram', 'Face-swap'],
    image: '/images/blog/ChatGPT Image 25 авг. 2025 г., 15_43_30.png',
    slug: 'ai-agents-face-swap-bot'
  }
];

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogHeader />
      <main className="min-h-screen bg-white">
        {/* Hero секция статьи */}
        <div className="relative bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container-custom">
            {/* Навигация назад */}
            <div className="mb-8">
              <a
                href="/blog"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-accent transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Вернуться к блогу</span>
              </a>
            </div>

            {/* Заголовок и метаданные */}
            <div className="max-w-4xl mx-auto">
              {/* Теги */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Заголовок */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                {post.title}
              </h1>

              {/* Метаданные */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(post.date).toLocaleDateString('ru-RU', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Время чтения: {post.readTime}</span>
                </div>
              </div>

              {/* Краткое описание */}
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Кнопка поделиться */}
              <button className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors duration-200">
                <Share2 className="h-4 w-4" />
                <span>Поделиться</span>
              </button>
            </div>
          </div>
        </div>

        {/* Контент статьи */}
        <div className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Изображение статьи */}
              {post.image && (
                <div className="mb-12">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              )}

              {/* Текст статьи */}
              <article className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* Автор */}
              <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{post.author}</h3>
                    <p className="text-gray-600">Эксперт по ИИ и автоматизации бизнес-процессов</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LightFooter />
    </>
  );
}
