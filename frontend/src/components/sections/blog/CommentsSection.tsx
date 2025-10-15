"use client";

import React, { useState } from "react";
import { MessageCircle, Heart, Reply, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isAuthor?: boolean;
  };
  content: string;
  publishedAt: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  postId: string;
  postAuthorId: string;
  allowComments?: boolean;
  className?: string;
}

/**
 * CommentsSection Component
 * Modern UI for blog post comments
 *
 * Features:
 * - Nested reply structure
 * - Like/Reply buttons
 * - Author highlighting
 * - Markdown support (future)
 * - Responsive design
 *
 * Note: This is UI-only for now. Backend integration pending.
 */
export function CommentsSection({
  postId,
  postAuthorId,
  allowComments = true,
  className = "",
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");

  // Mock comments data
  const mockComments: Comment[] = [
    {
      id: "1",
      author: {
        name: "Александр Иванов",
        avatar: "/images/authors/alexander.jpg",
        isAuthor: true,
      },
      content:
        "Спасибо за интерес к статье! Если у вас есть вопросы по внедрению подобных решений, с радостью помогу.",
      publishedAt: "2025-01-11T10:30:00Z",
      likes: 12,
    },
    {
      id: "2",
      author: {
        name: "Мария Смирнова",
        avatar: undefined,
      },
      content:
        "Очень полезная статья! А какие метрики вы использовали для оценки качества ответов AI-ассистента?",
      publishedAt: "2025-01-11T14:20:00Z",
      likes: 5,
      replies: [
        {
          id: "2-1",
          author: {
            name: "Александр Иванов",
            avatar: "/images/authors/alexander.jpg",
            isAuthor: true,
          },
          content:
            "Отличный вопрос! Мы использовали несколько метрик: CSAT (удовлетворенность клиента), точность ответа (проверка экспертами), время первого ответа. Подробнее напишу об этом в следующей статье.",
          publishedAt: "2025-01-11T15:00:00Z",
          likes: 8,
        },
      ],
    },
    {
      id: "3",
      author: {
        name: "Дмитрий Петров",
        avatar: undefined,
      },
      content:
        "Сколько примерно времени заняло обучение команды работе с новой системой?",
      publishedAt: "2025-01-12T09:15:00Z",
      likes: 3,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} ч назад`;
    } else if (diffInHours < 24 * 7) {
      const days = Math.floor(diffInHours / 24);
      return `${days} д назад`;
    } else {
      return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement comment submission
    console.log("Submit comment:", newComment);
    setNewComment("");
  };

  const CommentItem = ({
    comment,
    isNested = false,
  }: {
    comment: Comment;
    isNested?: boolean;
  }) => (
    <div
      className={cn(
        "group",
        isNested && "ml-12 mt-4 pl-4 border-l-2 border-gray-200"
      )}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <Avatar className="h-10 w-10 flex-shrink-0">
          {comment.author.avatar ? (
            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          ) : null}
          <AvatarFallback className="bg-accent text-white text-sm">
            {getInitials(comment.author.name)}
          </AvatarFallback>
        </Avatar>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Author and Meta */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-semibold text-gray-900">
              {comment.author.name}
            </span>
            {comment.author.isAuthor && (
              <Badge
                variant="default"
                className="bg-accent text-white text-xs px-2 py-0.5"
              >
                Автор
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">
              {formatDate(comment.publishedAt)}
            </span>
          </div>

          {/* Comment Text */}
          <p className="text-gray-700 mb-3 leading-relaxed">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-gray-600 hover:text-accent"
            >
              <Heart className="h-4 w-4 mr-1.5" aria-hidden="true" />
              <span className="text-sm">{comment.likes}</span>
              <span className="sr-only">Нравится</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-gray-600 hover:text-accent"
            >
              <Reply className="h-4 w-4 mr-1.5" aria-hidden="true" />
              <span className="text-sm">Ответить</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isNested />
          ))}
        </div>
      )}
    </div>
  );

  if (!allowComments) {
    return null;
  }

  return (
    <section
      className={cn(
        "py-16 bg-gradient-to-br from-white to-gray-50",
        className
      )}
      aria-labelledby="comments-heading"
    >
      <div className="container-custom max-w-4xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="h-7 w-7 text-accent" aria-hidden="true" />
          <h2 id="comments-heading" className="text-responsive-h3">
            Комментарии
          </h2>
          <Badge variant="secondary" className="ml-2">
            {mockComments.length}
          </Badge>
        </div>

        {/* New Comment Form */}
        <div className="mb-12 p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-4">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback className="bg-gray-200">
                  <User className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Поделитесь своими мыслями..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px] resize-none bg-white"
                  aria-label="Новый комментарий"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Поддерживается Markdown форматирование
              </p>
              <Button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-accent hover:bg-accent/90"
              >
                Опубликовать
              </Button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-8">
          {mockComments.length > 0 ? (
            mockComments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <div className="text-center py-12">
              <MessageCircle
                className="h-12 w-12 mx-auto text-gray-300 mb-4"
                aria-hidden="true"
              />
              <p className="text-gray-500">
                Пока нет комментариев. Станьте первым!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
