'use client';  // Ensures that this is a client-side component

import React, { useState } from 'react';
import TeacherAvailability from './TeachersInsight/TeacherAvailability';
import AttendanceInsights from './attendance/AttendanceInsights';
import { Calendar, Download, Filter, Users, Clock } from 'lucide-react';


const EnhancedDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');



  return (
    <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 space-y-6">
     

      {/* Stats Grid */}
    {/* Overview Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center">
          <div className="rounded-full bg-blue-500/20 p-4 mr-4">
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Hours</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">156h</div>
            <div className="text-sm text-green-500">+12% vs last week</div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center">
          <div className="rounded-full bg-green-500/20 p-4 mr-4">
            <Users className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Average Attendance</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">28</div>
            <div className="text-sm text-red-500">-5% vs last week</div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center">
          <div className="rounded-full bg-purple-500/20 p-4 mr-4">
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Room Utilization</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">76%</div>
            <div className="text-sm text-green-500">+8% vs last week</div>
          </div>
        </div>
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
