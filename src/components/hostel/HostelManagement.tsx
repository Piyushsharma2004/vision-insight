'use client'
import React, { useState, useMemo } from 'react';
import { XCircle, CheckCircle, Plus,Trash2 } from 'lucide-react';
import HostelHeader from './HostelHeader';
import AddRoomForm from './AddRoomForm';

type HostelType = 'BH1' | 'BH2' | 'BH3' | 'GH1';
type RoomSection = 'A' | 'B' | 'C' | 'D';
type FilterStatus = 'All' | 'Available' | 'Occupied';

// Align Room interface with AddRoomForm's Room interface
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
interface AddRoomFormProps {

  onAddRoom: (newRoom: Omit<Room, 'status'>) => void;

  onBulkAddRooms: (newRooms: Omit<Room, 'status'>[]) => void;

  existingRooms: Room[];

}

const generateInitialRooms = (hostelType: HostelType ): Room[] => {
  const rooms: Room[] = [];
  for (let floor = 1; floor <= 4; floor++) {
    for (let room = 1; room <= 25; room++) {
      ['A', 'B', 'C', 'D'].forEach((section) => {
        rooms.push({
          hostel: hostelType,
          floor: floor.toString(),
          room: room.toString().padStart(2, '0'),
          section: section as RoomSection,
          status: Math.random() > 0.5 ? 'Available' : 'Occupied'
        });
      });
    }
  }
  return rooms;
};

const initialHostelRooms: Record<HostelType, Room[]> = {
  'BH1': generateInitialRooms('BH1'),
  'BH2': generateInitialRooms('BH2'),
  'BH3': generateInitialRooms('BH3'),
  'GH1': generateInitialRooms('GH1')
};

const HostelManagement: React.FC = () => {
  const [selectedHostel, setSelectedHostel] = useState<HostelType>('BH1');
  const [rooms, setRooms] = useState<Record<HostelType, Room[]>>(initialHostelRooms);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'All',
    floor: 'All',
    section: 'All',
    search: ''
  });
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
  const hostels: HostelType[] = ['BH1', 'BH2', 'BH3', 'GH1'];

  const toggleRoomStatus = (room: Room) => {
    setRooms(prevRooms => ({
      ...prevRooms,
      [selectedHostel]: prevRooms[selectedHostel].map(r => {
        if (r.hostel === room.hostel && 
            r.floor === room.floor && 
            r.room === room.room && 
            r.section === room.section) {
          return {
            ...r,
            status: r.status === 'Available' ? 'Occupied' : 'Available'
          };
        }
        return r;
      })
    }));
  };
  const handleDeleteRoom = (room: Room) => {
    setRooms(prevRooms => ({
      ...prevRooms,
      [selectedHostel]: prevRooms[selectedHostel].filter(r => 
        !(r.hostel === room.hostel && 
          r.floor === room.floor && 
          r.room === room.room && 
          r.section === room.section)
      )
    }));
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Update handleAddRoom to match AddRoomForm's interface
  const handleAddRoom = (newRoom: Omit<Room, 'status'>) => {
    setRooms(prevRooms => ({
      ...prevRooms,
      [newRoom.hostel]: [...prevRooms[newRoom.hostel], { ...newRoom, status: 'Available' }]
    }));
  };

  // Update handleBulkAddRooms to match AddRoomForm's interface
  const handleBulkAddRooms = (newRooms: Omit<Room, 'status'>[]) => {
    setRooms(prevRooms => {
      const updatedRooms = { ...prevRooms };
      newRooms.forEach(room => {
        if (!updatedRooms[room.hostel]) {
          updatedRooms[room.hostel] = [];
        }
        updatedRooms[room.hostel].push({ ...room, status: 'Available' });
      });
      return updatedRooms;
    });
  };

  const filteredRooms = useMemo(() => {
    return rooms[selectedHostel].filter(room => {
      if (filters.status !== 'All' && room.status !== filters.status) return false;
      if (filters.floor !== 'All' && room.floor !== filters.floor) return false;
      if (filters.section !== 'All' && room.section !== filters.section) return false;
      const roomId = `${room.hostel}-${room.floor}${room.room}-${room.section}`;
      if (filters.search && !roomId.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [rooms, selectedHostel, filters]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Hostel Room Management</h1>
            <HostelHeader
              rooms={rooms}
              selectedHostel={selectedHostel}
              onFilterChange={handleFilterChange}
            />
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
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
            <div className="mb-6 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add New Room</h2>
                <button 
                  onClick={() => setShowAddRoomForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle size={20} />
                </button>
              </div>
              <AddRoomForm
                onAddRoom={handleAddRoom}
                onBulkAddRooms={handleBulkAddRooms}
                existingRooms={Object.values(rooms).flat()}
              />
            </div>
          )}

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-900">Room Number</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Floor</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Section</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Status</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Action</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Delete</th>
        
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {filteredRooms.map((room, index) => {
          const roomId = `${room.hostel}-${room.floor}${room.room}-${room.section}`;
          return (
            <tr 
              key={roomId} 
              className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <td className="px-6 py-4 font-medium text-gray-900">{roomId}</td>
              <td className="px-6 py-4">Floor {room.floor}</td>
              <td className="px-6 py-4">Section {room.section}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                  ${room.status === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'}`
                }>
                  {room.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRoomStatus(room)}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {room.status === 'Available' ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Mark Occupied
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-600" />
                        Mark Available
                      </>
                    )}
                  </button>
             
                </div>
              </td>
              <td >
              <button
                    onClick={() => handleDeleteRoom(room)}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
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