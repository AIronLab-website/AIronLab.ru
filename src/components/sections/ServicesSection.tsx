"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Workflow, 
  BarChart3, 
  Eye, 
  MessageSquareText, 
  Brain,
  ArrowRight,
  Play,
  CheckCircle,
  Sparkles,
  Users,
  Cog
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    { name: "Автоматизация", icon: <Cog className="h-5 w-5" /> },
    { name: "Аналитика", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Коммуникации", icon: <MessageSquareText className="h-5 w-5" /> }
  ];

  const services = [
    // Автоматизация
    [
      {
        icon: <Bot className="h-8 w-8 text-accent" />,
        title: "Шаблонные ИИ-решения",
        description: "Готовые решения для быстрого старта: простые автоматизации, боты для Telegram, WhatsApp, Instagram",
        features: ["Быстрое внедрение", "Готовые шаблоны", "Интеграция мессенджеров", "Базовая аналитика"],
        price: "от 15 000 ₽",
        timeline: "1-2 недели"
      },
      {
        icon: <Workflow className="h-8 w-8 text-accent" />,
        title: "Кастомные решения для автоматизации",
        description: "Уникальные боты с интеграцией в CRM-системы для автоматизации продаж и клиентского сервиса",
        features: ["Интеграция с CRM", "Персонализация", "Аналитика конверсий", "Многоканальность"],
        price: "от 50 000 ₽",
        timeline: "3-6 недель"
      },
      {
        icon: <Eye className="h-8 w-8 text-accent" />,
        title: "Интеграция MCP серверов",
        description: "Разработка специализированных MCP-серверов для интеграции кастомных ИИ-решений в ваши системы",
        features: ["Model Context Protocol", "Кастомная интеграция", "Расширяемость", "Enterprise-уровень"],
        price: "от 100 000 ₽",
        timeline: "6-12 недель"
      }
    ],
    // Аналитика
    [
      {
        icon: <BarChart3 className="h-8 w-8 text-accent" />,
        title: "Анализ данных и бизнес-аналитика",
        description: "Глубокий анализ больших данных, построение прогнозных моделей и интерактивных дашбордов",
        features: ["Big Data анализ", "Интерактивные дашборды", "Прогнозная аналитика", "A/B тестирование"],
        price: "от 100 000 ₽",
        timeline: "3-6 недель"
      },
      {
        icon: <Brain className="h-8 w-8 text-accent" />,
        title: "Машинное обучение",
        description: "Создание и внедрение ML-моделей для предсказания трендов, оптимизации и персонализации",
        features: ["Предиктивные модели", "Рекомендательные системы", "Сегментация клиентов", "Оптимизация цен"],
        price: "от 300 000 ₽",
        timeline: "8-16 недель"
      },
      {
        icon: <Users className="h-8 w-8 text-accent" />,
        title: "Анализ поведения пользователей",
        description: "Изучение паттернов поведения клиентов для улучшения UX и увеличения конверсии",
        features: ["Тепловые карты", "Воронки конверсии", "Сегментация аудитории", "Поведенческие триггеры"],
        price: "от 80 000 ₽",
        timeline: "2-4 недели"
      }
    ],
    // Коммуникации
    [
      {
        icon: <MessageSquareText className="h-8 w-8 text-accent" />,
        title: "Обработка естественного языка",
        description: "Анализ текстов, извлечение инсайтов, автоматическое резюмирование и генерация контента",
        features: ["Анализ тональности", "Извлечение сущностей", "Генерация текста", "Автоперевод"],
        price: "от 120 000 ₽",
        timeline: "4-8 недель"
      },
      {
        icon: <Sparkles className="h-8 w-8 text-accent" />,
        title: "Персонализация контента",
        description: "ИИ-рекомендации и персонализированный контент для повышения вовлеченности пользователей",
        features: ["Умные рекомендации", "Динамический контент", "Персональные предложения", "Email-автоматизация"],
        price: "от 90 000 ₽",
        timeline: "3-6 недель"
      },
      {
        icon: <Bot className="h-8 w-8 text-accent" />,
        title: "Голосовые ассистенты",
        description: "Разработка голосовых интерфейсов и речевых ассистентов для мобильных и веб-приложений",
        features: ["Распознавание речи", "Синтез речи", "Голосовые команды", "Мультимодальность"],
        price: "от 180 000 ₽",
        timeline: "6-10 недель"
      }
    ]
  ];

  const currentServices = services[activeCategory];

  return (
    <section id="services" className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-muted/40">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-3 mb-8 shadow-lg">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground/80">
              Наши ИИ-решения
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Услуги
            <span className="text-accent"> AIronLab</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-12">
            Полный спектр ИИ-решений для автоматизации, аналитики и оптимизации вашего бизнеса
          </p>

          {/* Переключатель категорий */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-accent text-white border-accent shadow-lg"
                    : "bg-white/60 text-foreground/80 border-accent/20 hover:border-accent/40 hover:bg-white/80"
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {currentServices.map((service, index) => (
            <div
              key={`${activeCategory}-${index}`}
              className="group relative p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Градиентная подложка при ховере */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Иконка и цена */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-accent uppercase tracking-wide">
                      {service.price}
                    </div>
                    <div className="text-xs text-foreground/60">
                      {service.timeline}
                    </div>
                  </div>
                </div>

                {/* Заголовок */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Описание */}
                <p className="text-foreground/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Особенности */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Кнопка действия */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                    <Play className="h-4 w-4" />
                    <span className="text-sm font-medium">Демо</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-accent font-medium hover:translate-x-1 transition-transform duration-300">
                    <span className="text-sm">Подробнее</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Призыв к действию */}
        <div className="bg-gradient-to-r from-accent/10 via-white/40 to-accent/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-accent/20 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Готовы внедрить ИИ в ваш бизнес?
            </h3>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Получите бесплатную консультацию и персональное предложение под ваши задачи
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="relative overflow-hidden group min-w-[200px] shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Получить консультацию</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] bg-white/50 backdrop-blur-sm border-foreground/20 hover:bg-white/70 hover:border-accent/40"
              >
                <span className="flex items-center space-x-2">
                  <Play className="h-5 w-5 text-accent" />
                  <span>Смотреть демо</span>
                </span>
              </Button>
            </div>

            {/* Статистика по проектам */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">50+</div>
                <div className="text-sm text-foreground/60">Внедренных решений</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">15</div>
                <div className="text-sm text-foreground/60">Отраслей опыта</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">98%</div>
                <div className="text-sm text-foreground/60">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                <div className="text-sm text-foreground/60">Техподдержка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 