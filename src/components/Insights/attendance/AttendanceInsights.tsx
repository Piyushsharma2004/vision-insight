import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ArrowUpDown } from 'lucide-react';

const AttendanceInsights = () => {
  const [filter, setFilter] = useState('daily');
  const [sortOrder, setSortOrder] = useState('asc');

  const predictiveData = [
    { day: 'Monday', actual: 85, predicted: 88 },
    { day: 'Tuesday', actual: 82, predicted: 85 },
    { day: 'Wednesday', actual: 78, predicted: 80 },
    { day: 'Thursday', actual: 88, predicted: 86 },
    { day: 'Friday', actual: 75, predicted: 78 }
  ];

  const roomUtilization = [
    { roomNo: 'VIB-203', utilization: 85, capacity: 50, currentOccupancy: 42 },
    { roomNo: 'KAB-395', utilization: 72, capacity: 40, currentOccupancy: 29 },
    { roomNo: 'NYB-394', utilization: 91, capacity: 30, currentOccupancy: 27 },
    { roomNo: 'NIB-022', utilization: 65, capacity: 60, currentOccupancy: 39 },
    { roomNo: 'VIB-205', utilization: 88, capacity: 45, currentOccupancy: 40 },
    { roomNo: 'KAB-401', utilization: 78, capacity: 35, currentOccupancy: 27 },
    { roomNo: 'NYB-301', utilization: 94, capacity: 25, currentOccupancy: 23 },
    { roomNo: 'NIB-105', utilization: 69, capacity: 55, currentOccupancy: 38 }
  ];

  const insights = [
    { title: 'Peak Hours', value: '9:00 AM - 11:00 PM' },
    { title: 'Low Attendance Days', value: 'Friday afternoons' },
    { title: 'Best Performing Class', value: 'VIB-402 Mathematics' },
    { title: 'Attendance Trend', value: 'Improving (+5%)' }
  ];

  const toggleSort = () => {
    setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
  };

  const sortedRooms = [...roomUtilization].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.utilization - b.utilization;
    }
    return b.utilization - a.utilization;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Attendance Insights</h2>
      </div>

      <select
        onChange={(e) => setFilter(e.target.value)}
        className="mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border rounded-lg p-2"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {insights.map((insight, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">{insight.title}</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{insight.value}</div>
          </div>
        ))}
      </div>

      <div className="">
        

        {/* <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="day" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip
                contentStyle={{ backgroundColor: '#f9f9f9', border: 'none', color: '#111' }}
                labelStyle={{ color: '#111' }}
              />
              <Bar
                dataKey="actual"
                fill="#22c55e"
                name="Actual Attendance"
              >
                {predictiveData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.actual > 80 ? "#22c55e" : "#ef4444"} />
                ))}
              </Bar>
              <Bar dataKey="predicted" fill="#3b82f6" name="Total Attendance" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Room Utilization</h3>
            <button
              onClick={toggleSort}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white dark:bg-gray-700">
                <tr>
                  <th className="text-left p-2">Room No</th>
                  <th className="text-left p-2">Utilization</th>
                  <th className="text-left p-2">Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {sortedRooms.map((room, index) => (
                  <tr key={index} className="border-t border-gray-200 dark:border-gray-600">
                    <td className="p-2">{room.roomNo}</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${room.utilization}%` }}
                          ></div>
                        </div>
                        {room.utilization}%
                      </div>
                    </td>
                    <td className="p-2">{room.currentOccupancy}/{room.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceInsights;