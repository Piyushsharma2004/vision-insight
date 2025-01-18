import React from 'react';
import { ReportTableProps } from './types';

// Function to get style classes based on occupancy
const getOccupancyStyle = (count: number) => {
  if (count <= 5) return {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-500 dark:border-green-600'
  };
  return {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-500 dark:border-red-600'
  };
};

const ReportTable: React.FC<ReportTableProps> = ({
  dateRangeData,
  timeSlots,
  selectedClassroom,
}) => {
  if (!selectedClassroom) return null;

  // Format date to day-month-year
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            {timeSlots.map((time, index) => (
              <th 
                key={`${time}-${index}`}
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                <div>{`P${index + 1}`}</div>
                <div className="text-[8px] font-bold">{time}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {dateRangeData.map((dayData) => (
            <tr key={dayData.date}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {formatDate(dayData.date)}
              </td>
              {dayData.periods.map((period, periodIndex) => {
                const styles = getOccupancyStyle(period.count);
                return (
                  <td 
                    key={`${dayData.date}-${periodIndex}`}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${styles.bg} ${styles.text} border-l ${styles.border}`}
                  >
                    {period.count}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;