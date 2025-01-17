// FilterBar.tsx
'use client';
import React, { useState } from 'react';
import { Download, Building, Search } from 'lucide-react';

interface FilterBarProps {
  selectedBlock: string;
  onBlockChange: (block: string) => void;
  selectedStartDate: Date;
  selectedEndDate: Date;
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExport: () => void;
  blocks: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedBlock,
  onBlockChange,
  selectedStartDate,
  selectedEndDate,
  onDateRangeChange,
  searchQuery,
  onSearchChange,
  onExport,
  blocks,
}) => {
  const [isBlockDropdownOpen, setIsBlockDropdownOpen] = useState(false);

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    onDateRangeChange(newStartDate, selectedEndDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    onDateRangeChange(selectedStartDate, newEndDate);
  };

  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* Block selection dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsBlockDropdownOpen(!isBlockDropdownOpen)}
          className="w-full md:w-48 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-between
            bg-white dark:bg-gray-800 border border-red-300 dark:border-red-600 text-gray-900 dark:text-gray-100
            hover:border-red-400 dark:hover:border-red-500"
        >
          <span className="flex items-center gap-2">
            <Building className="w-4 h-4 text-red-500" />
            {selectedBlock}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform ${isBlockDropdownOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {isBlockDropdownOpen && (
          <div className="absolute z-10 w-full md:w-48 mt-1 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-red-300 dark:border-red-600">
            {blocks.map((block) => (
              <button
                key={block}
                onClick={() => {
                  onBlockChange(block);
                  setIsBlockDropdownOpen(false);
                }}
                className={`w-full px-4 py-2 text-left transition-colors flex items-center gap-2
                  ${selectedBlock === block 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'}`}
              >
                <Building className="w-4 h-4" />
                {block}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {/* Date Range Picker */}
        <div className="flex gap-2 min-w-[300px]">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formatDateForInput(selectedStartDate)}
              onChange={handleStartDateChange}
              max={formatDateForInput(selectedEndDate)}
              className="w-full px-4 py-2 rounded-lg border border-red-300 dark:border-red-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={formatDateForInput(selectedEndDate)}
              onChange={handleEndDateChange}
              min={formatDateForInput(selectedStartDate)}
              className="w-full px-4 py-2 rounded-lg border border-red-300 dark:border-red-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Search Input */}
        <div className="min-w-[200px] flex-1 relative">
        <label className="pl-2 block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-red-300 dark:border-red-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
          <Search className="w-4 h-4 absolute left-3 top-[45px] transform -translate-y-1/2 text-red-400" />
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="px-4 py-2 mt-6 rounded-lg bg-red-600 text-white hover:bg-red-700 
                   dark:bg-red-700 dark:hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default FilterBar; 