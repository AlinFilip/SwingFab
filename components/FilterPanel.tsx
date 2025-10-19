import React from 'react';
import { SlidersHorizontalIcon } from './Icons';

interface FilterPanelProps {
    onMoreFiltersClick: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onMoreFiltersClick }) => {
    
    const filterOptions = ["All", "Online", "Newest", "Near You"];
    const [activeFilter, setActiveFilter] = React.useState("All");

  return (
    <div className="bg-brand-surface/60 backdrop-blur-lg p-4 rounded-lg shadow-lg mb-6 sticky top-[72px] z-30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 sm:pb-0">
                {filterOptions.map((option) => (
                    <button
                        key={option}
                        onClick={() => setActiveFilter(option)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                        activeFilter === option
                            ? 'bg-brand-primary text-white'
                            : 'bg-slate-700/50 text-brand-text-muted hover:bg-slate-600/50'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
             <div className="mt-4 sm:mt-0">
                <button 
                    onClick={onMoreFiltersClick}
                    className="flex items-center w-full sm:w-auto justify-center space-x-2 px-4 py-2 text-sm font-semibold rounded-full bg-slate-700/50 text-brand-text-muted hover:bg-slate-600/50 transition-colors"
                >
                    <SlidersHorizontalIcon className="w-5 h-5" />
                    <span>More Filters</span>
                </button>
             </div>
        </div>
    </div>
  );
};
