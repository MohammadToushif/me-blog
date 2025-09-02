'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Twitter, 
  Linkedin, 
  Link2, 
  ChevronLeft, 
  ChevronRight,
  MessageCircle,
  Heart,
  Bookmark
} from 'lucide-react';
import { Metadata } from 'next';

// Components
import AuthorCard from '@/components/AuthorCard';
import TagList from '@/components/TagList';
import PostCard from '@/components/PostCard';
import Prose from '@/components/Prose';
import ThemeToggle from '@/components/ThemeToggle';

// Data and utilities
import { posts } from '@/lib/mockData';
import { formatDate, cn } from '@/lib/utils';
import { Post } from '@/lib/types';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Mock function to get post by slug (in real app, this would be a server component)
function getPostBySlug(slug: string): Post | null {
  return posts.find(post => post.slug === slug) || null;
}

function getRelatedPosts(currentPost: Post): Post[] {
  return posts
    .filter(post => 
      post.id !== currentPost.id && (
        post.category.id === currentPost.category.id ||
        post.tags.some(tag => currentPost.tags.some(currentTag => currentTag.id === tag.id))
      )
    )
    .slice(0, 3);
}

function getNextPrevPosts(currentPost: Post): { next: Post | null; prev: Post | null } {
  const currentIndex = posts.findIndex(post => post.id === currentPost.id);
  return {
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Post not found
          </h1>
          <Link 
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post);
  const { next: nextPost, prev: prevPost } = getNextPrevPosts(post);

  // Share functions
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${post.slug}`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareOnTwitter = () => {
    const text = `Check out this article: ${post.title}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  // Mock content (in real app, this would come from MDX or CMS)
  const mockContent = `
# ${post.title}

${post.subtitle || ''}

${post.excerpt}

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Key Points

- First important point about the topic
- Second crucial insight you should know
- Third essential concept to understand

## Deep Dive

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

> This is an important quote or callout that emphasizes a key concept in the article.

### Code Example

\`\`\`typescript
// Example TypeScript code
interface BlogPost {
  id: string;
  title: string;
  content: string;
}

function createPost(data: Partial<BlogPost>): BlogPost {
  return {
    id: generateId(),
    title: data.title || 'Untitled',
    content: data.content || ''
  };
}
\`\`\`

## Advanced Concepts

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

### Best Practices

1. Always follow industry standards
2. Write clean, maintainable code
3. Test your implementations thoroughly
4. Document your work properly

## Conclusion

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

---

*Thank you for reading! If you found this helpful, please share it with others.*
  `.trim();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to posts</span>
            </Link>

            <div className="flex items-center gap-4">
              {/* Action buttons */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  'flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors',
                  isLiked 
                    ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                <span>42</span>
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={cn(
                  'flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors',
                  isBookmarked 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
              </button>

              {/* Share button */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>

                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <button
                      onClick={copyToClipboard}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Link2 size={16} />
                      {copySuccess ? 'Copied!' : 'Copy link'}
                    </button>
                    <button
                      onClick={shareOnTwitter}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Twitter size={16} />
                      Share on Twitter
                    </button>
                    <button
                      onClick={shareOnLinkedIn}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Linkedin size={16} />
                      Share on LinkedIn
                    </button>
                  </div>
                )}
              </div>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Share menu backdrop */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowShareMenu(false)}
        />
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article header */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12"
        >
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">
                Home
              </Link>
              <span>/</span>
              <Link href={`/category/${post.category.slug}`} className="hover:text-gray-700 dark:hover:text-gray-300">
                {post.category.name}
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">
                {post.title}
              </span>
            </div>
          </nav>

          {/* Article meta */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{post.readMinutes} min read</span>
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-full text-xs font-medium">
                {post.category.name}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {post.subtitle}
              </p>
            )}

            <TagList tags={post.tags} size="md" className="mb-8" />
          </div>

          {/* Author info */}
          <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <AuthorCard author={post.author} />
          </div>

          {/* Cover image */}
          <div className="mb-12">
            <div className="aspect-[16/9] relative overflow-hidden rounded-2xl">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
            </div>
            {post.coverCaption && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                {post.coverCaption}
              </p>
            )}
          </div>

          {/* Article content */}
          <div className="mb-16">
            <Prose>
              <div dangerouslySetInnerHTML={{ __html: mockContent.replace(/\n/g, '<br />') }} />
            </Prose>
          </div>

          {/* Article footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-16">
            <div className="flex items-center justify-between">
              <TagList tags={post.tags} />
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                    isLiked 
                      ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                  <span>42 likes</span>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <MessageCircle size={20} />
                  <span>12 comments</span>
                </button>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Comments section placeholder */}
        <section className="mb-16">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Comments
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Join the discussion and share your thoughts on this article.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Load Comments
            </button>
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <PostCard
                  key={relatedPost.id}
                  post={relatedPost}
                  showAuthor={false}
                />
              ))}
            </div>
          </section>
        )}

        {/* Next/Previous navigation */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Previous
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {prevPost.title}
                  </div>
                </div>
              </Link>
            )}

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors md:text-right"
              >
                <div className="min-w-0 flex-1 md:order-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Next
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {nextPost.title}
                  </div>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 md:order-2" />
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

// Generate metadata for SEO (Next.js 13+ app directory)
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}