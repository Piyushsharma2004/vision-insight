'use client';  // Ensures that this is a client-side component

import React, { useState } from 'react';
import { Clock, Users, Calendar, BookOpen, Brain, Target } from 'lucide-react';
import StatsCard from './StatsCard';
import TeacherAvailability from './TeachersInsight/TeacherAvailability';
import AttendanceInsights from './attendance/AttendanceInsights';
import PerformanceIndicators from './indicators';

const EnhancedDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');

  const statsData = [
    {
      icon: Clock,
      title: 'Total Class Hours',
      value: '156h',
      change: { value: '12%', trend: 'up' }, // Correct trend values
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Average Attendance',
      value: '28/35',
      change: { value: '5%', trend: 'down' }, // Correct trend values
      color: 'green'
    },
    {
      icon: Calendar,
      title: 'Room Utilization',
      value: '76%',
      change: { value: '8%', trend: 'up' },  // Correct trend values
      color: 'purple'
    },
    {
      icon: BookOpen,
      title: 'Teacher-Student Ratio',
      value: '1:24',
      change: { value: '2%', trend: 'up' },  // Correct trend values
      color: 'yellow'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 space-y-6">
     

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

    <div>
    
    </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TeacherAvailability />
        <AttendanceInsights />
      </div>

      {/* Performance Indicators */}
      {/* <PerformanceIndicators /> */}
    </div>
  );
};

export default EnhancedDashboard;
