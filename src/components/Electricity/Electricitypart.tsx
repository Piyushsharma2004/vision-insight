'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Building } from 'lucide-react';
import Room from './Room';
import BuildingSelector from './BuildingSelector';
import Legend from './Legend';

// Types for our data structures
type RoomData = {
  id: string;
  count: number;
  powerOn: boolean;
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

const ElectricityManagement = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('VIB');
  const [roomsData, setRoomsData] = useState<BuildingData[]>([]);
  const updateTimerRef = useRef<NodeJS.Timeout | null>(null);

  const generateCount = useCallback(() => {
    const isLowOccupancy = Math.random() < 0.5;
    return isLowOccupancy ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 15) + 6;
  }, []);

  const initializeRoomsData = useCallback(() => {
    const buildings: BuildingData[] = Object.entries(roomNumbers).map(([name, rooms]) => ({
      name,
      rooms: rooms.map((roomNumber) => ({
        id: `${name}-${roomNumber}`,
        count: generateCount(),
        powerOn: true, // Default all rooms to have power on initially
      })),
    }));

    setRoomsData(buildings);
  }, [generateCount]);

  const togglePower = (buildingName: string, roomId: string) => {
    setRoomsData((prevData) =>
      prevData.map((building) =>
        building.name === buildingName
          ? {
              ...building,
              rooms: building.rooms.map((room) =>
                room.id === roomId ? { ...room, powerOn: !room.powerOn } : room
              ),
            }
          : building
      )
    );
  };

  useEffect(() => {
    initializeRoomsData();
    updateTimerRef.current = setInterval(() => {
      setRoomsData((prevData) =>
        prevData.map((building) => ({
          ...building,
          rooms: building.rooms.map((room) => {
            const newCount = generateCount();
            return {
              ...room,
              count: newCount,
              powerOn: newCount > 5 ? room.powerOn : false, // Auto power off if count <= 5
            };
          }),
        }))
      );
    }, 20000);

    return () => {
      if (updateTimerRef.current) clearInterval(updateTimerRef.current);
    };
  }, [generateCount, initializeRoomsData]);

  const selectedBuildingRooms =
    roomsData.find((building) => building.name === selectedBuilding)?.rooms || [];

  return (
    <div className="w-full max-w-6xl mx-auto pb-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <Building className="h-5 w-5" />
            Electricity Management Dashboard
          </h3>
        </div>

        <div className="p-4">
          {/* Building Selection */}
          <BuildingSelector
            buildings={Object.keys(roomNumbers)}
            selectedBuilding={selectedBuilding}
            setSelectedBuilding={setSelectedBuilding}
          />

          {/* Rooms Grid */}
          <div className="flex flex-wrap gap-2">
            {selectedBuildingRooms.map((room) => (
              <Room
                key={room.id}
                roomData={room}
                buildingName={selectedBuilding}
                onTogglePower={togglePower}
              />
            ))}
          </div>

          {/* Legend */}
          <Legend />
        </div>
      </div>
    </div>
  );
};

export default ElectricityManagement;
