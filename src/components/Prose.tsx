import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export default function Prose({ children, className }: ProseProps) {
  return (
    <div className={cn(
      // Base typography
      'prose prose-lg dark:prose-invert max-w-none',
      
      // Headings
      'prose-headings:font-bold prose-headings:tracking-tight',
      'prose-h1:text-4xl prose-h1:mb-8 prose-h1:leading-tight',
      'prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight',
      'prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4',
      'prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3',
      
      // Paragraphs and text
      'prose-p:leading-relaxed prose-p:mb-6',
      'prose-p:text-gray-700 dark:prose-p:text-gray-300',
      
      // Links
      'prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline',
      'dark:prose-a:text-blue-400',
      
      // Lists
      'prose-ul:mb-6 prose-ol:mb-6',
      'prose-li:mb-2 prose-li:leading-relaxed',
      
      // Blockquotes
      'prose-blockquote:border-l-4 prose-blockquote:border-blue-500',
      'prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8',
      'prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20',
      'prose-blockquote:rounded-r-lg prose-blockquote:not-italic',
      
      // Code
      'prose-code:bg-gray-100 dark:prose-code:bg-gray-800',
      'prose-code:px-2 prose-code:py-1 prose-code:rounded',
      'prose-code:text-sm prose-code:font-mono',
      'prose-code:before:content-none prose-code:after:content-none',
      
      // Pre/Code blocks
      'prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950',
      'prose-pre:rounded-lg prose-pre:p-6 prose-pre:overflow-x-auto',
      'prose-pre:my-8 prose-pre:text-sm',
      
      // Images
      'prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8',
      
      // Tables
      'prose-table:my-8',
      'prose-thead:bg-gray-50 dark:prose-thead:bg-gray-800',
      'prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold',
      'prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-gray-200',
      'dark:prose-td:border-gray-700',
      
      // HR
      'prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-hr:my-12',
      
      className
    )}>
      {children}
    </div>
  );
}