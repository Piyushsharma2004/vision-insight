import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change: {
    value: string;
    trend: 'up' | 'down';
  };
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

const StatsCard = ({ icon: Icon, title, value, change, color }: StatsCardProps) => {
  const colorMap = {
    blue: 'bg-blue-500/20 text-blue-500',
    green: 'bg-green-500/20 text-green-500',
    purple: 'bg-purple-500/20 text-purple-500',
    yellow: 'bg-yellow-500/20 text-yellow-500',
    red: 'bg-red-500/20 text-red-500'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center">
      <div className={`rounded-full ${colorMap[color]} p-4 mr-4`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className={`text-sm ${change.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change.trend === 'up' ? '+' : '-'}{change.value} vs last week
        </div>
      </div>
    </div>
  );
};

export default StatsCard;