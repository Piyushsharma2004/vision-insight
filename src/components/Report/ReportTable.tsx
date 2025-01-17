// ReportTable.tsx
import React from 'react';

interface ReportTableProps {
  periodData: Array<Array<{ count: number; key: string }>>;
  timeSlots: string[];
  selectedBlock: string;
}

const ReportTable: React.FC<ReportTableProps> = ({
  periodData,
  timeSlots,
  selectedBlock,
}) => {
  const getOccupancyStyle = (count: number) => {
    if (count === 0)
      return {
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-400 dark:text-gray-500',
        border: 'border-gray-300 dark:border-gray-600',
      };
    if (count <= 5)
      return {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-700 dark:text-green-400',
        border: 'border-green-500 dark:border-green-600',
      };
    return {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-500 dark:border-red-600',
    };
  };

  if (!Array.isArray(periodData) || periodData.length === 0) {
    return (
      <div className="text-gray-500 dark:text-gray-400 p-4">
        No data available to display.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="overflow-x-auto rounded-lg border dark:border-gray-700 shadow-lg">
        <table className="w-full border-collapse bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="border dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900 sticky left-0 z-10">
                Room
              </th>
              {timeSlots.map((time, index) => (
                <th
                  key={`timeSlot-${index}`}
                  className={`border dark:border-gray-700 p-3 min-w-[100px] text-xs
                    ${index < 6 ? 'bg-red-50 dark:bg-red-900/30' : 'bg-pink-50 dark:bg-pink-900/30'}
                    ${index === 5 ? 'border-r-2 border-r-gray-400 dark:border-r-gray-600' : ''}`}
                >
                  <div className="font-bold mb-1">{`P${index + 1}`}</div>
                  <div className="text-xs opacity-75">{time}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periodData.map((roomPeriods, roomIndex) => (
              <tr
                key={`room-${roomIndex}`}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="border dark:border-gray-700 p-3 font-medium sticky left-0 bg-white dark:bg-gray-800 z-10">
                  {`${selectedBlock}-${(roomIndex + 1).toString().padStart(2, '0')}1`}
                </td>
                {roomPeriods.map((period, periodIndex) => {
                  const style = getOccupancyStyle(period.count);
                  return (
                    <td
                      key={`period-${roomIndex}-${periodIndex}`}
                      className={`border-2 p-3 text-center transition-colors
                        ${periodIndex === 5 ? 'border-r-2 border-r-gray-400 dark:border-r-gray-600' : ''}
                        ${style.bg} ${style.text} ${style.border}`}
                    >
                      <div className="font-bold">{period.count}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-green-500 bg-green-50 dark:bg-green-900/20"></div>
          <span className="text-gray-600 dark:text-gray-400">Low Occupancy (≤ 5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-red-500 bg-red-50 dark:bg-red-900/20"></div>
          <span className="text-gray-600 dark:text-gray-400">High Occupancy ({'>'} 5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Empty</span>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;