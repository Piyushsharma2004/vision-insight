import React from 'react';
import { TIME_SLOTS } from './types';

interface TimeTableProps {
  selectedBlock: string;
  data: any[];
  searchQuery: string;

}

const TimeTable: React.FC<TimeTableProps> = ({ selectedBlock, data, searchQuery }) => {
  // Function to get color based on occupancy
  const getOccupancyColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500';
    if (count <= 5) return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400';
    if (count <= 15) return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
    return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
  };

  const filteredData = data.filter(room => 
    room.roomId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.periods.some(period => 
      period.className?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="overflow-x-auto rounded-lg border dark:border-gray-700 shadow-lg">
      <table className="w-full border-collapse bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="border dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900 sticky left-0 z-10 text-gray-700 dark:text-gray-300">
              Room
            </th>
            {TIME_SLOTS.map((slot, index) => (
              <th 
                key={slot.period}
                className={`border dark:border-gray-700 p-3 min-w-[100px] text-xs
                  ${index < 6 ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-cyan-50 dark:bg-cyan-900/30'}
                  ${index === 5 ? 'border-r-2 border-r-gray-400 dark:border-r-gray-600' : ''}
                  text-gray-700 dark:text-gray-300`}
              >
                <div className="font-bold mb-1">{`P${slot.period}`}</div>
                <div className="text-xs opacity-75">{slot.time}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((room, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="border dark:border-gray-700 p-3 font-medium sticky left-0 bg-white dark:bg-gray-800 z-10 text-gray-700 dark:text-gray-300">
                {room.roomId}
              </td>
              {room.periods.map((period, periodIndex) => (
                <td 
                  key={periodIndex}
                  className={`border dark:border-gray-700 p-3 text-center transition-colors
                    ${periodIndex === 5 ? 'border-r-2 border-r-gray-400 dark:border-r-gray-600 bg-gray-100 dark:bg-gray-900' : ''}
                    ${getOccupancyColor(period.maxCount)}`}
                >
                  {periodIndex !== 5 && (
                    <>
                      <div className="font-bold">{period.maxCount}</div>
                      {period.className && (
                        <div className="text-xs mt-1 opacity-75">{period.className}</div>
                      )}
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;