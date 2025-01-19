'use client';
import React, { useState, useMemo } from 'react';
import { XCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';
import HostelHeader from './HostelHeader';
import AddRoomForm from './AddRoomForm';

type HostelType = 'BH1' | 'BH2' | 'BH3' | 'GH1';
type RoomSection = 'A' | 'B' | 'C' | 'D';
type FilterStatus = 'All' | 'Available' | 'Occupied';

interface Room {
  hostel: HostelType;
  floor: string;
  room: string;
  section: RoomSection;
  status: 'Available' | 'Occupied';
}

interface FilterOptions {
  status: FilterStatus;
  floor: string;
  section: RoomSection | 'All';
  search: string;
}

// Helper to generate initial rooms
const generateInitialRooms = (hostelType: HostelType): Room[] => {
  const rooms: Room[] = [];
  for (let floor = 1; floor <= 4; floor++) {
    for (let room = 1; room <= 25; room++) {
      ['A', 'B', 'C', 'D'].forEach((section) => {
        rooms.push({
          hostel: hostelType,
          floor: floor.toString(),
          room: room.toString().padStart(2, '0'),
          section: section as RoomSection,
          status: Math.random() > 0.5 ? 'Available' : 'Occupied',
        });
      });
    }
  }
  return rooms;
};

const initialHostelRooms: Record<HostelType, Room[]> = {
  BH1: generateInitialRooms('BH1'),
  BH2: generateInitialRooms('BH2'),
  BH3: generateInitialRooms('BH3'),
  GH1: generateInitialRooms('GH1'),
};

const HostelManagement: React.FC = () => {
  const [selectedHostel, setSelectedHostel] = useState<HostelType>('BH1');
  const [rooms, setRooms] = useState<Record<HostelType, Room[]>>(initialHostelRooms);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'All',
    floor: 'All',
    section: 'All',
    search: '',
  });
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
  const hostels: HostelType[] = ['BH1', 'BH2', 'BH3', 'GH1'];

  const toggleRoomStatus = (room: Room) => {
    setRooms((prevRooms) => ({
      ...prevRooms,
      [selectedHostel]: prevRooms[selectedHostel].map((r) =>
        r.hostel === room.hostel &&
        r.floor === room.floor &&
        r.room === room.room &&
        r.section === room.section
          ? { ...r, status: r.status === 'Available' ? 'Occupied' : 'Available' }
          : r
      ),
    }));
  };

  const handleDeleteRoom = (room: Room) => {
    setRooms((prevRooms) => ({
      ...prevRooms,
      [selectedHostel]: prevRooms[selectedHostel].filter(
        (r) =>
          !(
            r.hostel === room.hostel &&
            r.floor === room.floor &&
            r.room === room.room &&
            r.section === room.section
          )
      ),
    }));
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleAddRoom = (newRoom: Omit<Room, 'status'>) => {
    setRooms((prevRooms) => ({
      ...prevRooms,
      [newRoom.hostel]: [...prevRooms[newRoom.hostel], { ...newRoom, status: 'Available' }],
    }));
  };

  const filteredRooms = useMemo(() => {
    return rooms[selectedHostel].filter((room) => {
      if (filters.status !== 'All' && room.status !== filters.status) return false;
      if (filters.floor !== 'All' && room.floor !== filters.floor) return false;
      if (filters.section !== 'All' && room.section !== filters.section) return false;
      const roomId = `${room.hostel}-${room.floor}${room.room}-${room.section}`;
      if (filters.search && !roomId.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [rooms, selectedHostel, filters]);

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white rounded-md">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hostel Room Management
            </h1>
            <HostelHeader rooms={rooms} selectedHostel={selectedHostel} onFilterChange={handleFilterChange} />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              {hostels.map((hostel) => (
                <button
                  key={hostel}
                  onClick={() => setSelectedHostel(hostel)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedHostel === hostel
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {hostel}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddRoomForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              <Plus size={16} />
              Add Room
            </button>
          </div>

          {showAddRoomForm && (
            <div className="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Room</h2>
                <button onClick={() => setShowAddRoomForm(false)} className="text-gray-500 dark:text-gray-300">
                  <XCircle size={20} />
                </button>
              </div>
              <AddRoomForm
                onAddRoom={handleAddRoom}
                onBulkAddRooms={(newRooms) => {
                  setRooms((prevRooms) => ({
                    ...prevRooms,
                    [selectedHostel]: [...prevRooms[selectedHostel], ...newRooms.map(room => ({ ...room, status: 'Available' }))],
                  }));
                }}
                existingRooms={Object.values(rooms).flat()}
              />
            </div>
            
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white dark:bg-gray-800 text-left text-sm text-gray-500 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Room Number</th>
                  <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Floor</th>
                  <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Section</th>
                  <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Status</th>
                  <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Action</th>
                  <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredRooms.map((room, index) => {
                  const roomId = `${room.hostel}-${room.floor}${room.room}-${room.section}`;
                  return (
                    <tr
                      key={roomId}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{roomId}</td>
                      <td className="px-6 py-4">Floor {room.floor}</td>
                      <td className="px-6 py-4">Section {room.section}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            room.status === 'Available'
                              ? 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200'
                              : 'bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200'
                          }`}
                        >
                          {room.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleRoomStatus(room)}
                          className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          {room.status === 'Available' ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              Mark Occupied
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                              Mark Available
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteRoom(room)}
                          className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-50 dark:hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelManagement;
