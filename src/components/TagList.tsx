import { Tag as TagType } from '@/lib/types';
import Tag from './Tags';
import { cn } from '@/lib/utils';

interface TagListProps {
  tags: TagType[];
  variant?: 'default' | 'outline' | 'filter';
  size?: 'sm' | 'md';
  limit?: number;
  onTagClick?: (tag: TagType) => void;
  className?: string;
}

export default function TagList({ 
  tags, 
  variant = 'default',
  size = 'sm',
  limit,
  onTagClick,
  className 
}: TagListProps) {
  const displayTags = limit ? tags.slice(0, limit) : tags;
  const hasMore = limit && tags.length > limit;

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {displayTags.map((tag) => (
        <Tag
          key={tag.id}
          tag={tag}
          variant={variant}
          size={size}
          onClick={onTagClick}
        />
      ))}
      {hasMore && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          +{tags.length - limit!} more
        </span>
      )}
    </div>
  );
}