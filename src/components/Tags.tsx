"use client";

import { cn } from "@/lib/utils";
import { Tag as TagType } from "@/lib/types";
import { X } from "lucide-react";

interface TagProps {
  tag: TagType;
  variant?: "default" | "outline" | "filter";
  size?: "sm" | "md";
  removable?: boolean;
  onRemove?: (tag: TagType) => void;
  onClick?: (tag: TagType) => void;
  className?: string;
}

const colorVariants = {
  blue: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30",
  indigo:
    "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:hover:bg-indigo-900/30",
  gray: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
  cyan: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:hover:bg-cyan-900/30",
  green:
    "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30",
  orange:
    "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:hover:bg-orange-900/30",
  purple:
    "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30",
  pink: "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:hover:bg-pink-900/30",
  emerald:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/30",
  red: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30",
  yellow:
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-900/30",
};

export default function Tag({
  tag,
  variant = "default",
  size = "sm",
  removable = false,
  onRemove,
  onClick,
  className,
}: TagProps) {
  const colorClass =
    colorVariants[tag.color as keyof typeof colorVariants] ||
    colorVariants.gray;

  const baseClasses = cn(
    "inline-flex items-center gap-1 rounded-full font-medium transition-colors",
    {
      "px-2.5 py-1 text-xs": size === "sm",
      "px-3 py-1.5 text-sm": size === "md",
    },
    {
      [colorClass]: variant === "default",
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700":
        variant === "outline",
      "border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30":
        variant === "filter",
    },
    onClick || removable ? "cursor-pointer" : "",
    className
  );

  const handleClick = () => {
    if (onClick) {
      onClick(tag);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(tag);
    }
  };

  return (
    <span
      className={baseClasses}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {tag.name}
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          className="ml-1 hover:text-red-600 dark:hover:text-red-400"
          aria-label={`Remove ${tag.name} tag`}
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}
