/**
 * TypeScript типы для Supabase
 * 
 * Этот файл генерируется автоматически из схемы Supabase.
 * НЕ РЕДАКТИРУЙТЕ ВРУЧНУЮ!
 * 
 * Для регенерации выполните:
 * ```bash
 * npm run supabase:types
 * ```
 * 
 * Или вручную:
 * ```bash
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
 * ```
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_authors: {
        Row: {
          id: string
          name: string
          email: string | null
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_post_tags: {
        Row: {
          post_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          post_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          post_id?: string
          tag_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          featured_image: string | null
          author_id: string
          category_id: string | null
          status: string
          is_featured: boolean
          reading_time: number | null
          published_at: string | null
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          featured_image?: string | null
          author_id: string
          category_id?: string | null
          status?: string
          is_featured?: boolean
          reading_time?: number | null
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          author_id?: string
          category_id?: string | null
          status?: string
          is_featured?: boolean
          reading_time?: number | null
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "blog_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          full_description: string | null
          cover_image: string | null
          gallery_images: string[] | null
          client_name: string | null
          client_logo: string | null
          industry: string | null
          project_date: string | null
          duration: string | null
          team_size: number | null
          technologies: string[] | null
          results: Json | null
          challenge: string | null
          solution: string | null
          status: string
          is_featured: boolean
          display_order: number | null
          seo_title: string | null
          seo_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          full_description?: string | null
          cover_image?: string | null
          gallery_images?: string[] | null
          client_name?: string | null
          client_logo?: string | null
          industry?: string | null
          project_date?: string | null
          duration?: string | null
          team_size?: number | null
          technologies?: string[] | null
          results?: Json | null
          challenge?: string | null
          solution?: string | null
          status?: string
          is_featured?: boolean
          display_order?: number | null
          seo_title?: string | null
          seo_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          full_description?: string | null
          cover_image?: string | null
          gallery_images?: string[] | null
          client_name?: string | null
          client_logo?: string | null
          industry?: string | null
          project_date?: string | null
          duration?: string | null
          team_size?: number | null
          technologies?: string[] | null
          results?: Json | null
          challenge?: string | null
          solution?: string | null
          status?: string
          is_featured?: boolean
          display_order?: number | null
          seo_title?: string | null
          seo_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      blog_posts_full: {
        Row: {
          id: string | null
          title: string | null
          slug: string | null
          content: string | null
          excerpt: string | null
          featured_image: string | null
          status: string | null
          is_featured: boolean | null
          reading_time: number | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
          author_id: string | null
          author_name: string | null
          author_email: string | null
          author_avatar: string | null
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          category_color: string | null
        }
      }
    }
    Functions: {
      generate_slug: {
        Args: {
          title: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

