'use client'
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, Download, Filter, Users, Clock } from 'lucide-react';

const RoomUsageDashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState('Engineering Block Wing A');
  const [selectedRoom, setSelectedRoom] = useState('MB-402');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-01-15');
  
  const blocks = ['Engineering Block Wing A', 'Engineering Block Wing B', 'Law Block'];
  const rooms = ['MB-402', 'MB-403', 'MB-404', 'MB-405'];

  const overviewData = Array.from({ length: 7 }, (_, i) => ({
    name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    usage: Math.floor(Math.random() * 100),
    capacity: Math.floor(Math.random() * 80),
  }));

  const periodData = Array.from({ length: 12 }, (_, i) => ({
    period: `P${i + 1}`,
    students: Math.floor(Math.random() * 35),
    utilization: Math.floor(Math.random() * 100),
  }));

  const generateDailyData = () => {
    return Array.from({ length: 15 }, (_, i) => ({
      date: new Date(2025, 0, i + 1).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      periods: Array.from({ length: 12 }, () => Math.floor(Math.random() * 35))
    }));
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 relative overflow-hidden">
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

      {/* Weekly Overview Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Overview</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <Filter className="w-4 h-4 text-gray-900 dark:text-white" />
            Filters
          </button>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd"  />
              <XAxis dataKey="name" stroke="#555"  />
              <YAxis stroke="#555"  />
              <Tooltip 
                contentStyle={{ backgroundColor: '#f9f9f9', border: 'none', color: '#111' }}
                labelStyle={{ color: '#111' }}
              />
              <Bar dataKey="usage" fill="#3b82f6" name="Room Usage %" />
              <Bar dataKey="capacity" fill="#22c55e" name="Capacity %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">From Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">To Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Block</label>
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600"
              >
                {blocks.map(block => (
                  <option key={block} value={block}>{block}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Room</label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600"
              >
                {rooms.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Period Usage Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Period-wise Usage</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
            <Download className="w-4 h-4 text-gray-900 dark:text-white" />
            Export
          </button>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={periodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd"  />
              <XAxis dataKey="period" stroke="#555"  />
              <YAxis stroke="#555"  />
              <Tooltip 
                contentStyle={{ backgroundColor: '#f9f9f9', border: 'none', color: '#111' }}
                labelStyle={{ color: '#111' }}
              />
              <Line type="monotone" dataKey="students" stroke="#3b82f6" name="Students" />
              <Line type="monotone" dataKey="utilization" stroke="#22c55e" name="Utilization %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Daily Statistics</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Date</th>
                {Array.from({ length: 12 }, (_, i) => (
                  <th key={i} className="p-3 text-center text-gray-700 dark:text-gray-300">P{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {generateDailyData().map((day, i) => (
                <tr key={i} className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-3 text-gray-700 dark:text-gray-300">{day.date}</td>
                  {day.periods.map((value, j) => (
                    <td key={j} className="p-3 text-center">
                      <span className={`px-2 py-1 rounded ${
                        value > 25 ? 'bg-green-500/20 text-green-500' :
                        value > 15 ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}> {value} </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomUsageDashboard;