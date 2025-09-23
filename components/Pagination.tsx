import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const siblingCount = 1;
    const totalPageNumbers = siblingCount + 5;

    if (totalPages > totalPageNumbers) {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
      
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
        return [...leftRange, '...', totalPages];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
        return [1, '...', ...rightRange];
      }
      
      if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
        return [1, '...', ...middleRange, '...', totalPages];
      }
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };
  
  const pages = getPageNumbers();

  const pageButtonClasses = (page: number | string, isActive: boolean) => {
    const baseClasses = "flex items-center justify-center h-10 w-10 rounded-lg font-medium transition-colors duration-200 text-sm";
    if (typeof page === 'string') {
        return `${baseClasses} text-gray-500 px-0`;
    }
    if (isActive) {
        return `${baseClasses} bg-blue-600 text-white shadow-md cursor-default`;
    }
    return `${baseClasses} text-gray-600 bg-white hover:bg-gray-100 border border-gray-200`;
  };

  return (
    <nav className="flex items-center justify-center space-x-1 sm:space-x-2 mt-12" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center h-10 w-10 rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-200"
        aria-label="Previous Page"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {pages.map((page, index) => (
        <button
          key={`${page}-${index}`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page === 'string' || currentPage === page}
          className={pageButtonClasses(page, currentPage === page)}
          aria-current={currentPage === page ? 'page' : undefined}
          aria-label={typeof page === 'number' ? `Page ${page}` : 'ellipsis'}
        >
          {page === '...' ? <span className="tracking-widest">...</span> : page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center h-10 w-10 rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-200"
        aria-label="Next Page"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Pagination;
