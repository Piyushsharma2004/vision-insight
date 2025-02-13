'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './Header';
import { Stats } from './Stats';
import { Filters } from './Filters';
import { RoomCard } from './RoomCard';
import { StudentDetailsModal } from './StudentDetailsModal';
import { Room, Student } from './types';

const POLLING_INTERVAL = 5000; // 5 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // Poll every 5 seconds

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
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [retryCount, setRetryCount] = useState(0);
  const [isPollingPaused, setIsPollingPaused] = useState(false);
  
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState<Student | null>(null);
  const [loadingStudent, setLoadingStudent] = useState(false);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Modified fetchRooms function in your RoomStatus component
const fetchRooms = useCallback(async (retryAttempt = 0) => {
  if (isPollingPaused) return;

  try {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 8000);

    
    const response = await fetch(`/api/rooms`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      signal: abortController.signal,
      cache: 'no-store'
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch rooms: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data)) {
      setRooms(prevRooms => {
        const hasDataChanged = JSON.stringify(data) !== JSON.stringify(prevRooms);
        if (hasDataChanged) {
          setLastUpdated(new Date());
          setRetryCount(0);
          setError(null);
          return data;
        }
        return prevRooms;
      });
    } else {
      throw new Error('Invalid data format received');
    }
  } catch (error) {
    console.error('Error fetching rooms:', error);
    
    // Handle abort errors separately
    if (error instanceof Error && error.name === 'AbortError') {
      setError('Request timeout - retrying...');
    } else {
      setError(error instanceof Error ? error.message : 'Failed to fetch rooms');
    }

    // Implement exponential backoff for retries
    if (retryAttempt < MAX_RETRIES) {
      const backoffDelay = RETRY_DELAY * Math.pow(2, retryAttempt);
      await delay(backoffDelay);
      setRetryCount(prev => prev + 1);
      return fetchRooms(retryAttempt + 1);
    } else {
      setIsPollingPaused(true);
      setTimeout(() => {
        setIsPollingPaused(false);
        setRetryCount(0);
      }, 30000); // Wait 30 seconds before resuming polling after max retries
    }
  }
}, [isPollingPaused]);

  // Setup polling with reconnection logic
  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      await fetchRooms();
      setLoading(false);
    };
    
    initialFetch();

    let pollInterval: NodeJS.Timeout;

    if (!isPollingPaused) {
      pollInterval = setInterval(() => {
        var test_var = fetchRooms();
        console.log(test_var)

      }, POLLING_INTERVAL);
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [fetchRooms, isPollingPaused]);

   // Add reconnection button
   const handleReconnect = useCallback(async () => {
    setIsPollingPaused(false);
    setRetryCount(0);
    setError(null);
    await fetchRooms();
  }, [fetchRooms]);

  // Rest of the memoized functions and UI code remains the same...
  const uniqueBlocks = useMemo(() => {
    const blocks = rooms?.map(room => room.block) || [];
    return ['all', ...Array.from(new Set(blocks))];
  }, [rooms]);

  // Memoized getter methods for unique values


  const uniqueTypes = useMemo(() => {
    const types = rooms?.map(room => room.hostel_type) || [];
    return ['all', ...Array.from(new Set(types))];
  }, [rooms]);

  const uniqueSections = useMemo(() => {
    const sections = rooms?.map(room => room.section) || [];
    return ['all', ...Array.from(new Set(sections))];
  }, [rooms]);

  // Memoized filtered and sorted rooms
  const filteredAndSortedRooms = useMemo(() => {
    if (!rooms) return [];

    return rooms
      .filter(room => {
        if (!room) return false;

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
      })
      .sort((a, b) => {
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
  }, [rooms, filter, searchTerm, selectedBlock, selectedType, selectedSection, sortBy, sortOrder]);

  
  // Memoized room stats
  const stats = useMemo(() => {
    const total = filteredAndSortedRooms.length;
    const occupied = filteredAndSortedRooms.filter(room => room.status).length;
    const available = total - occupied;
    return { total, occupied, available };
  }, [filteredAndSortedRooms]);

  const fetchStudentByRoom = useCallback(async (roomNumber: string, block: string, section: string) => {
    setLoadingStudent(true);
    try {
      const formattedRoomNumber = `${roomNumber}-${section}`;
      const response = await fetch(
        `/api/students/room?roomNumber=${formattedRoomNumber}&block=${block}`,
        {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
          next:{
            revalidate:0,
          }
        }
      );
      
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
  }, []);

  const handleViewDetails = useCallback((room: Room) => {
    if (!room) return;
    setSelectedRoom(room);
    setShowModal(true);
    fetchStudentByRoom(room.room_number, room.block, room.section);
  }, [fetchStudentByRoom]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Error Loading Rooms</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button 
            onClick={() => fetchRooms()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Error Loading Rooms</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <div className="space-y-4">
            <button 
              onClick={handleReconnect}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full"
            >
              Reconnect
            </button>
            {retryCount > 0 && (
              <p className="text-sm text-gray-500">
                Retry attempt {retryCount} of {MAX_RETRIES}
              </p>
            )}
            {isPollingPaused && (
              <p className="text-sm text-yellow-500">
                Polling paused. Click reconnect to resume.
              </p>
            )}
          </div>
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
        <Stats {...stats} />
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
          uniqueBlocks={uniqueBlocks}
          uniqueTypes={uniqueTypes}
          uniqueSections={uniqueSections}
        />
      )}
      
      {filteredAndSortedRooms.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <p className="text-gray-500">No rooms found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedRooms.map((room) => (
            <RoomCard 
              key={`${room.id}-${room.status}`}
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