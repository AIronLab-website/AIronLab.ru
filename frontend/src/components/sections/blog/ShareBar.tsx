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
import { trackShareClick } from "@/lib/analytics";

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

    // Show share bar after scrolling down a bit with debounce
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsVisible(window.scrollY > 300);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [url]);

  // Share handlers - memoized to prevent re-creation on every render
  const shareOnTwitter = React.useCallback(() => {
    trackShareClick('twitter', title);
    const text = `${title}\n\n${excerpt}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  }, [title, excerpt, currentUrl]);

  const shareOnLinkedIn = React.useCallback(() => {
    trackShareClick('linkedin', title);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  }, [title, currentUrl]);

  const shareOnFacebook = React.useCallback(() => {
    trackShareClick('facebook', title);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
  }, [title, currentUrl]);

  const shareOnTelegram = React.useCallback(() => {
    trackShareClick('telegram', title);
    const text = `${title}\n\n${excerpt}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, "_blank", "noopener,noreferrer");
  }, [title, excerpt, currentUrl]);

  const shareViaEmail = React.useCallback(() => {
    trackShareClick('email', title);
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${excerpt}\n\nЧитать далее: ${currentUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [title, excerpt, currentUrl]);

  const copyLink = React.useCallback(async () => {
    try {
      trackShareClick('copy_link', title);
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
  }, [title, currentUrl, toast]);

  // Native Web Share API (mobile)
  const nativeShare = React.useCallback(async () => {
    if (navigator.share) {
      try {
        trackShareClick('native_share', title);
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
  }, [title, excerpt, currentUrl]);

  // Share buttons configuration - memoized to prevent re-creation
  const shareButtons = React.useMemo(
    () => [
      {
        name: "Twitter",
        icon: Twitter,
        onClick: shareOnTwitter,
        color: "hover:bg-[#1DA1F2] hover:text-white",
        ariaLabel: `Share article "${title}" on Twitter`,
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        onClick: shareOnLinkedIn,
        color: "hover:bg-[#0077B5] hover:text-white",
        ariaLabel: `Share article "${title}" on LinkedIn`,
      },
      {
        name: "Facebook",
        icon: Facebook,
        onClick: shareOnFacebook,
        color: "hover:bg-[#1877F2] hover:text-white",
        ariaLabel: `Share article "${title}" on Facebook`,
      },
      {
        name: "Telegram",
        icon: Send,
        onClick: shareOnTelegram,
        color: "hover:bg-[#0088CC] hover:text-white",
        ariaLabel: `Share article "${title}" on Telegram`,
      },
      {
        name: "Email",
        icon: Mail,
        onClick: shareViaEmail,
        color: "hover:bg-gray-600 hover:text-white",
        ariaLabel: `Share article "${title}" via email`,
      },
      {
        name: "Copy",
        icon: copied ? Check : Link2,
        onClick: copyLink,
        color: copied ? "bg-green-500 text-white" : "hover:bg-accent hover:text-white",
        ariaLabel: copied ? "Link copied to clipboard" : `Copy link to article "${title}"`,
      },
    ],
    [copied, title, shareOnTwitter, shareOnLinkedIn, shareOnFacebook, shareOnTelegram, shareViaEmail, copyLink]
  );

  return (
    <>
      {/* Desktop Floating Share Bar */}
      <aside
        role="complementary"
        className={cn(
          "hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40",
          "transition-all duration-300",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none",
          className
        )}
        aria-label="Social sharing options"
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
                  aria-label={`Share article "${title}" using native share`}
                >
                  <Share2 className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span className="font-medium">Поделиться</span>
                </Button>
              )}

              {/* Quick Share Buttons */}
              <div className="flex gap-2" role="group" aria-label="Quick share options">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={shareOnTwitter}
                  className="h-12 w-12 rounded-lg"
                  aria-label={`Share article "${title}" on Twitter`}
                >
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={shareOnTelegram}
                  className="h-12 w-12 rounded-lg"
                  aria-label={`Share article "${title}" on Telegram`}
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
                  aria-label={copied ? "Link copied to clipboard" : `Copy link to article "${title}"`}
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
