// ReportComponent.tsx
'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import FilterBar from './FilterBar';
import ReportTable from './ReportTable';
import { ClassroomData } from './types';

const ReportComponent: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState('VIB');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [dateRangeData, setDateRangeData] = useState<ClassroomData[]>([]);
  
  const blocks = ['VIB', 'NYB', 'KAB', 'NIB'];
  const timeSlots = [
    '8:00 - 8:50', '8:50 - 9:40', '9:40 - 10:30',
    '10:50 - 11:40', '11:40 - 12:30', '12:30 - 1:00',
    '1:00 - 1:50', '1:50 - 2:40', '2:40 - 3:30',
    '3:50 - 4:40', '4:40 - 5:30', '5:30 - 6:00'
  ];

  const generateRandomDataForDate = useCallback((date: Date) => {
    return {
      date: date.toISOString().split('T')[0],
      periods: [...Array(12)].map((_, periodIndex) => ({
        count: Math.floor(Math.random() * 10),
        key: `${date.toISOString()}-${periodIndex}`,
      }))
    };
  }, []);

  const generateDateRangeData = useCallback(() => {
    const dates: ClassroomData[] = [];
    const currentDate = new Date(selectedStartDate);
    const endDate = new Date(selectedEndDate);

    while (currentDate <= endDate) {
      dates.push(generateRandomDataForDate(new Date(currentDate)));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }, [selectedStartDate, selectedEndDate, generateRandomDataForDate]);

  useEffect(() => {
    setDateRangeData(generateDateRangeData());
  }, [generateDateRangeData, selectedStartDate, selectedEndDate]);

  const generateClassroomCSV = (dates: ClassroomData[]) => {
    const csvRows = ['Date,' + timeSlots.join(',')];
    dates.forEach(dayData => {
      const counts = dayData.periods.map(period => period.count);
      csvRows.push(`${dayData.date},${counts.join(',')}`);
    });
    return csvRows.join('\n');
  };

  const handleMasterExport = async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();
      
      for (const block of blocks) {
        const blockFolder = zip.folder(block);
        if (!blockFolder) continue;

        const classrooms = Array.from({ length: 20 }, (_, i) => 
          `${block}-${(i + 1).toString().padStart(2, '0')}1`
        );

        for (const classroom of classrooms) {
          const dates: ClassroomData[] = [];
          const currentDate = new Date(selectedStartDate);
          const endDate = new Date(selectedEndDate);

          while (currentDate <= endDate) {
            dates.push({
              date: currentDate.toISOString().split('T')[0],
              periods: Array(12).fill(0).map(() => ({
                count: Math.floor(Math.random() * 10),
                key: `${currentDate.toISOString()}-${Math.random()}`
              }))
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }

          const csvContent = generateClassroomCSV(dates);
          const fileName = `${classroom}_${selectedStartDate.toISOString().split('T')[0]}_to_${selectedEndDate.toISOString().split('T')[0]}.csv`;
          blockFolder.file(fileName, csvContent);
        }
      }

      const content = await zip.generateAsync({ 
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 6
        }
      });

      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `classroom-occupancy_${selectedStartDate.toISOString().split('T')[0]}_to_${selectedEndDate.toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSingleRoomExport = () => {
    if (!selectedClassroom) return;
    const csv = generateClassroomCSV(dateRangeData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedClassroom}-${selectedStartDate.toISOString().split('T')[0]}-to-${selectedEndDate.toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-6">
        <div className='flex'>
        <FilterBar
          blocks={blocks}
          selectedBlock={selectedBlock}
          onBlockChange={setSelectedBlock}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateRangeChange={(start, end) => {
            setSelectedStartDate(start);
            setSelectedEndDate(end);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          
        />

        {/* Classroom Selection and Master Export */}
        <div className="flex flex-wrap gap-4 items-end pb-[25px] ml-5">
 {/* room select  */}
 <div className="relative w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Classroom
            </label>
            <select
              value={selectedClassroom}
              onChange={(e) => setSelectedClassroom(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-red-300 dark:border-red-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select a classroom</option>
              {Array.from({ length: 20 }, (_, i) => 
                `${selectedBlock}-${(i + 1).toString().padStart(2, '0')}1`
              ).map((room) => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>
            {/* Export Button */}
            <button
                    onClick={handleSingleRoomExport}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 
                             dark:bg-red-700 dark:hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
            {/* Master Export  */}
        <button
            onClick={handleMasterExport}
            disabled={isExporting}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 
                     dark:bg-red-700 dark:hover:bg-red-600 transition-colors flex items-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Export...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Master Export</span>
              </>
            )}
          </button>
         
  

          
        </div>
        </div>
        <div>
            <h1>{selectedClassroom}</h1>
        </div>
        <ReportTable
          dateRangeData={dateRangeData}
          timeSlots={timeSlots}
          selectedClassroom={selectedClassroom}
        />
      </div>
    </div>
  );
};

export default ReportComponent;