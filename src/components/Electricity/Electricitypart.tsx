'use client'
import React, { useState, useCallback, useRef } from 'react';
import { Building } from 'lucide-react';
import Room from './Room';
import { powerService } from './services/powerService';
import type { BuildingData, PowerStatus } from './types';
import { roomNumbers } from './types';
import { useInterval } from './hooks/useInterval';

const REFRESH_INTERVAL = 80000; // 80 seconds

const ElectricityManagement: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('VIB');
  const [roomsData, setRoomsData] = useState<BuildingData[]>([]);
  const [powerStatus, setPowerStatus] = useState<PowerStatus>({});
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  
  // Use refs to track last update time and prevent multiple simultaneous updates
  const lastUpdateRef = useRef<number>(Date.now());
  const isUpdatingRef = useRef<boolean>(false);

  // Generate random count with weighting towards lower numbers
  const generateCount = useCallback((): number => {
    const isLowOccupancy = Math.random() < 0.7;
    return isLowOccupancy 
      ? Math.floor(Math.random() * 5) + 1
      : Math.floor(Math.random() * 15) + 6;
  }, []);

  // Handle power toggle
  const handlePowerToggle = useCallback(async (roomNumber: string): Promise<void> => {
    const roomKey = `${selectedBuilding}-${roomNumber}`;
    const currentPowerStatus = powerStatus[roomKey];
    
    try {
      // Update the state immediately for better UI responsiveness
      setPowerStatus(prev => ({
        ...prev,
        [roomKey]: !currentPowerStatus
      }));

      // Call the power service
      const response = await powerService.togglePower(
        selectedBuilding,
        roomNumber,
        !currentPowerStatus
      );

      // If the server call fails, revert the state
      if (!response.success) {
        setPowerStatus(prev => ({
          ...prev,
          [roomKey]: currentPowerStatus
        }));
        console.error('Failed to toggle power:', response.message);
      }
    } catch (error) {
      // Revert state on error
      setPowerStatus(prev => ({
        ...prev,
        [roomKey]: currentPowerStatus
      }));
      console.error('Failed to toggle power:', error);
    }
  }, [selectedBuilding, powerStatus]);

  // Update rooms data and manage power
  const updateRoomsData = useCallback(async (): Promise<void> => {
    // Prevent multiple simultaneous updates and ensure minimum interval
    const now = Date.now();
    if (isUpdatingRef.current || now - lastUpdateRef.current < REFRESH_INTERVAL - 1000) {
      return;
    }

    isUpdatingRef.current = true;

    try {
      const buildings: BuildingData[] = Object.entries(roomNumbers).map(([name, rooms]) => ({
        name,
        rooms: rooms.map(roomNumber => {
          const count = generateCount();
          const roomKey = `${name}-${roomNumber}`;
          
          // Schedule power management check
          if (count <= 5 && powerStatus[roomKey]) {
            powerService.autoManagePower(name, roomNumber, count)
              .then(newStatus => {
                setPowerStatus(prev => ({
                  ...prev,
                  [roomKey]: newStatus
                }));
              });
          }
          
          return {
            id: roomKey,
            count
          };
        })
      }));

      setRoomsData(buildings);
      setCurrentTime(now);
      lastUpdateRef.current = now;
    } finally {
      isUpdatingRef.current = false;
    }
  }, [generateCount, powerStatus]);

  // Initialize power status
  const initializePowerStatus = useCallback(() => {
    const initialPowerStatus: PowerStatus = {};
    Object.entries(roomNumbers).forEach(([building, rooms]) => {
      rooms.forEach(room => {
        initialPowerStatus[`${building}-${room}`] = true;
      });
    });
    setPowerStatus(initialPowerStatus);
    updateRoomsData();
  }, [updateRoomsData]);

  // Use custom interval hook for updates
  useInterval(() => {
    updateRoomsData();
  }, REFRESH_INTERVAL);

  // Initialize data on mount
  React.useEffect(() => {
    initializePowerStatus();
  }, [initializePowerStatus]);

  const currentRooms = roomsData.find(b => b.name === selectedBuilding)?.rooms || [];

  return (
    <div className="w-full max-w-6xl mx-auto pb-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <Building className="h-5 w-5" />
            Classroom Electricity Management
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Last updated: {new Date(currentTime).toLocaleTimeString()}
          </p>
        </div>

        <div className="p-4">
          <div className="flex gap-2 mb-4">
            {Object.keys(roomNumbers).map((building) => (
              <button
                key={building}
                onClick={() => setSelectedBuilding(building)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                  ${selectedBuilding === building 
                    ? 'bg-blue-600 text-white dark:bg-blue-500' 
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                  }`}
              >
                {building}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {roomNumbers[selectedBuilding]?.map((roomNumber, index) => {
              const room = currentRooms[index];
              return (
                <Room
                  key={`${selectedBuilding}-${roomNumber}`}
                  roomNumber={roomNumber}
                  count={room?.count || 0}
                  buildingName={selectedBuilding}
                  isPowered={powerStatus[`${selectedBuilding}-${roomNumber}`]}
                  onTogglePower={handlePowerToggle}
                />
              );
            })}
          </div>

          <div className="mt-4 flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded border-2 border-green-500 bg-green-50" />
              <span className="text-xs text-gray-600 dark:text-gray-300">High Occupancy (Power On)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded border-2 border-yellow-500 bg-yellow-50" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Low Occupancy (≤ 5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded border-2 border-red-500 bg-red-50" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Power Off</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricityManagement;