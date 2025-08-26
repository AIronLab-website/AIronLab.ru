"use client";

import React from "react";
import { ArrowRight, Sparkles, Zap, Brain, Bot, Cpu, Eye, Network, Database, Activity, Layers, Lightbulb, CircuitBoard, Settings, Workflow, Radar, Search, Cloud, Monitor, Atom } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { scrollToSection, getImagePath } from "@/lib/utils";

export const HeroSection: React.FC = () => {
  const handleCTAClick = () => {
    scrollToSection("contact");
  };

  const handleServicesClick = () => {
    scrollToSection("services");
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30 pt-20 sm:pt-24 md:pt-28 non-interactive" data-scroll-container="true">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial opacity-30"></div>
      </div>

      {/* ИИ интерактивные элементы - меньше на мобильных */}
      <div className="absolute inset-0 pointer-events-none non-interactive">
        {/* Основные ИИ иконки - видны всегда */}
        <div className="absolute top-[15%] left-[8%] animate-float transition-transform duration-300">
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-accent/20">
            <Brain className="h-7 w-7 text-accent" />
          </div>
        </div>
        
        <div className="absolute top-[22%] right-[12%] animate-float-delayed transition-transform duration-300">
          <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Cpu className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="absolute top-[68%] left-[5%] animate-float transition-transform duration-300" style={{ animationDelay: "1.2s" }}>
          <div className="p-3.5 bg-white/10 backdrop-blur-sm rounded-full border border-accent/20">
            <Bot className="h-8 w-8 text-accent" />
          </div>
        </div>

        <div className="absolute top-[75%] right-[7%] animate-float-delayed transition-transform duration-300" style={{ animationDelay: "0.8s" }}>
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Network className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Дополнительные иконки - только на планшетах и десктопах */}
        <div className="hidden md:block absolute top-[35%] left-[88%] animate-float transition-transform duration-300" style={{ animationDelay: "1.8s" }}>
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-accent/20">
            <Eye className="h-6 w-6 text-accent" />
          </div>
        </div>

        <div className="hidden md:block absolute top-[55%] left-[15%] animate-float-delayed transition-transform duration-300" style={{ animationDelay: "2.3s" }}>
          <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Database className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[8%] left-[65%] animate-float transition-transform duration-300" style={{ animationDelay: "0.5s" }}>
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-accent/20">
            <Activity className="h-6 w-6 text-accent" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[45%] left-[2%] animate-float-delayed transition-transform duration-300" style={{ animationDelay: "1.5s" }}>
          <div className="p-3.5 bg-white/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Layers className="h-7 w-7 text-primary" />
          </div>
        </div>

        <div className="hidden md:block absolute top-[58%] right-[25%] animate-float transition-transform duration-300" style={{ animationDelay: "2.1s" }}>
          <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-accent/20">
            <Lightbulb className="h-6 w-6 text-accent" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[5%] left-[25%] animate-float-delayed transition-transform duration-300" style={{ animationDelay: "1.7s" }}>
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-primary/20">
            <CircuitBoard className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[85%] left-[25%] animate-float transition-transform duration-300" style={{ animationDelay: "1.9s" }}>
          <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-accent/20">
            <Settings className="h-6 w-6 text-accent" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[18%] right-[25%] animate-float-delayed transition-transform duration-300" style={{ animationDelay: "2.7s" }}>
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Workflow className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[42%] right-[5%] animate-float transition-transform duration-300" style={{ animationDelay: "0.9s" }}>
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-accent/20">
            <Radar className="h-5 w-5 text-accent" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[88%] right-[15%] animate-float-delayed transition-transform duration-300" style={{ animationDelay: "2.4s" }}>
          <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Search className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[82%] left-[82%] animate-float transition-transform duration-300" style={{ animationDelay: "1.3s" }}>
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-accent/20">
            <Cloud className="h-5 w-5 text-accent" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[12%] right-[75%] animate-float-delayed transition-transform duration-300" style={{ animationDelay: "3.1s" }}>
          <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Monitor className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[92%] left-[65%] animate-float transition-transform duration-300" style={{ animationDelay: "2.8s" }}>
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-accent/20">
            <Atom className="h-5 w-5 text-accent" />
          </div>
        </div>
      </div>

      <div className="container-custom text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-3 mb-8 animate-slide-down shadow-lg">
          <Zap className="h-4 w-4 text-accent animate-pulse" />
          <span className="text-sm font-medium text-foreground/80">
            ИИ автоматизации для бизнеса
          </span>
        </div>

        {/* Заголовок с иконкой и интерактивными элементами */}
        <div className="relative">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <img
              src={getImagePath("/images/icon.png")}
              alt="AIronLab Icon"
              className="h-12 sm:h-16 md:h-20 object-contain transition-all duration-300 hover:rotate-12 hover:scale-110 cursor-pointer"
            />
            <h1 className="text-responsive-h1 font-bold text-black transition-all duration-300 hover:scale-105 cursor-pointer">
              AIronLab
            </h1>
          </div>
        </div>

        {/* Подзаголовок */}
        <div className="relative">
          <p className="text-responsive-h3 text-foreground/70 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up hover:text-foreground/90 transition-colors duration-300 px-4" style={{ animationDelay: "0.9s" }}>
            Уникальные ИИ-решения для вашего бизнеса
          </p>
        </div>

        {/* Дополнительное описание */}
        <div className="relative">
          <p className="text-responsive-body text-foreground/60 mb-8 sm:mb-12 max-w-2xl mx-auto animate-fade-in hover:text-foreground/80 transition-colors duration-300 px-4" style={{ animationDelay: "1.2s" }}>
            Автоматизируем рост выручки, оптимизируем ресурсы компании и создаём устойчивые конкурентные преимущества
          </p>
        </div>

        {/* CTA кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up px-4" style={{ animationDelay: "1.5s" }}>
          <Button
            onClick={handleCTAClick}
            size="lg"
            className="mobile-friendly-button relative overflow-hidden group w-full sm:w-auto shadow-lg hover:shadow-xl"
            data-clickable="true"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Оставить заявку</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            {/* Анимированный фон */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          
          <Button
            variant="outline"
            onClick={handleServicesClick}
            size="lg"
            className="mobile-friendly-button relative overflow-hidden group w-full sm:w-auto bg-white/50 backdrop-blur-sm border-foreground/20 hover:bg-white/70 hover:border-accent/40"
            data-clickable="true"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span>Наши услуги</span>
            </span>
          </Button>
        </div>

        {/* Статистика или дополнительная информация */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 animate-fade-in px-4 non-interactive" style={{ animationDelay: "1.8s" }}>
          <div className="text-center non-interactive">
            <div className="text-responsive-stats text-accent mb-1 sm:mb-2">30+</div>
            <div className="text-responsive-small text-foreground/60">Успешных проектов</div>
          </div>
          <div className="text-center non-interactive">
            <div className="text-responsive-stats text-accent mb-1 sm:mb-2">24/7</div>
            <div className="text-responsive-small text-foreground/60">Поддержка клиентов</div>
          </div>
          <div className="text-center non-interactive">
            <div className="text-responsive-stats text-accent mb-1 sm:mb-2">+120%</div>
            <div className="text-responsive-small text-foreground/60">Рост эффективности бизнеса</div>
          </div>
        </div>
      </div>

    </section>
  );
}; 