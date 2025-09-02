'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

// Components
import SearchBar from '@/components/SearchBar';
import CategorySelect from '@/components/CategorySelect';
import ThemeToggle from '@/components/ThemeToggle';
import PostCard from '@/components/PostCard';
// import TagList from '@/components/TagList';
import Tag from '@/components/Tags';
import Pagination from '@/components/Pagination';
import NewsletterCard from '@/components/NewsletterCard';
import { PostCardSkeleton } from '@/components/Skeleton';

// Data and types
import { posts, categories, tags } from '@/lib/mockData';
import { Category, Tag as TagType } from '@/lib/types';

const POSTS_PER_PAGE = 6;

export default function HomePage() {
  // State for filters and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Featured post (first post marked as featured)
  const featuredPost = posts.find(post => post.featured) || posts[0];
  const regularPosts = posts.filter(post => post.id !== featuredPost.id);

  // Filter posts based on search, category, and tags
  const filteredPosts = useMemo(() => {
    let filtered = regularPosts;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category.id === selectedCategory.id);
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.every(selectedTag =>
          post.tags.some(postTag => postTag.id === selectedTag.id)
        )
      );
    }

    return filtered;
  }, [regularPosts, searchQuery, selectedCategory, selectedTags]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Handle tag selection
  const handleTagClick = (tag: TagType) => {
    if (!selectedTags.find(t => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
      setCurrentPage(1);
    }
  };

  const handleTagRemove = (tag: TagType) => {
    setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Handle category change
  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const hasFilters = searchQuery || selectedCategory || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DevBlog
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <SearchBar
                onSearch={handleSearch}
                initialValue={searchQuery}
                className="w-80"
              />
              <CategorySelect
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={handleCategoryChange}
                className="w-48"
              />
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-600 dark:text-gray-400">
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <SearchBar
              onSearch={handleSearch}
              initialValue={searchQuery}
              className="w-full"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Post Section */}
        {!hasFilters && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Featured Post
              </h2>
            </div>
            
            <PostCard
              post={featuredPost}
              variant="featured"
              priority
            />
          </motion.section>
        )}

        {/* Filters Section */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Popular tags */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Popular:
              </span>
              {tags.slice(0, 6).map((tag) => (
                <Tag
                  key={tag.id}
                  tag={tag}
                  variant="outline"
                  onClick={handleTagClick}
                />
              ))}
            </div>
          </div>

          {/* Active filters */}
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Active filters:
              </span>
              
              {selectedCategory && (
                <Tag
                  tag={{ id: selectedCategory.id, name: selectedCategory.name, slug: selectedCategory.slug }}
                  variant="filter"
                  removable
                  onRemove={() => setSelectedCategory(null)}
                />
              )}
              
              {selectedTags.map((tag) => (
                <Tag
                  key={tag.id}
                  tag={tag}
                  variant="filter"
                  removable
                  onRemove={handleTagRemove}
                />
              ))}
              
              {searchQuery && (
                <Tag
                  tag={{ id: 'search', name: `"${searchQuery}"`, slug: 'search' }}
                  variant="filter"
                  removable
                  onRemove={() => setSearchQuery('')}
                />
              )}
              
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </section>

        {/* Posts Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {hasFilters ? 'Search Results' : 'Latest Posts'}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </div>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {/* Posts grid */}
              {paginatedPosts.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, staggerChildren: 0.1 }}
                >
                  {paginatedPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-500 dark:text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No posts found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your search or filters to find what you&apos;re looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <NewsletterCard />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                DevBlog
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A modern platform for developers to share knowledge, insights, and experiences 
                in web development, DevOps, and design.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link 
                      href={`/category/${category.slug}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 DevBlog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}