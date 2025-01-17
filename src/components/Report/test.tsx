'use client'
import React, { useState, useEffect } from 'react';
import { Search, Building, Calendar, Download } from 'lucide-react';

// SearchRoom Component
const SearchRoom = ({ onSearch, selectedRooms, onRoomSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Simulated room data - replace with actual room data
    const generateRooms = (block) => {
      return Array.from({ length: 10 }, (_, i) => ({
        id: `${block}-${String(i + 1).padStart(2, '0')}1`,
        block: block
      }));
    };

    const allRooms = ['VIB', 'NYB', 'KAB', 'NIB'].flatMap(block => generateRooms(block));
    setRooms(allRooms);
  }, []);

  const filteredRooms = rooms.filter(room => 
    room.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search rooms..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-red-300 dark:border-red-600 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" />
      </div>
      
      {searchTerm && (
        <div className="absolute z-20 w-full mt-1 max-h-60 overflow-y-auto rounded-lg shadow-lg 
                      bg-white dark:bg-gray-800 border border-red-300 dark:border-red-600">
          {filteredRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onRoomSelect(room)}
              className={`w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20
                        ${selectedRooms.includes(room.id) ? 'bg-red-100 dark:bg-red-900/30' : ''}`}
            >
              {room.id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Enhanced FilterBar Component
const FilterBar = ({
  selectedBlock,
  onBlockChange,
  selectedDate,
  onDateChange,
  selectedRooms,
  onRoomSelect,
  onExport,
  blocks
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Block Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Block
          </label>
          <select
            value={selectedBlock}
            onChange={(e) => onBlockChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-red-300 dark:border-red-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {blocks.map((block) => (
              <option key={block} value={block}>{block}</option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => onDateChange(new Date(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-red-300 dark:border-red-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Export Button */}
        <div className="flex items-end">
          <button
            onClick={onExport}
            className="w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 
                     dark:bg-red-700 dark:hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Room Search */}
      <SearchRoom
        onSearch={(term) => console.log('Searching:', term)}
        selectedRooms={selectedRooms}
        onRoomSelect={onRoomSelect}
      />
    </div>
  );
};

// Enhanced Table Component
const RoomTable = ({ selectedRooms, timeSlots, data }) => {
  if (!selectedRooms.length) {
    return (
      <div className="text-center p-8 text-gray-500 dark:text-gray-400">
        Please select a room to view its schedule
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-lg border dark:border-gray-700 shadow-lg">
      <table className="w-full border-collapse bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="border dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900 sticky left-0 z-10">
              Room
            </th>
            {timeSlots.map((time, index) => (
              <th
                key={`time-${index}`}
                className="border dark:border-gray-700 p-3 min-w-[100px] text-xs bg-red-50 dark:bg-red-900/20"
              >
                <div className="font-bold mb-1">{`P${index + 1}`}</div>
                <div className="text-xs opacity-75">{time}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedRooms.map((roomId) => (
            <tr key={roomId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="border dark:border-gray-700 p-3 font-medium sticky left-0 bg-white dark:bg-gray-800 z-10">
                {roomId}
              </td>
              {Array.from({ length: timeSlots.length }, (_, i) => {
                const occupancy = Math.floor(Math.random() * 10); // Replace with actual data
                const style = getOccupancyStyle(occupancy);
                return (
                  <td
                    key={`${roomId}-${i}`}
                    className={`border p-3 text-center ${style.bg} ${style.text} ${style.border}`}
                  >
                    {occupancy}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function for occupancy styling
const getOccupancyStyle = (count) => {
  if (count === 0) return {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-400 dark:text-gray-500',
    border: 'border-gray-300 dark:border-gray-600',
  };
  if (count <= 5) return {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-500 dark:border-green-600',
  };
  return {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-500 dark:border-red-600',
  };
};

// Main Component
const RoomScheduler = () => {
  const [selectedBlock, setSelectedBlock] = useState('VIB');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRooms, setSelectedRooms] = useState([]);

  const blocks = ['VIB', 'NYB', 'KAB', 'NIB'];
  const timeSlots = [
    '8:00 - 8:50', '8:50 - 9:40', '9:40 - 10:30',
    '10:50 - 11:40', '11:40 - 12:30', '12:30 - 1:00',
    '1:00 - 1:50', '1:50 - 2:40', '2:40 - 3:30',
    '3:50 - 4:40', '4:40 - 5:30', '5:30 - 6:00'
  ];

  const handleRoomSelect = (room) => {
    setSelectedRooms(prev => {
      if (prev.includes(room.id)) {
        return prev.filter(id => id !== room.id);
      }
      return [...prev, room.id];
    });
  };

  const handleExport = () => {
    // Implement export logic
    console.log('Exporting data...');
  };

  return (
    <div className="p-4 space-y-6">
      <FilterBar
        selectedBlock={selectedBlock}
        onBlockChange={setSelectedBlock}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedRooms={selectedRooms}
        onRoomSelect={handleRoomSelect}
        onExport={handleExport}
        blocks={blocks}
      />
      <RoomTable
        selectedRooms={selectedRooms}
        timeSlots={timeSlots}
        data={[]} // Replace with actual data
      />
    </div>
  );
};

export default RoomScheduler;