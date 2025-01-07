import { useState, useEffect } from 'react';
import { Building } from 'lucide-react';

// Types for our data structures
type RoomData = {
  id: string;
  count: number;
  isOccupied: boolean;
};

type BuildingData = {
  name: string;
  rooms: RoomData[];
};

const ClassroomMonitor = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('VIB');
  const [roomsData, setRoomsData] = useState<BuildingData[]>([]);
  const [loading, setLoading] = useState(true);

  // Building configurations
  const buildingConfig = {
    VIB: 70,
    NIB: 50,
    KAB: 44,
    NYB: 51,
  };

  // Simulated API call - replace with actual API endpoint
  const fetchRoomsData = async () => {
    setLoading(true);
    try {
      // Simulate API response - replace with actual API call
      const response = await fetch('/api/rooms-status');
      const data = await response.json();
      setRoomsData(data);
    } catch (error) {
      console.error('Error fetching room data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoomsData();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchRoomsData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get rooms for selected building
  const getSelectedBuildingRooms = () => {
    return roomsData.find(b => b.name === selectedBuilding)?.rooms || [];
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <Building className="h-5 w-5" />
            Classroom Occupancy Monitor
          </h3>
        </div>

        <div className="p-4">
          {/* Building Selection */}
          <div className="flex gap-2 mb-4">
            {Object.keys(buildingConfig).map((building) => (
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
          <div className="flex flex-wrap  gap-2">
            {loading ? (
              <div className="col-span-9 text-center py-4 text-gray-600 dark:text-gray-300">Loading...</div>
            ) : (
              Array.from({ length: buildingConfig[selectedBuilding as keyof typeof buildingConfig] })
                .map((_, index) => {
                  const room = getSelectedBuildingRooms()[index];
                  const isOccupied = room?.count > 5;

                  return (
                    <div
                      key={index}
                      className={`
                        w-12 h-12 rounded-md p-2 flex items-center justify-center
                        transition-colors duration-200 text-xs
                        ${isOccupied 
                          ? 'border border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400' 
                          : 'border border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400'
                        }
                      `}
                    >
                      <div className="text-center">
                        <div className="font-bold text-[10px] mb-0.5 dark:text-gray-200">
                          {selectedBuilding}-{index + 1}
                        </div>
                        <div className="text-[8px] dark:text-gray-300">
                          {room?.count || 0}
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>

          {/* Legend */}
          <div className="mt-4 flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded border border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Available (&le; 5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded border border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Occupied (&gt; 5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomMonitor;