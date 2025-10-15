"use client";

import React, { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";

interface BookmarkButtonProps {
  postId: string;
  postTitle: string;
  variant?: "default" | "icon";
  className?: string;
}

/**
 * BookmarkButton Component
 * Allows users to save/bookmark articles for later reading
 *
 * Features:
 * - Saves to localStorage
 * - Visual feedback with animations
 * - Toast notifications
 * - Two variants: default (with text) and icon-only
 * - Persists across sessions
 */
export function BookmarkButton({
  postId,
  postTitle,
  variant = "default",
  className = "",
}: BookmarkButtonProps) {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load bookmark status from localStorage
  useEffect(() => {
    try {
      const bookmarks = getBookmarks();
      setIsBookmarked(bookmarks.some((b) => b.id === postId));
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  // Get all bookmarks from localStorage
  const getBookmarks = (): Array<{ id: string; title: string; savedAt: string }> => {
    try {
      const stored = localStorage.getItem("aironlab-bookmarks");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error parsing bookmarks:", error);
      return [];
    }
  };

  // Save bookmarks to localStorage
  const saveBookmarks = (bookmarks: Array<{ id: string; title: string; savedAt: string }>) => {
    try {
      localStorage.setItem("aironlab-bookmarks", JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Error saving bookmarks:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить закладку",
        variant: "destructive",
      });
    }
  };

  // Toggle bookmark
  const handleToggle = () => {
    const bookmarks = getBookmarks();

    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter((b) => b.id !== postId);
      saveBookmarks(updated);
      setIsBookmarked(false);

      toast({
        title: "Закладка удалена",
        description: "Статья удалена из сохраненных",
      });
    } else {
      // Add bookmark
      const newBookmark = {
        id: postId,
        title: postTitle,
        savedAt: new Date().toISOString(),
      };
      saveBookmarks([...bookmarks, newBookmark]);
      setIsBookmarked(true);

      toast({
        title: "Статья сохранена",
        description: "Вы можете найти её в закладках",
      });
    }
  };

  if (isLoading) {
    return null; // Or a skeleton loader
  }

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className={cn(
          "h-10 w-10 rounded-lg transition-all duration-200",
          "hover:scale-110",
          isBookmarked
            ? "text-accent bg-accent/10 hover:bg-accent/20"
            : "text-gray-600 hover:text-accent hover:bg-accent/10",
          className
        )}
        aria-label={isBookmarked ? "Удалить из закладок" : "Добавить в закладки"}
      >
        {isBookmarked ? (
          <BookmarkCheck
            className="h-5 w-5 animate-scale-in"
            aria-hidden="true"
          />
        ) : (
          <Bookmark className="h-5 w-5" aria-hidden="true" />
        )}
      </Button>
    );
  }

  return (
    <Button
      variant={isBookmarked ? "default" : "outline"}
      onClick={handleToggle}
      className={cn(
        "gap-2 transition-all duration-200",
        isBookmarked &&
          "bg-accent hover:bg-accent/90 text-white border-accent",
        className
      )}
      aria-label={isBookmarked ? "Удалить из закладок" : "Добавить в закладки"}
    >
      {isBookmarked ? (
        <BookmarkCheck
          className="h-4 w-4 animate-scale-in"
          aria-hidden="true"
        />
      ) : (
        <Bookmark className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="font-medium">
        {isBookmarked ? "В закладках" : "Сохранить"}
      </span>
    </Button>
  );
}
