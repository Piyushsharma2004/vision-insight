'use client'
import { useState } from 'react';
import { Download, Building } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import Filters from './Filters';
import TimeTable from './TimeTable';
import { BLOCKS, Block, RoomData } from './types';

const Reports = () => {
  const [selectedBlock, setSelectedBlock] = useState<Block>('VIB');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Mock data - replace with actual API call
  const generateMockData = (): RoomData[] => {
    return [...Array(13)].map((_, roomIndex) => ({
      roomId: `${selectedBlock}-${(roomIndex + 1).toString().padStart(2, '0')}1`,
      periods: [...Array(12)].map((_, periodIndex) => ({
        maxCount: Math.floor(Math.random() * 30),
        timestamp: new Date().toISOString(),
        className: Math.random() > 0.5 ? `Class ${Math.floor(Math.random() * 10)}` : undefined
      }))
    }));
  };

  const downloadCSV = () => {
    const data = generateMockData();
    const headers = ['Room', ...Array(12).fill(0).map((_, i) => `Period ${i + 1}`)];
    const csvContent = [
      headers.join(','),
      ...data.map(room => [
        room.roomId,
        ...room.periods.map(p => p.maxCount)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedBlock}-occupancy-${dateRange?.from?.toISOString() || 'all'}.csv`;
    a.click();
  };

  const handleFilterApply = () => {
    // Here you would typically fetch new data based on the filters
    console.log('Applying filters:', { dateRange, searchQuery });
  };

  return (
    <div className="w-fit  mx-auto p-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {BLOCKS.map((block) => (
            <Button
              key={block}
              variant={selectedBlock === block ? 'default' : 'outline'}
              onClick={() => setSelectedBlock(block)}
            >
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                {block}
              </span>
            </Button>
          ))}
        </div>
        
        <Button
          onClick={downloadCSV}
          variant="default"
          className="bg-green-600 hover:bg-green-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onFilterApply={handleFilterApply}
      />

      <TimeTable
        selectedBlock={selectedBlock}
        data={generateMockData()}
        searchQuery={searchQuery}
      />

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-50 dark:bg-green-900/20 border dark:border-green-700"></div>
          <span className="text-gray-600 dark:text-gray-400">Empty (≤ 5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-50 dark:bg-yellow-900/20 border dark:border-yellow-700"></div>
          <span className="text-gray-600 dark:text-gray-400">Moderate (6-15)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-50 dark:bg-red-900/20 border dark:border-red-700"></div>
          <span className="text-gray-600 dark:text-gray-400">Full (15)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700"></div>
          <span className="text-gray-600 dark:text-gray-400">Break Time</span>
        </div>
      </div>
    </div>
  );
};

export default Reports;