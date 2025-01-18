import React, { useState, useEffect } from 'react';
import { Car, Bike, MapPin, AlertTriangle, ArrowUpRight, ArrowDownRight, Activity, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const VehicalManagement = () => {
  // Previous state remains the same
  const [parkingData, setParkingData] = useState({
    cars: {
      total: 0,
      occupied: 0,
      trend: 'up'
    },
    bikes: {
      total: 0,
      occupied: 0,
      trend: 'up'
    }
  });

  // New state for gate statistics
  const [gateStats, setGateStats] = useState({
    today: {
      totalEntered: { cars: 0, bikes: 0 },
      totalExited: { cars: 0, bikes: 0 }
    }
  });

  // Simulated hourly traffic data
  const hourlyTrafficData = [
    { time: '7:00', cars: 15, bikes: 35 },
    { time: '7:30', cars: 45, bikes: 95 },
    { time: '8:00', cars: 65, bikes: 140 },
    { time: '8:30', cars: 35, bikes: 75 },
    { time: '9:00', cars: 20, bikes: 45 },
    { time: '12:00', cars: 25, bikes: 55 },
    { time: '12:30', cars: 55, bikes: 120 },
    { time: '13:00', cars: 60, bikes: 130 },
    { time: '13:30', cars: 40, bikes: 85 },
    { time: '17:00', cars: 30, bikes: 65 },
    { time: '17:30', cars: 50, bikes: 110 },
    { time: '18:00', cars: 45, bikes: 95 },
    { time: '18:30', cars: 25, bikes: 55 },
    { time: '19:00', cars: 10, bikes: 25 }
  ];

  // Peak hours analysis
  const peakHoursData = [
    {
      period: 'Morning Peak (7:30-8:30)',
      cars: 110,
      bikes: 235,
      description: 'First Shift Start'
    },
    {
      period: 'Afternoon Peak (12:30-13:30)',
      cars: 115,
      bikes: 250,
      description: 'Shift Change'
    },
    {
      period: 'Evening Peak (17:30-18:30)',
      cars: 95,
      bikes: 205,
      description: 'Second Shift End'
    }
  ];

  // Simulate real-time updates for gate statistics
  useEffect(() => {
    const interval = setInterval(() => {
      setGateStats(prev => ({
        today: {
          totalEntered: {
            cars: Math.floor(Math.random() * 50) + 200,
            bikes: Math.floor(Math.random() * 100) + 400
          },
          totalExited: {
            cars: Math.floor(Math.random() * 40) + 180,
            bikes: Math.floor(Math.random() * 90) + 350
          }
        }
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Previous JSX components remain the same until the main content div
  return (
    <div >
      {/* Testing Banner */}
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main Gate Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Main Gate Traffic Today
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-600 dark:text-blue-400">Cars Entered</span>
              </div>
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {gateStats.today.totalEntered.cars}
              </span>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bike className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-600 dark:text-green-400">Bikes Entered</span>
              </div>
              <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                {gateStats.today.totalEntered.bikes}
              </span>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-600 dark:text-blue-400">Cars Exited</span>
              </div>
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {gateStats.today.totalExited.cars}
              </span>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bike className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-600 dark:text-green-400">Bikes Exited</span>
              </div>
              <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                {gateStats.today.totalExited.bikes}
              </span>
            </div>
          </div>

          {/* Hourly Traffic Chart */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Hourly Traffic Distribution (7 AM - 7 PM)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cars" stroke="#3B82F6" name="Cars" />
                  <Line type="monotone" dataKey="bikes" stroke="#10B981" name="Bikes" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Peak Hours Analysis */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Peak Hours Analysis
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {peakHoursData.map((peak, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {peak.period}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {peak.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Cars</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">{peak.cars}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Bikes</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{peak.bikes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rest of the existing components */}
        {/* ... */}
      </div>
    </div>
  );
};

export default VehicalManagement;