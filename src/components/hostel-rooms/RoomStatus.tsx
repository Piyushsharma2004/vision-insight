// app/components/hostel-rooms/RoomStatus.tsx

'use client';
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Stats } from './Stats';
import { Filters } from './Filters';
import { RoomCard } from './RoomCard';
import { StudentDetailsModal } from './StudentDetailsModal';
import { Room, Student } from './types';

const RoomStatus = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('room_number');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState<Student | null>(null);
  const [loadingStudent, setLoadingStudent] = useState(false);


  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/rooms');
      if (!response.ok) {
        throw new Error(`Failed to fetch rooms: ${response.statusText}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setRooms(data);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch rooms');
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  
        // Safe getter methods for unique values
   const getUniqueBlocks = () => {
    const blocks = rooms?.map(room => room.block) || [];
    return ['all', ...Array.from(new Set(blocks))];
  };

  const getUniqueTypes = () => {
    const types = rooms?.map(room => room.hostel_type) || [];
    return ['all', ...Array.from(new Set(types))];
  };

  const getUniqueSections = () => {
    const sections = rooms?.map(room => room.section) || [];
    return ['all', ...Array.from(new Set(sections))];
  };

  const getFilteredAndSortedRooms = () => {
    // Guard against rooms being undefined or null
    if (!rooms) return [];

    let filteredRooms = rooms.filter(room => {
      if (!room) return false; // Skip invalid room objects

      const matchesFilter = 
        filter === 'all' ? true :
        filter === 'available' ? !room.status :
        room.status;
      
      const matchesSearch = 
        room.room_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.block?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.section?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBlock = selectedBlock === 'all' || room.block === selectedBlock;
      const matchesType = selectedType === 'all' || room.hostel_type === selectedType;
      const matchesSection = selectedSection === 'all' || room.section === selectedSection;
      
      return matchesFilter && matchesSearch && matchesBlock && matchesType && matchesSection;
    });

    return filteredRooms.sort((a, b) => {
      const compareValue = (val1: any, val2: any) => {
        if (typeof val1 === 'string') {
          return val1.localeCompare(val2);
        }
        return val1 - val2;
      };

      const aValue = a[sortBy as keyof Room];
      const bValue = b[sortBy as keyof Room];
      
      return sortOrder === 'asc' 
        ? compareValue(aValue, bValue)
        : compareValue(bValue, aValue);
    });
  };

  const fetchStudentByRoom = async (roomNumber: string, block: string, section: string) => {
    setLoadingStudent(true);
    try {
      const formattedRoomNumber = `${roomNumber}-${section}`;
      const response = await fetch(`/api/students/room?roomNumber=${formattedRoomNumber}&block=${block}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudentDetails(data);
    } catch (error) {
      console.error('Error fetching student details:', error);
      setStudentDetails(null);
    } finally {
      setLoadingStudent(false);
    }
  };

  const handleViewDetails = (room: Room) => {
    if (!room) return;
    setSelectedRoom(room);
    setShowModal(true);
    fetchStudentByRoom(room.room_number, room.block, room.section);
  };
  const getRoomStats = () => {
    const filteredRooms = getFilteredAndSortedRooms();
    const total = filteredRooms.length;
    const occupied = filteredRooms.filter(room => room.status).length;
    const available = total - occupied;
    return { total, occupied, available };
  };
  const stats = getRoomStats();

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Rooms...</h2>
          <p className="text-gray-500 mt-2">Please wait while we fetch the room data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen   flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Error Loading Rooms</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button 
            onClick={fetchRooms}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2">
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
        <Header 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
        <Stats 
          total={stats.total}
          available={stats.available}
          occupied={stats.occupied}
        />
      </div>
      
      {isFilterOpen && (
        <Filters 
          filter={filter}
          setFilter={setFilter}
          selectedBlock={selectedBlock}
          setSelectedBlock={setSelectedBlock}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          uniqueBlocks={getUniqueBlocks()}
          uniqueTypes={getUniqueTypes()}
          uniqueSections={getUniqueSections()}
        />
      )}
      
      {rooms.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <p className="text-gray-500">No rooms found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredAndSortedRooms().map((room) => (
            <RoomCard 
              key={room.id}
              room={room}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
      
      <StudentDetailsModal 
        showModal={showModal}
        selectedRoom={selectedRoom}
        studentDetails={studentDetails}
        loadingStudent={loadingStudent}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default RoomStatus;