"use client";

import React, { useState } from "react";
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  Clock, 
  ExternalLink, 
  Play,
  ArrowRight,
  Star,
  Trophy,
  Target,
  ShoppingCart,
  Bot,
  BarChart3,
  Brain,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  description: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  technologies: string[];
  timeline: string;
  image: string;
  featured: boolean;
  status: "completed" | "ongoing";
}

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", name: "Все проекты", icon: <Briefcase className="h-4 w-4" /> },
    { id: "automation", name: "Автоматизация", icon: <Bot className="h-4 w-4" /> },
    { id: "analytics", name: "Аналитика", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "communications", name: "Коммуникации", icon: <Brain className="h-4 w-4" /> }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Чат-бот юридической поддержки",
      category: "automation",
      client: "Партия «Новые люди»",
      description: "Telegram-бот для первичной юридической поддержки граждан. Анализирует юридические документы, проверяет корректность договоров и дает правовые рекомендации.",
      results: [
        { metric: "Обращений в день", value: "150+", improvement: "+150%" },
        { metric: "Точность анализа", value: "95%", improvement: "+95%" },
        { metric: "Время консультации", value: "< 15 сек", improvement: "-95%" }
      ],
      technologies: ["n8n", "Telegram Bot API", "OpenAI GPT-4", "JavaScript", "Supabase", "FastAPI"],
      timeline: "2 месяца",
      image: "/api/placeholder/400/250",
      featured: true,
      status: "completed"
    },
    {
      id: 2,
      title: "B2B чат-бот менеджер",
      category: "automation",
      client: "ОптималБух",
      description: "Интеллектуальный бот-менеджер на сайте для консультации B2B клиентов по бухгалтерским услугам, генерации предложений и автоматического добавления сделок в CRM Bitrix24.",
      results: [
        { metric: "Конверсия в лиды", value: "240%", improvement: "+140%" },
        { metric: "Время отклика", value: "< 10 сек", improvement: "-99%" },
        { metric: "Автоматизация CRM (Bitrix24)", value: "100%", improvement: "+100%" }
      ],
      technologies: ["Voiceflow", "OpenAI GPT-4", "JavaScript", "Supabase", "Bitrix24", "WebSocket"],
      timeline: "1.5 месяца",
      image: "/api/placeholder/400/250",
      featured: true,
      status: "completed"
    },
    {
      id: 3,
      title: "Чат-бот для маркетплейса Авито",
      category: "automation",
      client: "ОптималБух",
      description: "Автоматизированный бот для ведения переписки с клиентами на Авито, интеграция с CRM Bitrix24 для отслеживания лидов и повышения качества обслуживания.",
      results: [
        { metric: "Скорость ответов", value: "120%", improvement: "+120%" },
        { metric: "Качество лидов", value: "85%", improvement: "+35%" },
        { metric: "Экономия времени", value: "40 ч/нед", improvement: "-80%" }
      ],
      technologies: ["n8n", "Avito API", "JavaScript", "Supabase", "Bitrix24"],
      timeline: "3 недели",
      image: "/api/placeholder/400/250",
      featured: false,
      status: "completed"
    },
    {
      id: 4,
      title: "MCP сервер для бьюти-бизнеса",
      category: "automation",
      client: "Конфиденциально",
      description: "Разработка и интеграция собственного MCP сервера для создания ИИ-администратора бьюти-салона. Консультирует клиентов, записывает на услуги и управляет расписанием.",
      results: [
        { metric: "Загрузка салона", value: "180%", improvement: "+80%" },
        { metric: "Автоматизация записи", value: "95%", improvement: "+95%" },
        { metric: "Удовлетворенность", value: "98%", improvement: "+25%" }
      ],
      technologies: ["Model Context Protocol", "TypeScript", "Railway", "n8n", "Supabase", "OpenAI"],
      timeline: "4 месяца",
      image: "/api/placeholder/400/250",
      featured: true,
      status: "ongoing"
    },
    {
      id: 5,
      title: "Контент завод для e-commerce",
      category: "communications",
      client: "Крупная торговая сеть",
      description: "Автоматизированная система массового производства контента: описания товаров, SEO-тексты, карточки продуктов и маркетинговые материалы с использованием ИИ.",
      results: [
        { metric: "Скорость создания", value: "1200%", improvement: "+1100%" },
        { metric: "SEO трафик", value: "85%", improvement: "+85%" },
        { metric: "Экономия бюджета", value: "2.5М ₽", improvement: "+70%" }
      ],
      technologies: ["n8n", "OpenAI GPT-4", "JavaScript", "Supabase"],
      timeline: "3 месяца",
      image: "/api/placeholder/400/250",
      featured: true,
      status: "completed"
    },
    {
      id: 6,
      title: "Система аналитики продаж",
      category: "analytics",
      client: "Федеральная ритейл сеть",
      description: "Комплексная система предиктивной аналитики для прогнозирования спроса, оптимизации ассортимента и планирования закупок на основе ML-алгоритмов.",
      results: [
        { metric: "Точность прогнозов", value: "92%", improvement: "+42%" },
        { metric: "Сокращение остатков", value: "35%", improvement: "-35%" },
        { metric: "Рост оборота", value: "28%", improvement: "+28%" }
      ],
      technologies: ["n8n", "Python", "Supabase", "JavaScript"],
      timeline: "5 месяцев",
      image: "/api/placeholder/400/250",
      featured: false,
      status: "completed"
    },
    {
      id: 7,
      title: "Голосовой ассистент call-центра",
      category: "communications",
      client: "Страховая компания",
      description: "ИИ-система для автоматизации обработки входящих звонков: распознавание речи, анализ запросов, маршрутизация обращений и предоставление первичной консультации.",
      results: [
        { metric: "Автоматизация звонков", value: "70%", improvement: "+70%" },
        { metric: "Время ожидания", value: "< 30 сек", improvement: "-75%" },
        { metric: "Удовлетворенность", value: "89%", improvement: "+15%" }
      ],
      technologies: ["Voiceflow", "OpenAI Whisper", "JavaScript", "Supabase"],
      timeline: "4 месяца",
      image: "/api/placeholder/400/250",
      featured: false,
      status: "completed"
    }
  ];

  // Фильтрация проектов
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Статистика
  const stats = {
    totalProjects: "30",
    completedProjects: projects.filter(p => p.status === "completed").length,
    avgImprovement: "120%",
    clientSatisfaction: "96%"
  };

  return (
    <section id="projects" className="min-h-screen py-12 sm:py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-muted/30 non-interactive" data-scroll-container="true">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-3 mb-8 shadow-lg">
            <Trophy className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground/80">
              Наши достижения
            </span>
          </div>
          
                      <h2 className="text-responsive-h1 text-foreground mb-6">
            Проекты
            <span className="text-accent"> AIronLab</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-12">
            Реальные кейсы внедрения ИИ-решений с измеримыми результатами для бизнеса
          </p>

          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-accent/10">
              <div className="text-responsive-stats text-accent mb-1">{stats.totalProjects}+</div>
              <div className="text-responsive-small text-foreground/60">Проектов</div>
            </div>
            <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-accent/10">
              <div className="text-responsive-stats text-accent mb-1">{stats.avgImprovement}</div>
              <div className="text-responsive-small text-foreground/60">Ср. улучшение</div>
            </div>
            <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-accent/10">
              <div className="text-responsive-stats text-accent mb-1">{stats.clientSatisfaction}</div>
              <div className="text-responsive-small text-foreground/60">Довольных клиентов</div>
            </div>
            <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-accent/10">
              <div className="text-responsive-stats text-accent mb-1">24/7</div>
              <div className="text-responsive-small text-foreground/60">Поддержка</div>
            </div>
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                data-clickable="true"
                className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeFilter === category.id
                    ? "bg-accent text-white border-accent shadow-lg scale-105"
                    : "bg-white/60 text-foreground/80 border-accent/20 hover:border-accent/40 hover:bg-white/80"
                }`}
              >
                {category.icon}
                <span className="text-xs sm:text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="relative bg-white/70 backdrop-blur-sm rounded-3xl border border-accent/10 animate-slide-up overflow-hidden non-interactive"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-20 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>Топ проект</span>
                </div>
              )}

              {/* Status badge */}
              <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-medium ${
                project.status === "completed" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-blue-100 text-blue-800"
              }`}>
                {project.status === "completed" ? "Завершен" : "В работе"}
              </div>

              {/* Project Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-accent/10 to-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center">
                    {project.category === "automation" && <Bot className="h-10 w-10 text-accent" />}
                    {project.category === "analytics" && <BarChart3 className="h-10 w-10 text-accent" />}
                    {project.category === "communications" && <Brain className="h-10 w-10 text-accent" />}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Заголовок и клиент */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-accent font-medium mb-2">{project.client}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Результаты */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {project.results.slice(0, 2).map((result, index) => (
                    <div key={index} className="text-center p-2 bg-accent/5 rounded-lg">
                      <div className="text-sm font-bold text-accent">{result.value}</div>
                      <div className="text-xs text-foreground/60">{result.metric}</div>
                    </div>
                  ))}
                </div>

                {/* Технологии */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-accent/10 text-xs text-accent rounded-md">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-accent/10 text-xs text-accent rounded-md">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Срок выполнения */}
                <div className="flex items-center text-sm text-foreground/60 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{project.timeline}</span>
                </div>

                {/* Действия */}
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    data-clickable="true"
                    className="flex items-center space-x-2 text-accent font-medium hover:translate-x-1 transition-transform duration-300"
                  >
                    <span className="text-sm">Детали</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Призыв к действию */}
        <div className="bg-gradient-to-r from-accent/10 via-white/50 to-accent/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-accent/20 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="text-center">
                          <h3 className="text-responsive-h3 text-foreground mb-4">
              Ваш проект может быть следующим!
            </h3>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Обсудим ваши задачи и создадим решение, которое принесет измеримые результаты вашему бизнесу
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="mobile-friendly-button relative overflow-hidden group shadow-lg hover:shadow-xl"
                data-clickable="true"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Обсудить проект</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно детального просмотра */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedProject(null)} data-clickable="true">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-responsive-h3 text-foreground mb-2">{selectedProject.title}</h3>
                  <p className="text-accent font-medium">{selectedProject.client}</p>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  data-clickable="true"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-foreground/70 mb-6 leading-relaxed">{selectedProject.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {selectedProject.results.map((result, index) => (
                  <div key={index} className="text-center p-4 bg-accent/5 rounded-2xl">
                    <div className="text-responsive-stats text-accent mb-1">{result.value}</div>
                    <div className="text-sm text-foreground/60 mb-1">{result.metric}</div>
                    <div className="text-xs text-green-600 font-medium">{result.improvement}</div>
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Технологии:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center text-foreground/60">
                <Clock className="h-4 w-4 mr-2" />
                <span>Срок выполнения: {selectedProject.timeline}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 