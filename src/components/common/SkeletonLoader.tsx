import React from 'react';

interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
  type?: 'card' | 'table' | 'list';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ lines = 3, className = '', type = 'list' }) => {
  if (type === 'card') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="skeleton aspect-video" />
            <div className="p-4 space-y-2">
              <div className="skeleton h-4 w-3/4 rounded-lg" />
              <div className="skeleton h-3 w-1/2 rounded-lg" />
              <div className="skeleton h-3 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (type === 'table') {
    return (
      <div className={`bg-white rounded-2xl border border-border overflow-hidden ${className}`}>
        <div className="p-4 border-b border-border"><div className="skeleton h-4 w-40 rounded-lg" /></div>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-border/50 last:border-0">
            <div className="skeleton w-8 h-8 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="skeleton h-3.5 w-36 rounded-lg" />
              <div className="skeleton h-3 w-24 rounded-lg" />
            </div>
            <div className="skeleton h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="skeleton w-9 h-9 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="skeleton h-4 rounded-lg" style={{ width: `${60 + (i % 3) * 10}%` }} />
              <div className="skeleton h-3 w-2/5 rounded-lg" />
            </div>
          </div>
          <div className="skeleton h-2 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
