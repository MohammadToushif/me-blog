'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';
import { cn, formatDateShort } from '@/lib/utils';
import { Post } from '@/lib/types';
import TagList from './TagList';
import AuthorCard from './AuthorCard';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
  showAuthor?: boolean;
  showExcerpt?: boolean;
  priority?: boolean;
  className?: string;
}

export default function PostCard({ 
  post, 
  variant = 'default', 
  showAuthor = true, 
  showExcerpt = true,
  priority = false,
  className 
}: PostCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -4 }
  };

  if (isFeatured) {
    return (
      <motion.article
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ duration: 0.3 }}
        className={cn(
          'relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800',
          'border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl',
          'transition-shadow duration-300',
          className
        )}
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="aspect-[16/9] relative overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Featured badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                Featured
              </span>
            </div>
            
            {/* Meta info overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-4 text-white/80 text-sm mb-3">
                <time dateTime={post.publishedAt}>
                  {formatDateShort(post.publishedAt)}
                </time>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readMinutes} min read</span>
                </div>
                {post.views && (
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                {post.title}
              </h2>
              
              {post.subtitle && (
                <p className="text-white/90 text-lg mb-3">
                  {post.subtitle}
                </p>
              )}
              
              {showExcerpt && (
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </Link>
        
        <div className="p-6">
          <div className="flex items-center justify-between">
            {showAuthor && (
              <AuthorCard 
                author={post.author} 
                variant="compact" 
                showBio={false}
              />
            )}
            
            <TagList 
              tags={post.tags} 
              limit={3} 
              size="sm"
            />
          </div>
        </div>
      </motion.article>
    );
  }

  if (isCompact) {
    return (
      <motion.article
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ duration: 0.2 }}
        className={cn(
          'group flex gap-4 p-4 rounded-lg',
          'hover:bg-gray-50 dark:hover:bg-gray-800/50',
          'transition-colors duration-200',
          className
        )}
      >
        <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <Link href={`/blog/${post.slug}`} className="block mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
          </Link>
          
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <time dateTime={post.publishedAt}>
              {formatDateShort(post.publishedAt)}
            </time>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{post.readMinutes}m</span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Default variant
  return (
    <motion.article
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className={cn(
        'group overflow-hidden rounded-xl bg-white dark:bg-gray-800',
        'border border-gray-200 dark:border-gray-700',
        'hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-300',
        className
      )}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            {post.category.name}
          </span>
          <time dateTime={post.publishedAt}>
            {formatDateShort(post.publishedAt)}
          </time>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readMinutes} min</span>
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="block mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        {showExcerpt && (
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        <TagList 
          tags={post.tags} 
          limit={3} 
          size="sm"
          className="mb-4"
        />
        
        {showAuthor && (
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <AuthorCard 
              author={post.author} 
              variant="compact" 
              showBio={false}
            />
          </div>
        )}
      </div>
    </motion.article>
  );
}