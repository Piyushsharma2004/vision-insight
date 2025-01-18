// components/PerformanceIndicators.tsx
import React, { useState } from 'react';
import { RxTarget } from 'react-icons/rx'; // Assuming you're using react-feather for icons.

const PerformanceIndicators: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly'>('daily');

  // Reusable component for individual performance indicators
  const PerformanceIndicator = ({
    icon,
    title,
    percentage,
    comparison,
  }: {
    icon: React.ReactNode;
    title: string;
    percentage: string;
    comparison: string;
  }) => (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
      {icon}
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{percentage}</div>
      <div className="text-sm text-green-500">{comparison}</div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Performance Indicators</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedTimeframe('daily')}
            className={`px-3 py-1 rounded-lg ${
              selectedTimeframe === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setSelectedTimeframe('weekly')}
            className={`px-3 py-1 rounded-lg ${
              selectedTimeframe === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PerformanceIndicator
          icon={<RxTarget className="w-6 h-6 text-blue-500 mb-2" />}
          title="Class Engagement"
          percentage="87%"
          comparison="+3% vs last week"
        />
        <PerformanceIndicator
          icon={<RxTarget className="w-6 h-6 text-green-500 mb-2" />}
          title="Assignments Completed"
          percentage="92%"
          comparison="+5% vs last week"
        />
        <PerformanceIndicator
          icon={<RxTarget className="w-6 h-6 text-red-500 mb-2" />}
          title="Pending Tasks"
          percentage="15%"
          comparison="-2% vs last week"
        />
      </div>
    </div>
  );
};

export default PerformanceIndicators;
