import { Author, Category, Tag, Post } from './types';

export const authors: Author[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
    bio: 'Senior Developer and technical writer with 8+ years in full-stack development. Passionate about React, TypeScript, and modern web technologies.',
    social: {
      twitter: 'sarahchen_dev',
      linkedin: 'sarah-chen-dev',
      github: 'sarahchen',
      website: 'https://sarahchen.dev'
    }
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'DevOps engineer and cloud architecture specialist. Writes about infrastructure, automation, and best practices for scalable systems.',
    social: {
      twitter: 'marcus_devops',
      linkedin: 'marcus-rodriguez',
      github: 'mrodriguez'
    }
  },
  {
    id: '3',
    name: 'Emily Watson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'UX Designer turned Frontend Developer. Focuses on design systems, accessibility, and creating delightful user experiences.',
    social: {
      twitter: 'emily_ux_dev',
      linkedin: 'emily-watson-ux',
      website: 'https://emilywatson.design'
    }
  }
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Modern web technologies, frameworks, and best practices'
  },
  {
    id: '2',
    name: 'DevOps & Infrastructure',
    slug: 'devops-infrastructure',
    description: 'Cloud computing, deployment, and system administration'
  },
  {
    id: '3',
    name: 'Design & UX',
    slug: 'design-ux',
    description: 'User experience design and interface development'
  },
  {
    id: '4',
    name: 'Career & Growth',
    slug: 'career-growth',
    description: 'Professional development and industry insights'
  }
];

export const tags: Tag[] = [
  { id: '1', name: 'React', slug: 'react', color: 'blue' },
  { id: '2', name: 'TypeScript', slug: 'typescript', color: 'indigo' },
  { id: '3', name: 'Next.js', slug: 'nextjs', color: 'gray' },
  { id: '4', name: 'Tailwind CSS', slug: 'tailwind', color: 'cyan' },
  { id: '5', name: 'Node.js', slug: 'nodejs', color: 'green' },
  { id: '6', name: 'Docker', slug: 'docker', color: 'blue' },
  { id: '7', name: 'AWS', slug: 'aws', color: 'orange' },
  { id: '8', name: 'Kubernetes', slug: 'kubernetes', color: 'purple' },
  { id: '9', name: 'Design Systems', slug: 'design-systems', color: 'pink' },
  { id: '10', name: 'Accessibility', slug: 'accessibility', color: 'emerald' },
  { id: '11', name: 'Performance', slug: 'performance', color: 'red' },
  { id: '12', name: 'Testing', slug: 'testing', color: 'yellow' }
];

export const posts: Post[] = [
  {
    id: '1',
    slug: 'building-scalable-react-applications-2024',
    title: 'Building Scalable React Applications in 2024',
    subtitle: 'Best practices and patterns for modern React development',
    excerpt: 'Learn how to structure and optimize React applications for scale using the latest patterns, tools, and architectural approaches that will keep your codebase maintainable.',
    content: `# Building Scalable React Applications in 2024

Creating scalable React applications requires careful planning and adherence to best practices...`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
    coverCaption: 'Modern React development workspace',
    publishedAt: '2024-03-15T10:00:00Z',
    readMinutes: 8,
    tags: [tags[0], tags[1], tags[2]],
    category: categories[0],
    author: authors[0],
    featured: true,
    views: 2453
  },
  {
    id: '2',
    slug: 'mastering-docker-containerization',
    title: 'Mastering Docker Containerization for Modern Applications',
    excerpt: 'A comprehensive guide to Docker best practices, multi-stage builds, and container optimization techniques for production deployments.',
    coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
    publishedAt: '2024-03-12T14:30:00Z',
    readMinutes: 12,
    tags: [tags[5], tags[6], tags[7]],
    category: categories[1],
    author: authors[1],
    views: 1876
  },
  {
    id: '3',
    slug: 'design-systems-with-tailwind-css',
    title: 'Creating Consistent Design Systems with Tailwind CSS',
    excerpt: 'How to build and maintain scalable design systems using Tailwind CSS, custom components, and design tokens for consistent user experiences.',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    publishedAt: '2024-03-10T09:15:00Z',
    readMinutes: 10,
    tags: [tags[3], tags[8], tags[9]],
    category: categories[2],
    author: authors[2],
    views: 1654
  },
  {
    id: '4',
    slug: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Better Code',
    excerpt: 'Explore advanced TypeScript features including conditional types, mapped types, and utility types to write more robust and maintainable code.',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    publishedAt: '2024-03-08T16:45:00Z',
    readMinutes: 15,
    tags: [tags[1], tags[0], tags[4]],
    category: categories[0],
    author: authors[0],
    views: 2187
  },
  {
    id: '5',
    slug: 'kubernetes-deployment-strategies',
    title: 'Kubernetes Deployment Strategies for Production',
    excerpt: 'Learn different deployment strategies in Kubernetes including rolling updates, blue-green deployments, and canary releases for zero-downtime deployments.',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
    publishedAt: '2024-03-06T11:20:00Z',
    readMinutes: 18,
    tags: [tags[7], tags[6]],
    category: categories[1],
    author: authors[1],
    views: 1432
  },
  {
    id: '6',
    slug: 'web-accessibility-modern-practices',
    title: 'Web Accessibility: Modern Practices and Tools',
    excerpt: 'Essential accessibility practices for modern web development, including ARIA patterns, testing strategies, and tools to ensure inclusive user experiences.',
    coverImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop',
    publishedAt: '2024-03-04T13:10:00Z',
    readMinutes: 11,
    tags: [tags[9], tags[0], tags[11]],
    category: categories[2],
    author: authors[2],
    views: 1098
  },
  {
    id: '7',
    slug: 'nextjs-13-app-router-guide',
    title: 'Next.js 13 App Router: Complete Migration Guide',
    excerpt: 'Comprehensive guide to migrating from Pages Router to App Router in Next.js 13, including new features, best practices, and common pitfalls.',
    coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
    publishedAt: '2024-03-02T08:30:00Z',
    readMinutes: 14,
    tags: [tags[2], tags[0], tags[1]],
    category: categories[0],
    author: authors[0],
    views: 3021
  },
  {
    id: '8',
    slug: 'performance-optimization-react',
    title: 'Performance Optimization Techniques for React Apps',
    excerpt: 'Practical techniques to optimize React application performance including code splitting, lazy loading, memoization, and bundle analysis.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    publishedAt: '2024-02-28T15:45:00Z',
    readMinutes: 13,
    tags: [tags[0], tags[10], tags[11]],
    category: categories[0],
    author: authors[0],
    views: 1876
  },
  {
    id: '9',
    slug: 'career-growth-senior-developer',
    title: 'From Mid-Level to Senior Developer: A Career Roadmap',
    excerpt: 'Practical advice and strategies for advancing your career from mid-level to senior developer, including technical skills, leadership, and communication.',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    publishedAt: '2024-02-26T12:00:00Z',
    readMinutes: 9,
    tags: [tags[0], tags[1]],
    category: categories[3],
    author: authors[1],
    views: 2341
  },
  {
    id: '10',
    slug: 'testing-strategies-modern-web-apps',
    title: 'Testing Strategies for Modern Web Applications',
    excerpt: 'Comprehensive testing strategies including unit tests, integration tests, and e2e tests using Jest, React Testing Library, and Playwright.',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    publishedAt: '2024-02-24T10:15:00Z',
    readMinutes: 16,
    tags: [tags[11], tags[0], tags[1]],
    category: categories[0],
    author: authors[2],
    views: 1543
  }
];