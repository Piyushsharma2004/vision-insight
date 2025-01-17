'use client';
import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Building } from 'lucide-react';

// Types for our data structures
type RoomData = {
  id: string;
  count: number;
};

type BuildingData = {
  name: string;
  rooms: RoomData[];
};

// Room number mappings
const roomNumbers = {
  NYB: ['001', '002', '003', '005', '006', '101', '102', '103', '106', '107', '202', '203', '204', '207', '208', '216', '301', '302', '303', '306', '307', '309', '311', '312', '313', '314', '401', '402', '403', '405', '406', '410', '501', '502', '503', '505', '506'],
  KAB: ['101', '102','105', '106','108','201', '202','204', '206', '207', '301', '302', '305', '306', '308', '401','402','407','502','506','507','601', '603', '607', '608', '701', '703', '704', '705'],
  NIB: ['111', '112', '301', '302', '303', '304', '305', '313', '314', '401', '402', '413', '414', '502', '511', '601', '602', '603', '613', '702', '703', '712', '711'],
  VIB: ['006', '007', '013', '016', '103', '105', '109', '110', '206', '207', '211', '212', '301', '307', '308', '312', '313', '318', '402', '403', '407', '408', '411', '412', '502', '503', '507', '508', '511', '512']
};

// Memoized Room component for better performance
const Room = memo(({ roomNumber, count, buildingName }: { roomNumber: string; count: number; buildingName: string }) => {
  const isOccupied = count > 5;
  
  return (
    <div
      className={`
        w-18 h-18 rounded-md p-2 flex items-center justify-center
        transition-colors duration-200 text-xs border-2
        ${isOccupied 
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
          : 'border-green-500 bg-green-50 dark:bg-green-900/20'
        }
      `}
    >
      <div className="text-center">
        <div className="font-bold text-[12px] mb-0.5 dark:text-gray-200">
          {buildingName}-{roomNumber}
        </div>
        <div className="text-[12px] dark:text-gray-300">
          {count}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Only rerender if count actually changes
  return prevProps.count === nextProps.count && prevProps.buildingName === nextProps.buildingName;
});

Room.displayName = 'Room';

const ClassroomMonitor = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('VIB');
  const [roomsData, setRoomsData] = useState<BuildingData[]>([]);
  const updateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());
  const isUpdatingRef = useRef<boolean>(false);

 
    const [currentTime, setCurrentTime] = useState(Date.now());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 20000); // Update every 20 seconds
  
      return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);
  

  // Generate random count with weighting towards lower numbers
  const generateCount = useCallback(() => {
    const isLowOccupancy = Math.random() < 0.5;
    return isLowOccupancy 
      ? Math.floor(Math.random() * 5) + 1
      : Math.floor(Math.random() * 15) + 6;
  }, []);

  // Initialize and update room data
  const updateRoomsData = useCallback(() => {
    // Prevent multiple simultaneous updates
    if (isUpdatingRef.current) return;
    
    // Check if 20 seconds have passed
    const now = Date.now();
    if (now - lastUpdateRef.current < 20000) return;

    isUpdatingRef.current = true;
    
    const buildings: BuildingData[] = Object.entries(roomNumbers).map(([name, rooms]) => ({
      name,
      rooms: rooms.map(roomNumber => ({
        id: `${name}-${roomNumber}`,
        count: generateCount()
      }))
    }));

    setRoomsData(buildings);
    lastUpdateRef.current = now;
    isUpdatingRef.current = false;
  }, [generateCount]);

  // Set up initial data and interval
  useEffect(() => {
    // Initial data
    updateRoomsData();

    // Set up interval
    const startInterval = () => {
      if (updateTimerRef.current) {
        clearInterval(updateTimerRef.current);
      }
      updateTimerRef.current = setInterval(() => {
        if (!isUpdatingRef.current) {
          updateRoomsData();
        }
      }, 20000);
    };

    startInterval();

    // Cleanup function
    return () => {
      if (updateTimerRef.current) {
        clearInterval(updateTimerRef.current);
        updateTimerRef.current = null;
      }
    };
  }, [updateRoomsData]);

  // Memoize selected building rooms
  const selectedBuildingRooms = useCallback(() => {
    return roomsData.find(b => b.name === selectedBuilding)?.rooms || [];
  }, [roomsData, selectedBuilding]);

  // Get current rooms
  const currentRooms = selectedBuildingRooms();

  
  return (
    <div className="w-full max-w-6xl mx-auto pb-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <Building className="h-5 w-5" />
            Classroom Occupancy Monitor
          </h3>
          <h1 className="text-xs font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
       (Captured at: {new Date(currentTime - 10 * 60 * 1000).toLocaleTimeString()})
    </h1>


        </div>

        <div className="p-4">
          {/* Building Selection */}
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

          {/* Rooms Grid */}
          <div className="flex flex-wrap gap-2 ">
            {roomNumbers[selectedBuilding as keyof typeof roomNumbers].map((roomNumber, index) => {
              const room = currentRooms[index];
              return (
                <Room
                  key={`${selectedBuilding}-${roomNumber}`}
                  roomNumber={roomNumber}
                  count={room?.count || 0}
                  buildingName={selectedBuilding}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded border-2 border-green-500 bg-green-50 dark:bg-green-900/20" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Available (≤ 5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded border-2 border-red-500 bg-red-50 dark:bg-red-900/20" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Occupied ({'>'} 5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomMonitor;