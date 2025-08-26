'use client';

import { useState } from 'react';
import { scrollToSection } from '@/lib/utils';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  color: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'template',
    name: 'Шаблонные решения',
    price: 'от 15 000 ₽',
    period: '',
    description: 'Готовые ИИ-решения для быстрого внедрения',
    features: [
      'Готовые чат-боты',
      'Базовая настройка',
      'Стандартная интеграция',
      'Быстрое развертывание',
      'Обучение команды',
      'Документация'
    ],
    buttonText: 'Начать с шаблона',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'custom',
    name: 'Кастомные решения',
    price: 'от 30 000 ₽',
    period: '',
    description: 'Индивидуальная разработка под ваши задачи',
    features: [
      'Персональная разработка',
      'Адаптация под бизнес',
      'Уникальный функционал',
      'Тестирование решения',
      'Анализ требований',
      'Обновления 1 месяц'
    ],
    popular: true,
    buttonText: 'Заказать разработку',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'integration',
    name: 'Решения с интеграциями',
    price: 'от 60 000 ₽',
    period: '',
    description: 'Комплексная интеграция с вашими системами',
    features: [
      'Интеграция с CRM/ERP',
      'API для сторонних систем',
      'Аналитика и отчеты',
      'Мониторинг производительности',
      'Резервное копирование',
      'Масштабирование решения'
    ],
    buttonText: 'Обсудить интеграцию',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'unique',
    name: 'Уникальные решения',
    price: 'от 100 000 ₽',
    period: '',
    description: 'Эксклюзивные ИИ-решения с нуля',
    features: [
      'Полная разработка с нуля',
      'Продвинутая архитектура',
      'Высокая производительность',
      'Безлимитная поддержка',
      'Команда экспертов',
      'Права на исходный код'
    ],
    buttonText: 'Создать уникальное решение',
    color: 'from-orange-500 to-red-500'
  }
];

export default function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handlePlanSelect = (planId: string) => {
    scrollToSection("contact");
  };

  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden non-interactive" data-scroll-container="true">
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-responsive-h2 font-bold text-white mb-4 sm:mb-6">
            Выберите подходящий
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              тарифный план
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            От готовых шаблонов до эксклюзивных решений — у нас есть идеальный вариант для вашего бизнеса
          </p>
        </div>

        {/* Сетка тарифов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 pt-6 sm:pt-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative h-full non-interactive`}
            >
              <div
                className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 animate-fade-in h-full flex flex-col non-interactive ${
                  plan.popular ? 'ring-2 ring-purple-500/50 bg-white/10' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Badge для популярного тарифа */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-xl whitespace-nowrap">
                      🔥 Популярный
                    </span>
                  </div>
                )}
                {/* Иконка тарифа */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} p-3 mb-6`}>
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                    <span className="text-responsive-h4">
                      {plan.id === 'template' && '📋'}
                      {plan.id === 'custom' && '🎨'}
                      {plan.id === 'integration' && '🔗'}
                      {plan.id === 'unique' && '✨'}
                    </span>
                  </div>
                </div>
                {/* Информация о тарифе */}
                <div className="mb-6">
                  <h3 className="text-responsive-h4 text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">{plan.price}</span>
                    {plan.period && (
                      <span className="text-responsive-body text-gray-400 ml-1">{plan.period}</span>
                    )}
                  </div>
                </div>
                {/* Список функций */}
                <div className="flex-grow mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-300">
                        <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Кнопка выбора */}
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  data-clickable="true"
                  className={`mobile-friendly-button w-full rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                      : hoveredPlan === plan.id
                      ? `bg-gradient-to-r ${plan.color} text-white`
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {plan.buttonText}
                </button>
                {/* Декоративный элемент при ховере */}
                <div className={`absolute inset-0 bg-gradient-to-r ${plan.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center justify-center sm:justify-start text-gray-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base">Без скрытых платежей</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-gray-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base">Гарантия результата</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-gray-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm sm:text-base">Бесплатная консультация</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">
              Не уверены какой тариф выбрать?
            </p>
            <button 
              onClick={() => scrollToSection("contact")}
              className="mobile-friendly-touch bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 font-medium"
              data-clickable="true"
            >
              Получите персональную консультацию
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 