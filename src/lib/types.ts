export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  coverCaption?: string;
  publishedAt: string;
  updatedAt?: string;
  readMinutes: number;
  tags: Tag[];
  category: Category;
  author: Author;
  featured?: boolean;
  views?: number;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNext: boolean;
  hasPrev: boolean;
}