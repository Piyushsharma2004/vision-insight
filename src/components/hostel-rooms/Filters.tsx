import { ArrowUpDown, X } from 'lucide-react';

interface FiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  selectedBlock: string;
  setSelectedBlock: (block: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedSection: string;
  setSelectedSection: (section: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  uniqueBlocks: string[];
  uniqueTypes: string[];
  uniqueSections: string[];
}

export const Filters = ({
  filter,
  setFilter,
  selectedBlock,
  setSelectedBlock,
  selectedType,
  setSelectedType,
  selectedSection,
  setSelectedSection,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  isFilterOpen,
  setIsFilterOpen,
  uniqueBlocks,
  uniqueTypes,
  uniqueSections,
}: FiltersProps) => {
  // Helper function to format display text
  const formatDisplayText = (value: string, type: 'block' | 'type' | 'section') => {
    if (value === 'all') {
      switch (type) {
        case 'block':
          return 'All Blocks';
        case 'type':
          return 'All Types';
        case 'section':
          return 'All Sections';
        default:
          return 'All';
      }
    }
    
    switch (type) {
      case 'block':
        return `Block ${value}`;
      case 'type':
        return value.charAt(0).toUpperCase() + value.slice(1);
      case 'section':
        return `Section ${value}`;
      default:
        return value;
    }
  };

  const SelectInput = ({ 
    label, 
    value, 
    onChange, 
    options, 
    type 
  }: { 
    label: string; 
    value: string; 
    onChange: (value: string) => void; 
    options: string[];
    type: 'block' | 'type' | 'section';
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-800"
      >
        {options.map(option => (
          <option key={option} value={option} className="dark:bg-gray-800">
            {formatDisplayText(option, type)}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 mb-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold dark:text-white">Advanced Filters</h2>
        <button
          onClick={() => setIsFilterOpen(false)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
          <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-800"
          >
            <option value="all" className="dark:bg-gray-800">All Status</option>
            <option value="available" className="dark:bg-gray-800">Available</option>
            <option value="occupied" className="dark:bg-gray-800">Occupied</option>
          </select>
        </div>

        {/* Block Filter */}
        <SelectInput
          label="Block"
          value={selectedBlock}
          onChange={setSelectedBlock}
          options={uniqueBlocks}
          type="block"
        />

        {/* Type Filter */}
        <SelectInput
          label="Type"
          value={selectedType}
          onChange={setSelectedType}
          options={uniqueTypes}
          type="type"
        />

        {/* Section Filter */}
        <SelectInput
          label="Section"
          value={selectedSection}
          onChange={setSelectedSection}
          options={uniqueSections}
          type="section"
        />
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-800"
        >
          <option value="room_number" className="dark:bg-gray-800">Room Number</option>
          <option value="block" className="dark:bg-gray-800">Block</option>
          <option value="section" className="dark:bg-gray-800">Section</option>
          <option value="hostel_type" className="dark:bg-gray-800">Type</option>
        </select>
        
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:border-blue-500 transition-all dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400"
        >
          <ArrowUpDown className="h-4 w-4" />
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      {/* Reset Filters Button */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => {
            setFilter('all');
            setSelectedBlock('all');
            setSelectedType('all');
            setSelectedSection('all');
            setSortBy('room_number');
            setSortOrder('asc');
          }}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};