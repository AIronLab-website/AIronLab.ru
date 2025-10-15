/**
 * Mock Blog Data for AIronLab
 * Sample data for testing and development
 */

import type { BlogPost, BlogPostPreview, BlogAuthor, BlogCategory, BlogTag } from "@/types/blog";

// Mock Authors
export const mockAuthors: BlogAuthor[] = [
  {
    id: "1",
    name: "Александр Иванов",
    email: "alexander@aironlab.ru",
    avatar: "/images/authors/alexander.jpg",
    bio: "CTO AIronLab, эксперт в области машинного обучения и AI. Специализируюсь на внедрении AI-решений для бизнеса, разработке RAG-систем и автоматизации с помощью LLM.",
    role: "CTO",
    socialLinks: {
      twitter: "https://twitter.com/aironlab",
      linkedin: "https://linkedin.com/in/aironlab",
      github: "https://github.com/aironlab",
    },
    stats: {
      articles: 42,
      experience: 8,
    },
  },
  {
    id: "2",
    name: "Мария Петрова",
    email: "maria@aironlab.ru",
    avatar: "/images/authors/maria.jpg",
    bio: "Lead AI Developer, специалист по NLP и компьютерному зрению. Разрабатываю модели для обработки естественного языка и систем распознавания изображений.",
    role: "Lead AI Developer",
    socialLinks: {
      linkedin: "https://linkedin.com/in/maria-petrova",
      github: "https://github.com/maria-petrova",
    },
    stats: {
      articles: 28,
      experience: 6,
    },
  },
  {
    id: "3",
    name: "Дмитрий Сидоров",
    email: "dmitry@aironlab.ru",
    avatar: "/images/authors/dmitry.jpg",
    bio: "Senior Backend Developer, архитектор AI-систем. Проектирую масштабируемую инфраструктуру для ML-моделей и создаю API для интеграции AI в бизнес-процессы.",
    role: "Senior Backend Developer",
    socialLinks: {
      linkedin: "https://linkedin.com/in/dmitry-sidorov",
      github: "https://github.com/dmitry-sidorov",
      twitter: "https://twitter.com/dmitry_dev",
    },
    stats: {
      articles: 35,
      experience: 10,
    },
  },
];

// Mock Categories
export const mockCategories: BlogCategory[] = [
  {
    id: "1",
    name: "Машинное обучение",
    slug: "machine-learning",
    description: "Статьи о ML алгоритмах и технологиях",
    color: "#6366F1",
    icon: "🤖",
    postCount: 12,
  },
  {
    id: "2",
    name: "NLP",
    slug: "nlp",
    description: "Обработка естественного языка",
    color: "#8B5CF6",
    icon: "💬",
    postCount: 8,
  },
  {
    id: "3",
    name: "Computer Vision",
    slug: "computer-vision",
    description: "Компьютерное зрение и обработка изображений",
    color: "#EC4899",
    icon: "👁️",
    postCount: 10,
  },
  {
    id: "4",
    name: "AI в бизнесе",
    slug: "ai-business",
    description: "Применение AI для решения бизнес-задач",
    color: "#10B981",
    icon: "💼",
    postCount: 15,
  },
  {
    id: "5",
    name: "Новости AI",
    slug: "ai-news",
    description: "Последние новости и тренды в мире AI",
    color: "#F59E0B",
    icon: "📰",
    postCount: 20,
  },
];

// Mock Tags
export const mockTags: BlogTag[] = [
  { id: "1", name: "Python", slug: "python", postCount: 25 },
  { id: "2", name: "TensorFlow", slug: "tensorflow", postCount: 15 },
  { id: "3", name: "PyTorch", slug: "pytorch", postCount: 18 },
  { id: "4", name: "GPT", slug: "gpt", postCount: 12 },
  { id: "5", name: "ChatGPT", slug: "chatgpt", postCount: 20 },
  { id: "6", name: "OpenAI", slug: "openai", postCount: 14 },
  { id: "7", name: "Трансформеры", slug: "transformers", postCount: 10 },
  { id: "8", name: "RAG", slug: "rag", postCount: 8 },
  { id: "9", name: "LLM", slug: "llm", postCount: 16 },
  { id: "10", name: "Автоматизация", slug: "automation", postCount: 13 },
  { id: "11", name: "API", slug: "api", postCount: 9 },
  { id: "12", name: "Разработка", slug: "development", postCount: 22 },
];

// Mock Blog Posts
export const mockBlogPosts: BlogPostPreview[] = [
  {
    id: "1",
    title: "Внедрение GPT-4 для автоматизации клиентской поддержки",
    slug: "gpt-4-customer-support-automation",
    excerpt:
      "Как мы помогли компании автоматизировать 70% запросов в службу поддержки с помощью GPT-4 и получили ROI 300% за 3 месяца.",
    author: {
      name: "Александр Иванов",
      avatar: "/images/authors/alexander.jpg",
    },
    publishedAt: "2025-01-10T10:00:00Z",
    category: {
      name: "AI в бизнесе",
      slug: "ai-business",
      color: "#10B981",
    },
    tags: [
      { name: "GPT", slug: "gpt" },
      { name: "ChatGPT", slug: "chatgpt" },
      { name: "Автоматизация", slug: "automation" },
    ],
    featuredImage: {
      url: "/images/blog/gpt-4-support.jpg",
      alt: "GPT-4 для клиентской поддержки",
    },
    readTime: 8,
    isFeatured: true,
  },
  {
    id: "2",
    title: "RAG системы: полное руководство по внедрению",
    slug: "rag-systems-implementation-guide",
    excerpt:
      "Детальный гайд по созданию RAG (Retrieval-Augmented Generation) систем для работы с корпоративными данными.",
    author: {
      name: "Мария Петрова",
      avatar: "/images/authors/maria.jpg",
    },
    publishedAt: "2025-01-08T14:30:00Z",
    category: {
      name: "NLP",
      slug: "nlp",
      color: "#8B5CF6",
    },
    tags: [
      { name: "RAG", slug: "rag" },
      { name: "LLM", slug: "llm" },
      { name: "Python", slug: "python" },
    ],
    featuredImage: {
      url: "/images/blog/rag-systems.jpg",
      alt: "RAG системы",
    },
    readTime: 12,
    isFeatured: false,
  },
  {
    id: "3",
    title: "Fine-tuning GPT для специфических задач бизнеса",
    slug: "fine-tuning-gpt-business-tasks",
    excerpt:
      "Практический опыт дообучения языковых моделей для решения узкоспециализированных бизнес-задач.",
    author: {
      name: "Александр Иванов",
      avatar: "/images/authors/alexander.jpg",
    },
    publishedAt: "2025-01-05T09:00:00Z",
    category: {
      name: "Машинное обучение",
      slug: "machine-learning",
      color: "#6366F1",
    },
    tags: [
      { name: "GPT", slug: "gpt" },
      { name: "OpenAI", slug: "openai" },
      { name: "Python", slug: "python" },
    ],
    featuredImage: {
      url: "/images/blog/fine-tuning-gpt.jpg",
      alt: "Fine-tuning GPT",
    },
    readTime: 10,
    isFeatured: false,
  },
  {
    id: "4",
    title: "Компьютерное зрение для контроля качества продукции",
    slug: "computer-vision-quality-control",
    excerpt:
      "Как AI помогает выявлять дефекты продукции в режиме реального времени с точностью 99.5%.",
    author: {
      name: "Дмитрий Сидоров",
      avatar: "/images/authors/dmitry.jpg",
    },
    publishedAt: "2025-01-03T11:20:00Z",
    category: {
      name: "Computer Vision",
      slug: "computer-vision",
      color: "#EC4899",
    },
    tags: [
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "PyTorch", slug: "pytorch" },
      { name: "Автоматизация", slug: "automation" },
    ],
    featuredImage: {
      url: "/images/blog/cv-quality-control.jpg",
      alt: "Контроль качества с AI",
    },
    readTime: 7,
    isFeatured: false,
  },
  {
    id: "5",
    title: "Трансформеры в NLP: от теории к практике",
    slug: "transformers-nlp-theory-to-practice",
    excerpt:
      "Глубокое погружение в архитектуру трансформеров и их применение для задач обработки естественного языка.",
    author: {
      name: "Мария Петрова",
      avatar: "/images/authors/maria.jpg",
    },
    publishedAt: "2024-12-28T15:45:00Z",
    category: {
      name: "NLP",
      slug: "nlp",
      color: "#8B5CF6",
    },
    tags: [
      { name: "Трансформеры", slug: "transformers" },
      { name: "Python", slug: "python" },
      { name: "PyTorch", slug: "pytorch" },
    ],
    featuredImage: {
      url: "/images/blog/transformers-nlp.jpg",
      alt: "Трансформеры в NLP",
    },
    readTime: 15,
    isFeatured: false,
  },
  {
    id: "6",
    title: "API для интеграции AI в существующие системы",
    slug: "api-ai-integration-existing-systems",
    excerpt:
      "Лучшие практики разработки и документирования API для бесшовной интеграции AI-решений.",
    author: {
      name: "Дмитрий Сидоров",
      avatar: "/images/authors/dmitry.jpg",
    },
    publishedAt: "2024-12-25T10:10:00Z",
    category: {
      name: "AI в бизнесе",
      slug: "ai-business",
      color: "#10B981",
    },
    tags: [
      { name: "API", slug: "api" },
      { name: "Разработка", slug: "development" },
      { name: "Автоматизация", slug: "automation" },
    ],
    featuredImage: {
      url: "/images/blog/api-ai-integration.jpg",
      alt: "API для AI интеграции",
    },
    readTime: 9,
    isFeatured: false,
  },
];

// Full blog post example (for single post page)
export const mockFullBlogPost: BlogPost = {
  id: "1",
  title: "Внедрение GPT-4 для автоматизации клиентской поддержки",
  slug: "gpt-4-customer-support-automation",
  excerpt:
    "Как мы помогли компании автоматизировать 70% запросов в службу поддержки с помощью GPT-4 и получили ROI 300% за 3 месяца.",
  content: `
# Введение

В этой статье мы поделимся опытом внедрения GPT-4 для автоматизации клиентской поддержки в крупной e-commerce компании.

## Исходная ситуация

Клиент получал более 10,000 обращений в день, при этом 70% из них были типовыми вопросами:
- Статус заказа
- Возврат товара
- Условия доставки
- Технические характеристики

## Решение

Мы разработали AI-ассистента на базе GPT-4 с использованием RAG для работы с базой знаний компании.

### Архитектура системы

\`\`\`python
# Пример интеграции
from openai import OpenAI
import chromadb

client = OpenAI(api_key="your-api-key")
db = chromadb.Client()

def answer_question(question):
    # Retrieve relevant context
    context = db.query(question)

    # Generate response
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Вы - AI-ассистент службы поддержки"},
            {"role": "user", "content": f"Контекст: {context}\\n\\nВопрос: {question}"}
        ]
    )

    return response.choices[0].message.content
\`\`\`

## Результаты

После 3 месяцев работы системы:
- **70%** запросов обрабатываются автоматически
- **300%** ROI за счет сокращения штата поддержки
- **95%** удовлетворенность клиентов
- **24/7** доступность поддержки

## Выводы

Внедрение GPT-4 позволило не только сократить расходы, но и значительно улучшить качество обслуживания клиентов.
  `,
  author: mockAuthors[0],
  publishedAt: "2025-01-10T10:00:00Z",
  updatedAt: "2025-01-10T10:00:00Z",
  createdAt: "2025-01-05T10:00:00Z",
  category: mockCategories[3],
  tags: [mockTags[3], mockTags[4], mockTags[9]],
  featuredImage: {
    url: "/images/blog/gpt-4-support.jpg",
    alt: "GPT-4 для клиентской поддержки",
    caption: "Внедрение AI в клиентскую поддержку",
    width: 1200,
    height: 630,
  },
  readTime: 8,
  status: "published",
  views: 1520,
  likes: 243,
  seo: {
    metaTitle: "Внедрение GPT-4 для автоматизации клиентской поддержки | AIronLab",
    metaDescription:
      "Кейс: автоматизация 70% запросов в службу поддержки с помощью GPT-4. ROI 300% за 3 месяца.",
    keywords: ["GPT-4", "автоматизация", "клиентская поддержка", "AI", "ChatGPT"],
    ogImage: "/images/blog/gpt-4-support-og.jpg",
  },
  isPinned: false,
  isFeatured: true,
  allowComments: true,
  relatedPosts: ["2", "3"],
};
