import React from 'react';

const ListingCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="relative h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-full w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ListingCardSkeleton;