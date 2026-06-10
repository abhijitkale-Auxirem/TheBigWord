import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface Category {
  label: string;
  value: string;
  count?: number;
}

interface CategorySectionProps {
  categories: Category[];
  active: string;
  onSelect: (value: string) => void;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  placeholder?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  categories, active, onSelect,
  searchable = false, searchValue = '', onSearchChange, placeholder = 'Search...',
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {searchable && (
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={searchValue}
            onChange={e => onSearchChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full h-10 pl-9 pr-8 border border-border rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20"
          />
          {searchValue && (
            <button onClick={() => onSearchChange?.('')} className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
              active === cat.value
                ? 'gradient-primary text-white shadow-lg shadow-primary/20'
                : 'bg-white border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
            }`}
          >
            {cat.label}
            {cat.count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${active === cat.value ? 'bg-white/20' : 'bg-muted'}`}>
                {cat.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
