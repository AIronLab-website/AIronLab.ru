'use client';

import { useState, useMemo, useCallback } from 'react';
import { scrollToSection } from '@/lib/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'pricing' | 'technical' | 'security' | 'support';
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: 'pricing',
    question: 'Что такое искусственный интеллект и зачем он нужен моему бизнесу?',
    answer: 'ИИ — это технология, которая помогает автоматизировать рутинные задачи, улучшить обслуживание клиентов и принимать более точные бизнес-решения. Он может отвечать на вопросы клиентов 24/7, анализировать данные и экономить время ваших сотрудников.'
  },
  {
    id: '2',
    category: 'technical',
    question: 'Сложно ли внедрить ИИ в мой бизнес?',
    answer: 'Нет! Мы делаем весь процесс максимально простым. Вам не нужно разбираться в технических деталях — мы всё настроим, обучим вашу команду и обеспечим поддержку. Большинство решений можно запустить за 1-2 недели.'
  },
  {
    id: '3',
    category: 'security',
    question: 'Безопасно ли использовать ИИ для моих данных?',
    answer: 'Да, абсолютно безопасно. Мы используем современные методы защиты данных, всё шифруется и храится на защищённых серверах. Ваша информация никогда не передаётся третьим лицам и соответствует всем требованиям российского законодательства.'
  },
  {
    id: '4',
    category: 'technical',
    question: 'Какие задачи может решать ИИ в моей компании?',
    answer: 'ИИ может автоматически отвечать на вопросы клиентов, обрабатывать заявки, анализировать продажи, помогать в подборе товаров, вести учёт документов, переводить тексты и многое другое. Мы подберём решение именно для ваших задач.'
  },
  {
    id: '5',
    category: 'support',
    question: 'Сколько это стоит и есть ли скрытые платежи?',
    answer: 'Стоимость зависит от ваших задач: простые решения от 15,000₽, более сложные — от 50,000₽. Никаких скрытых платежей! Называем точную цену после бесплатной консультации и не меняем её в процессе работы.'
  },
  {
    id: '6',
    category: 'pricing',
    question: 'Что если ИИ не подойдёт моему бизнесу?',
    answer: 'Мы всегда начинаем с бесплатной консультации, где анализируем ваши задачи и честно говорим, поможет ли ИИ. Если решение не принесёт пользы — мы не будем его предлагать. Ваш успех — наша репутация.'
  },
  {
    id: '7',
    category: 'support',
    question: 'Как быстро я увижу результат от внедрения ИИ?',
    answer: 'Результат виден практически сразу после запуска! Клиенты получают мгновенные ответы на свои вопросы, сотрудники тратят меньше времени на рутину, а вы получаете точную аналитику. Полный эффект обычно ощущается в первый месяц работы.'
  },
  {
    id: '8',
    category: 'technical',
    question: 'Можете ли вы интегрировать ИИ с нашей CRM или ERP системой?',
    answer: 'Да, мы специализируемся на интеграции с любыми системами: 1C, SAP, Salesforce, amoCRM, Битрикс24, МойСклад и другими. Используем API подключения, webhooks и прямую синхронизацию данных для бесшовной работы с вашими процессами.'
  },
  {
    id: '9',
    category: 'technical',
    question: 'Поддерживаете ли вы MCP (Model Context Protocol) для расширения возможностей?',
    answer: 'Да! Мы активно используем MCP для создания гибких и расширяемых ИИ-решений. Это позволяет интегрировать различные инструменты, базы данных и сервисы в единую экосистему, делая ваше ИИ-решение максимально функциональным.'
  },
  {
    id: '10',
    category: 'pricing',
    question: 'Есть ли ежемесячная оплата или только разовая?',
    answer: 'Предлагаем разные варианты: разовую оплату за создание решения и опционально небольшую ежемесячную плату за техподдержку и обновления. Вы выбираете то, что удобно для вашего бюджета.'
  },
  {
    id: '11',
    category: 'technical',
    question: 'Можете ли вы создать многоагентные ИИ-системы для сложных бизнес-процессов?',
    answer: 'Да! Разрабатываем многоагентные системы, где каждый ИИ-агент специализируется на определённых задачах: один обрабатывает клиентские запросы, другой анализирует продажи, третий управляет складом. Все агенты взаимодействуют между собой для оптимального результата.'
  },
  {
    id: '12',
    category: 'technical',
    question: 'Поддерживаете ли вы RAG (Retrieval-Augmented Generation) для работы с корпоративными знаниями?',
    answer: 'Конечно! RAG — это наша специализация. Создаём системы, которые работают с вашими документами, базами знаний, регламентами и процедурами. ИИ получает актуальную информацию в реальном времени и даёт точные ответы на основе именно ваших данных.'
  }
];

const categoryNames = {
  pricing: '💰 Цены и оплата',
  technical: '⚙️ Технические вопросы',
  security: '🔒 Безопасность',
  support: '🛠️ Поддержка'
};

export default function FAQSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = useCallback((itemId: string) => {
    setActiveItem(current => current === itemId ? null : itemId);
  }, []);

  const filteredFAQs = useMemo(() => {
    return selectedCategory === 'all' 
      ? faqData 
      : faqData.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden non-interactive" data-scroll-container="true">
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
                      <h2 className="text-responsive-h1 text-gray-900 mb-6">
            Часто задаваемые
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              вопросы
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ответы на самые популярные вопросы о разработке ИИ-решений, ценах и технологиях
          </p>
        </div>

        {/* Фильтры по категориям */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            data-clickable="true"
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            📋 Все вопросы
          </button>
          {Object.entries(categoryNames).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              data-clickable="true"
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Accordion с вопросами */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Вопрос (кликабельный заголовок) */}
                <button
                  onClick={() => toggleItem(item.id)}
                  data-clickable="true"
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                      item.category === 'pricing' ? 'from-green-400 to-emerald-500' :
                      item.category === 'technical' ? 'from-blue-400 to-cyan-500' :
                      item.category === 'security' ? 'from-red-400 to-pink-500' :
                      'from-purple-400 to-indigo-500'
                    }`}></div>
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                  </div>
                  
                  {/* Иконка стрелки */}
                  <div className={`flex-shrink-0 w-6 h-6 transition-transform duration-200 ${
                    activeItem === item.id ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-full h-full text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Ответ (раскрывающийся контент) */}
                <div className={`overflow-hidden transition-all duration-300 ease-out ${
                  activeItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed mt-4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Блок призыва к действию */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white">
                          <h3 className="text-responsive-h3 mb-4">Не нашли ответ на свой вопрос?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Наши эксперты готовы ответить на любые вопросы о ИИ-решениях и помочь с выбором оптимального решения для вашего бизнеса
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => scrollToSection("contact")}
                className="mobile-friendly-button bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-200 flex items-center justify-center"
                data-clickable="true"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Написать нам
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 