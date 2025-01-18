'use client'
import React, { useState, useEffect } from 'react';
import { Car, Bike, MapPin, AlertTriangle, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const ParkingManagement = () => {
  // Simulated real-time data
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

  const parkingLocations = [
    { id: 1, name: 'Main Gate Parking', carCapacity: 100, bikeCapacity: 200, carOccupied: 75, bikeOccupied: 150 },
    { id: 2, name: 'Library Parking', carCapacity: 50, bikeCapacity: 100, carOccupied: 20, bikeOccupied: 80 },
    { id: 3, name: 'Hostel Parking', carCapacity: 80, bikeCapacity: 150, carOccupied: 65, bikeOccupied: 120 },
    { id: 4, name: 'Staff Parking', carCapacity: 60, bikeCapacity: 80, carOccupied: 45, bikeOccupied: 60 }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setParkingData({
        cars: {
          total: 290,
          occupied: Math.floor(Math.random() * 200 + 50),
          trend: Math.random() > 0.5 ? 'up' : 'down'
        },
        bikes: {
          total: 530,
          occupied: Math.floor(Math.random() * 400 + 100),
          trend: Math.random() > 0.5 ? 'up' : 'down'
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getOccupancyColor = (percentage: number) => {
    if (percentage < 60) return 'text-green-500';
    if (percentage < 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Testing Banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-semibold">Testing Mode Active</span>
          <span className="text-yellow-600 dark:text-yellow-400">
            - This page is displaying simulated data for demonstration purposes
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cars Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Car className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Cars</h2>
              </div>
              {parkingData.cars.trend === 'up' ? (
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Total Spaces</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{parkingData.cars.total}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Occupied</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{parkingData.cars.occupied}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 dark:bg-blue-500 rounded-full h-2.5"
                  style={{ width: `${(parkingData.cars.occupied / parkingData.cars.total * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Bikes Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Bike className="w-8 h-8 text-green-600 dark:text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Bikes</h2>
              </div>
              {parkingData.bikes.trend === 'up' ? (
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Total Spaces</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{parkingData.bikes.total}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Occupied</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{parkingData.bikes.occupied}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-green-600 dark:bg-green-500 rounded-full h-2.5"
                  style={{ width: `${(parkingData.bikes.occupied / parkingData.bikes.total * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Parking Locations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Parking Locations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {parkingLocations.map(location => {
              const carPercentage = (location.carOccupied / location.carCapacity) * 100;
              const bikePercentage = (location.bikeOccupied / location.bikeCapacity) * 100;
              
              return (
                <div 
                  key={location.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {location.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Cars</span>
                        <span className={`text-sm font-medium ${getOccupancyColor(carPercentage)}`}>
                          {location.carOccupied}/{location.carCapacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`rounded-full h-2 ${
                            carPercentage < 60 ? 'bg-green-500' :
                            carPercentage < 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${carPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Bikes</span>
                        <span className={`text-sm font-medium ${getOccupancyColor(bikePercentage)}`}>
                          {location.bikeOccupied}/{location.bikeCapacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`rounded-full h-2 ${
                            bikePercentage < 60 ? 'bg-green-500' :
                            bikePercentage < 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${bikePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Suggestion */}
                  {(carPercentage >= 80 || bikePercentage >= 80) && (
                    <div className="mt-4 p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded">
                      Nearing capacity - Consider alternative locations
                    </div>
                  )}
                  {(carPercentage < 40 || bikePercentage < 40) && (
                    <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm rounded">
                      Plenty of space available
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Live Updates
            </h2>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Vehicle entered Main Gate Parking - 2 minutes ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Vehicle exited Library Parking - 5 minutes ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>Staff Parking nearing capacity - 10 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingManagement;