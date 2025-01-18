// FilterBar.tsx
'use client';
import React from 'react';
import { Building } from 'lucide-react';
import { FilterBarProps } from './types';

const FilterBar: React.FC<FilterBarProps> = ({
  blocks,
  selectedBlock,
  onBlockChange,
  selectedStartDate,
  selectedEndDate,
  onDateRangeChange,
}) => {
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* Block selection tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 dark:border-gray-600 pb-2">
        {blocks.map((block) => (
          <button
            key={block}
            onClick={() => onBlockChange(block)}
            className={`px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2
              ${
                selectedBlock === block
                  ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 font-semibold border border-red-300 dark:border-red-500'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            <Building className="w-4 h-4" />
            {block}
          </button>
        ))}
      </div>

      {/* Date Range Picker */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex gap-2 min-w-[300px]">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formatDateForInput(selectedStartDate)}
              onChange={(e) => {
                const newStartDate = new Date(e.target.value);
                onDateRangeChange(newStartDate, selectedEndDate);
              }}
              className="w-full px-4 py-2 rounded-lg border border-red-300 dark:border-red-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={formatDateForInput(selectedEndDate)}
              onChange={(e) => {
                const newEndDate = new Date(e.target.value);
                onDateRangeChange(selectedStartDate, newEndDate);
              }}
              className="w-full px-4 py-2 rounded-lg border border-red-300 dark:border-red-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
