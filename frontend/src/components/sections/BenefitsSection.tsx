"use client";

import React from "react";
import { 
  Zap, 
  Clock, 
  Target, 
  TrendingUp, 
  Shield, 
  Lightbulb,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Молниеносная скорость",
      description: "ИИ обрабатывает запросы в 100 раз быстрее человека, автоматизируя рутинные задачи за секунды",
      stats: "Ускорение на 90%"
    },
    {
      icon: <Clock className="h-8 w-8 text-accent" />,
      title: "Работа 24/7",
      description: "Наши ИИ-системы работают круглосуточно без перерывов, обеспечивая непрерывную поддержку бизнеса",
      stats: "Без выходных"
    },
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Точность решений",
      description: "Машинное обучение анализирует миллионы данных для принятия максимально точных решений",
      stats: "95% точность"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      title: "Рост эффективности",
      description: "Оптимизация процессов и автоматизация увеличивают продуктивность вашей команды",
      stats: "Рост на 200%"
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Безопасность данных",
      description: "Защищенные алгоритмы и шифрование гарантируют полную конфиденциальность ваших данных",
      stats: "100% безопасность"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-accent" />,
      title: "Инновационные решения",
      description: "Используем передовые технологии ИИ для создания уникальных решений под ваш бизнес",
      stats: "Новый уровень"
    }
  ];

  const keyFeatures = [
    "Персонализированный подход к каждому клиенту",
    "Интеграция с существующими системами",
    "Масштабируемость под любой размер бизнеса",
    "Техническая поддержка и обучение команды"
  ];

  return (
    <section id="benefits" className="min-h-screen py-12 sm:py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-secondary/50 non-interactive" data-scroll-container="true">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-3 mb-8 shadow-lg">
            <CheckCircle className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground/80">
              Почему выбирают нас
            </span>
          </div>
          
                      <h2 className="text-responsive-h1 text-foreground mb-6">
            Преимущества
            <span className="text-accent"> AIronLab</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Откройте новые возможности для вашего бизнеса с помощью передовых ИИ-технологий
          </p>
        </div>

        {/* Сетка преимуществ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-accent/10 animate-slide-up non-interactive"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10">
                {/* Иконка */}
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>

                {/* Статистика */}
                <div className="text-sm font-bold text-accent mb-3 uppercase tracking-wide">
                  {benefit.stats}
                </div>

                {/* Заголовок */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  {benefit.title}
                </h3>

                {/* Описание */}
                <p className="text-foreground/70 leading-relaxed">
                  {benefit.description}
                </p>


              </div>
            </div>
          ))}
        </div>

        {/* Дополнительные ключевые особенности */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-accent/10 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-responsive-h3 text-foreground mb-6">
                Что делает нас 
                <span className="text-accent"> особенными?</span>
              </h3>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                Мы не просто внедряем ИИ — мы создаем экосистему, которая растет вместе с вашим бизнесом
              </p>
              
              <div className="space-y-4">
                {keyFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 animate-slide-up"
                    style={{ animationDelay: `${1 + index * 0.1}s` }}
                  >
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Декоративная сетка */}
              <div className="grid grid-cols-2 gap-4 non-interactive">
                <div className="bg-accent/10 rounded-2xl p-6 text-center animate-slide-up non-interactive" style={{ animationDelay: "1.2s" }}>
                  <div className="text-responsive-stats text-accent mb-2">50+</div>
                  <div className="text-responsive-small text-foreground/60">ИИ-моделей</div>
                </div>
                <div className="bg-accent/10 rounded-2xl p-6 text-center animate-slide-up non-interactive" style={{ animationDelay: "1.3s" }}>
                  <div className="text-responsive-stats text-accent mb-2">15</div>
                  <div className="text-responsive-small text-foreground/60">Отраслей</div>
                </div>
                <div className="bg-accent/10 rounded-2xl p-4 md:p-6 text-center animate-slide-up non-interactive" style={{ animationDelay: "1.4s" }}>
                  <div className="text-responsive-stats text-accent mb-2">500+</div>
                  <div className="text-responsive-small text-foreground/60 leading-tight">Сэкономленных часов</div>
                </div>
                <div className="bg-accent/10 rounded-2xl p-6 text-center animate-slide-up non-interactive" style={{ animationDelay: "1.5s" }}>
                  <div className="text-responsive-stats text-accent mb-2">98%</div>
                  <div className="text-responsive-small text-foreground/60">Довольных клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 