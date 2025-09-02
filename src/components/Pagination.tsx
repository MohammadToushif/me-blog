"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPrevNext?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPrevNext = true,
  className,
}: PaginationProps) {
  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2;
    const pages: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage - delta > 2) {
      pages.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      pages.push("...");
    }

    pages.unshift(1);
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages.filter((page, index, arr) => arr.indexOf(page) === index);
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={cn("flex items-center justify-center", className)}
      aria-label="Pagination"
    >
      {/* Previous button */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "inline-flex items-center justify-center w-10 h-10 rounded",
            "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
            "dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "dark:focus:ring-offset-gray-900 mx-1"
          )}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="inline-flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={cn(
                  "inline-flex items-center justify-center w-10 h-10 rounded text-sm font-medium",
                  "transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  "dark:focus:ring-offset-gray-900 mx-1",
                  currentPage === page
                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                )}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next button */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "inline-flex items-center justify-center w-10 h-10 rounded",
            "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
            "dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "dark:focus:ring-offset-gray-900 mx-1"
          )}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      )}
    </nav>
  );
}
