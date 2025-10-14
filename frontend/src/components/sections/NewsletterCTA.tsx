"use client";

import React, { useState } from "react";
import { Mail, Bell, Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface NewsletterCTAProps {
  className?: string;
  title?: string;
  description?: string;
}

/**
 * NewsletterCTA Component
 * Email subscription call-to-action with glass morphism design
 *
 * Features:
 * - Glass morphism card with gradient
 * - Email validation
 * - Success state
 * - Floating icons animation
 * - Mobile-friendly
 * - Accessible
 */
export function NewsletterCTA({
  className,
  title = "Подпишитесь на рассылку",
  description = "Получайте новые статьи и инсайты прямо на почту. Только полезные материалы, без спама.",
}: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Пожалуйста, введите корректный email");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "bg-gradient-to-br from-accent/10 via-purple-50 to-blue-50",
        "border border-white/20",
        "p-8 md:p-12",
        className
      )}
    >
      {/* Floating Icons */}
      <div className="absolute top-8 right-8 text-accent/20 animate-float" aria-hidden="true">
        <Mail className="h-16 w-16 md:h-20 md:w-20" />
      </div>
      <div className="absolute bottom-8 left-8 text-purple-400/20 animate-float-delayed" aria-hidden="true">
        <Bell className="h-12 w-12 md:h-16 md:w-16" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-responsive-h2 mb-4">{title}</h3>
          <p className="text-responsive-body text-muted-foreground max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-green-50 border border-green-200 animate-scale-in">
            <div className="flex items-center justify-center gap-3 text-green-700">
              <Check className="h-6 w-6" aria-hidden="true" />
              <p className="text-lg font-medium">Спасибо за подписку!</p>
            </div>
            <p className="text-sm text-green-600 mt-2">
              Мы отправили вам письмо для подтверждения
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Email Input */}
              <div className="flex-1">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ваш@email.com"
                  className={cn(
                    "h-14 px-6 text-base",
                    "bg-white/80 backdrop-blur-sm",
                    "border-white/40",
                    "focus-visible:ring-accent focus-visible:border-accent",
                    "transition-all duration-300",
                    error && "border-red-400 focus-visible:ring-red-400"
                  )}
                  aria-label="Email для подписки"
                  aria-invalid={!!error}
                  aria-describedby={error ? "email-error" : undefined}
                  disabled={isSubmitting}
                />
                {error && (
                  <p
                    id="email-error"
                    className="text-sm text-red-600 mt-2 text-left"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className={cn(
                  "h-14 px-8 rounded-xl",
                  "bg-accent text-white font-medium",
                  "hover:bg-accent/90 hover:scale-105",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                  "transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                  "flex items-center justify-center gap-2",
                  "whitespace-nowrap"
                )}
                aria-label="Подписаться на рассылку"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Подписываем...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" aria-hidden="true" />
                    <span>Подписаться</span>
                  </>
                )}
              </button>
            </div>

            {/* Privacy Notice */}
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
              <span>Без спама. Отписаться можно в любой момент.</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
