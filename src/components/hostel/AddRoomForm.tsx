'use client';
import React, { useMemo } from 'react';
import { Search } from 'lucide-react';

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

interface HostelHeaderProps {
  rooms: Record<HostelType, Room[]>;
  selectedHostel: HostelType;
  onFilterChange: (filters: FilterOptions) => void;
}

const HostelHeader: React.FC<HostelHeaderProps> = ({
  rooms,
  selectedHostel,
  onFilterChange,
}) => {
  const [filters, setFilters] = React.useState<FilterOptions>({
    status: 'All',
    floor: 'All',
    section: 'All',
    search: '',
  });

  const floors = useMemo(() => {
    const uniqueFloors = new Set(
      rooms[selectedHostel].map(room => room.floor)
    );
    return Array.from(uniqueFloors).sort();
  }, [rooms, selectedHostel]);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const stats = useMemo(() => {
    const hostelRooms = rooms[selectedHostel] || [];
    const total = hostelRooms.length;
    const available = hostelRooms.filter(room => room.status === 'Available').length;
    const occupied = hostelRooms.filter(room => room.status === 'Occupied').length;
    return { total, available, occupied };
  }, [rooms, selectedHostel]);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Total Rooms</p>
          <p className="text-2xl font-semibold">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Available</p>
          <p className="text-2xl font-semibold text-green-600">{stats.available}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Occupied</p>
          <p className="text-2xl font-semibold text-red-600">{stats.occupied}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Floor
          </label>
          <select
            value={filters.floor}
            onChange={(e) => handleFilterChange('floor', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Floors</option>
            {floors.map((floor) => (
              <option key={floor} value={floor}>
                Floor {floor}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section
          </label>
          <select
            value={filters.section}
            onChange={(e) => handleFilterChange('section', e.target.value as RoomSection | 'All')}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search rooms..."
              className="w-full border border-gray-300 rounded-lg p-2 pl-9 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelHeader;