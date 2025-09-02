'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/lib/types';

interface CategorySelectProps {
  categories: Category[];
  selectedCategory?: Category | null;
  onSelect: (category: Category | null) => void;
  placeholder?: string;
  className?: string;
}

export default function CategorySelect({ 
  categories, 
  selectedCategory, 
  onSelect,
  placeholder = 'All Categories',
  className 
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category: Category | null) => {
    onSelect(category);
    setIsOpen(false);
  };

  const displayText = selectedCategory ? selectedCategory.name : placeholder;

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2',
          'border border-gray-300 rounded-lg bg-white text-gray-900',
          'dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'dark:focus:ring-blue-400',
          'transition-colors text-sm'
        )}
      >
        <span className={cn(
          selectedCategory ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
        )}>
          {displayText}
        </span>
        <ChevronDown 
          size={16} 
          className={cn(
            'text-gray-400 dark:text-gray-500 transition-transform',
            isOpen && 'transform rotate-180'
          )} 
        />
      </button>

      {isOpen && (
        <div className={cn(
          'absolute top-full left-0 right-0 mt-1 z-50',
          'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
          'rounded-lg shadow-lg max-h-60 overflow-auto'
        )}>
          <button
            type="button"
            onClick={() => handleSelect(null)}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2 text-sm text-left',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              'text-gray-700 dark:text-gray-300',
              !selectedCategory && 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
            )}
          >
            <span>{placeholder}</span>
            {!selectedCategory && (
              <Check size={16} className="text-blue-500 dark:text-blue-400" />
            )}
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleSelect(category)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 text-sm text-left',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                'text-gray-700 dark:text-gray-300',
                selectedCategory?.id === category.id && 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
              )}
            >
              <div>
                <div className="font-medium">{category.name}</div>
                {category.description && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {category.description}
                  </div>
                )}
              </div>
              {selectedCategory?.id === category.id && (
                <Check size={16} className="text-blue-500 dark:text-blue-400" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}