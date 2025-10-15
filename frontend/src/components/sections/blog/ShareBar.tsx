"use client";

import React, { useState, useEffect } from "react";
import {
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Send,
  Mail,
  Link2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";

interface ShareBarProps {
  title: string;
  excerpt: string;
  url?: string;
  className?: string;
}

/**
 * ShareBar Component
 * Provides social sharing functionality with desktop and mobile variants
 *
 * Features:
 * - Desktop: Floating vertical bar (fixed position on left)
 * - Mobile: Sticky bottom bar + native Web Share API
 * - Platforms: Twitter, LinkedIn, Facebook, Telegram, Email, Copy Link
 * - Visual feedback with toast notifications
 * - Fully accessible with ARIA labels
 */
export function ShareBar({
  title,
  excerpt,
  url,
  className = "",
}: ShareBarProps) {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Get current URL on client side
  useEffect(() => {
    setCurrentUrl(url || window.location.href);

    // Show share bar after scrolling down a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [url]);

  // Share handlers
  const shareOnTwitter = () => {
    const text = `${title}\n\n${excerpt}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
  };

  const shareOnTelegram = () => {
    const text = `${title}\n\n${excerpt}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, "_blank", "noopener,noreferrer");
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${excerpt}\n\nЧитать далее: ${currentUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast({
        title: "Ссылка скопирована",
        description: "Ссылка на статью скопирована в буфер обмена",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
        variant: "destructive",
      });
    }
  };

  // Native Web Share API (mobile)
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: currentUrl,
        });
      } catch (error) {
        // User cancelled share or error occurred
        console.log("Share cancelled or failed");
      }
    }
  };

  // Share buttons configuration
  const shareButtons = [
    {
      name: "Twitter",
      icon: Twitter,
      onClick: shareOnTwitter,
      color: "hover:bg-[#1DA1F2] hover:text-white",
      ariaLabel: "Поделиться в Twitter",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      onClick: shareOnLinkedIn,
      color: "hover:bg-[#0077B5] hover:text-white",
      ariaLabel: "Поделиться в LinkedIn",
    },
    {
      name: "Facebook",
      icon: Facebook,
      onClick: shareOnFacebook,
      color: "hover:bg-[#1877F2] hover:text-white",
      ariaLabel: "Поделиться в Facebook",
    },
    {
      name: "Telegram",
      icon: Send,
      onClick: shareOnTelegram,
      color: "hover:bg-[#0088CC] hover:text-white",
      ariaLabel: "Поделиться в Telegram",
    },
    {
      name: "Email",
      icon: Mail,
      onClick: shareViaEmail,
      color: "hover:bg-gray-600 hover:text-white",
      ariaLabel: "Поделиться по email",
    },
    {
      name: "Copy",
      icon: copied ? Check : Link2,
      onClick: copyLink,
      color: copied ? "bg-green-500 text-white" : "hover:bg-accent hover:text-white",
      ariaLabel: "Скопировать ссылку",
    },
  ];

  return (
    <>
      {/* Desktop Floating Share Bar */}
      <aside
        className={cn(
          "hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40",
          "transition-all duration-300",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none",
          className
        )}
        aria-label="Панель социальных сетей"
      >
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg">
          {/* Share Label */}
          <div className="text-center pb-2 border-b border-gray-200">
            <Share2 className="h-5 w-5 mx-auto text-accent" aria-hidden="true" />
            <p className="text-xs font-medium text-gray-600 mt-1">
              Поделиться
            </p>
          </div>

          {/* Share Buttons */}
          {shareButtons.map((button) => (
            <Button
              key={button.name}
              variant="ghost"
              size="icon"
              onClick={button.onClick}
              className={cn(
                "h-12 w-12 rounded-xl transition-all duration-200",
                "hover:scale-110 hover:shadow-md",
                button.color
              )}
              aria-label={button.ariaLabel}
            >
              <button.icon className="h-5 w-5" aria-hidden="true" />
            </Button>
          ))}
        </div>
      </aside>

      {/* Mobile Sticky Bottom Share Bar */}
      <div
        className={cn(
          "lg:hidden fixed bottom-0 left-0 right-0 z-40",
          "transition-all duration-300",
          isVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between gap-3">
              {/* Native Share Button (if available) */}
              {typeof navigator !== "undefined" && navigator.share && (
                <Button
                  onClick={nativeShare}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white rounded-lg py-6"
                  aria-label="Поделиться"
                >
                  <Share2 className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span className="font-medium">Поделиться</span>
                </Button>
              )}

              {/* Quick Share Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={shareOnTwitter}
                  className="h-12 w-12 rounded-lg"
                  aria-label="Поделиться в Twitter"
                >
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={shareOnTelegram}
                  className="h-12 w-12 rounded-lg"
                  aria-label="Поделиться в Telegram"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyLink}
                  className={cn(
                    "h-12 w-12 rounded-lg",
                    copied && "bg-green-500 text-white border-green-500"
                  )}
                  aria-label="Скопировать ссылку"
                >
                  {copied ? (
                    <Check className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Link2 className="h-5 w-5" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
