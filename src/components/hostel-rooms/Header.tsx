import { Search, Filter } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
}

export const Header = ({ searchTerm, setSearchTerm, isFilterOpen, setIsFilterOpen }: HeaderProps) => (
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Room Management</h1>
      <p className="text-gray-600 dark:text-gray-400">Manage and monitor room availability in real-time</p>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
      <div className="relative flex-grow lg:w-64">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by room, block, or section..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-800"
        />
      </div>
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 hover:border-blue-500 transition-all bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400"
      >
        <Filter className="h-5 w-5" />
        <span>Filters</span>
      </button>
    </div>
  </div>
);