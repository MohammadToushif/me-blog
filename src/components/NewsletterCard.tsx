'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsletterCardProps {
  className?: string;
}

export default function NewsletterCard({ className }: NewsletterCardProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  if (isSubscribed) {
    return (
      <div className={cn(
        'rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50',
        'dark:from-green-900/20 dark:to-emerald-900/20',
        'border border-green-200 dark:border-green-800',
        'p-8 text-center',
        className
      )}>
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
          Thanks for subscribing!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          You&apos;ll receive our latest posts and updates.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      'rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50',
      'dark:from-blue-900/20 dark:to-indigo-900/20',
      'border border-blue-200 dark:border-blue-800',
      'p-8',
      className
    )}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Stay Updated
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Get the latest articles and insights delivered straight to your inbox. 
          No spam, just quality content.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className={cn(
              'w-full px-4 py-3 rounded-lg border border-gray-300',
              'bg-white text-gray-900 placeholder-gray-500',
              'dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400',
              'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'dark:focus:ring-blue-400',
              'transition-colors'
            )}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className={cn(
            'w-full px-6 py-3 rounded-lg font-medium',
            'bg-blue-600 text-white hover:bg-blue-700',
            'dark:bg-blue-500 dark:hover:bg-blue-600',
            'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'dark:focus:ring-offset-gray-900',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-200'
          )}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
        By subscribing, you agree to our privacy policy and terms of service.
      </p>
    </div>
  );
}