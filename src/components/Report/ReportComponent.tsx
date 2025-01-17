// ReportComponent.tsx
'use client';
import React, { useState, useCallback, useEffect } from 'react';
import FilterBar from './FilterBar';
import ReportTable from './ReportTable';
import RoomDataTable from '../Insights/insightsComponts';
import RoomUsageDashboard from '../Insights/insightsComponts';
import RoomUsageStats from './table';

const ReportComponent: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState('VIB');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [periodData, setPeriodData] = useState<Array<Array<{ count: number; key: string }>>>([]);

  const blocks = ['VIB', 'NYB', 'KAB', 'NIB'];

  const timeSlots = [
    '8:00 - 8:50',
    '8:50 - 9:40',
    '9:40 - 10:30',
    '10:50 - 11:40',
    '11:40 - 12:30',
    '12:30 - 1:00',
    '1:00 - 1:50',
    '1:50 - 2:40',
    '2:40 - 3:30',
    '3:50 - 4:40',
    '4:40 - 5:30',
    '5:30 - 6:00',
  ];

  const generateRandomData = useCallback(() => {
    return [...Array(13)].map((_, roomIndex) =>
      [...Array(12)].map((_, periodIndex) => ({
        count: Math.floor(Math.random() * 10),
        key: `${roomIndex}-${periodIndex}`,
      }))
    );
  }, []);

  // Load initial data for current date
  useEffect(() => {
    setPeriodData(generateRandomData());
  }, [generateRandomData]);

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    setPeriodData(generateRandomData());
  };

  const handleExport = () => {
    try {
      const csvRows = ['Room,' + timeSlots.join(',')];
      
      periodData.forEach((roomPeriods, roomIndex) => {
        const roomNumber = `${selectedBlock}-${(roomIndex + 1).toString().padStart(2, '0')}1`;
        const counts = roomPeriods.map(period => period.count);
        csvRows.push(`${roomNumber},${counts.join(',')}`);
      });

      const csv = csvRows.join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedBlock}-occupancy-${selectedStartDate.toISOString().split('T')[0]}-to-${selectedEndDate.toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="p-4">
  
  
      <FilterBar
        blocks={blocks}
        selectedBlock={selectedBlock}
        onBlockChange={setSelectedBlock}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        onDateRangeChange={handleDateRangeChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={handleExport}
      />
      <ReportTable
        periodData={periodData}
        timeSlots={timeSlots}
        selectedBlock={selectedBlock}
      />
    </div>
  );
};

export default ReportComponent;