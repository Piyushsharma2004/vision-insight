'use client';
import React, { useState, useRef } from 'react';
import { Upload, AlertTriangle, X } from 'lucide-react';

type HostelType = 'BH1' | 'BH2' | 'BH3' | 'GH1';
type RoomSection = 'A' | 'B' | 'C' | 'D';

interface Room {
  hostel: HostelType;
  floor: string;
  room: string;
  section: RoomSection;
}

interface AddRoomFormProps {
  onAddRoom: (room: Room) => void;
  onBulkAddRooms: (rooms: Room[]) => void;
  existingRooms: Room[];
}

interface FileData {
  'Sr No.': string;
  'Hostel No.': string;
  'Floor No.': string;
  'Room No.': string;
  'Section': string;
}

const AddRoomForm: React.FC<AddRoomFormProps> = ({ onAddRoom, onBulkAddRooms, existingRooms }) => {
  const [hostel, setHostel] = useState<HostelType>('BH1');
  const [floor, setFloor] = useState('');
  const [room, setRoom] = useState('');
  const [section, setSection] = useState<RoomSection>('A');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateRoom = (newRoom: Room): boolean => {
    const isDuplicate = existingRooms.some(
      existing => 
        existing.hostel === newRoom.hostel &&
        existing.floor === newRoom.floor &&
        existing.room === newRoom.room &&
        existing.section === newRoom.section
    );

    if (isDuplicate) {
      setError(`Room ${newRoom.hostel}-${newRoom.floor}${newRoom.room}-${newRoom.section} already exists`);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!floor || isNaN(Number(floor)) || Number(floor) <= 0) {
      setError('Please enter a valid floor number');
      return;
    }

    if (!room || isNaN(Number(room)) || Number(room) <= 0) {
      setError('Please enter a valid room number');
      return;
    }

    const newRoom: Room = {
      hostel,
      floor,
      room,
      section,
    };

    if (validateRoom(newRoom)) {
      onAddRoom(newRoom);
      setFloor('');
      setRoom('');
      setError(null);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvData = e.target?.result as string;
        const rows = csvData.split('\n').slice(1); // Skip header row
        const duplicates: string[] = [];
        const newRooms: Room[] = [];

        for (const row of rows) {
          if (!row.trim()) continue;
          
          const [_, hostelNo, floorNo, roomNo, sectionValue] = row.split(',').map(val => val.trim());

          if (!['BH1', 'BH2', 'BH3', 'GH1'].includes(hostelNo)) {
            throw new Error(`Invalid hostel number: ${hostelNo}`);
          }

          if (!['A', 'B', 'C', 'D'].includes(sectionValue)) {
            throw new Error(`Invalid section: ${sectionValue}`);
          }

          const newRoom: Room = {
            hostel: hostelNo as HostelType,
            floor: floorNo,
            room: roomNo,
            section: sectionValue as RoomSection,
          };

          if (!validateRoom(newRoom)) {
            duplicates.push(`${hostelNo}-${floorNo}${roomNo}-${sectionValue}`);
          } else {
            newRooms.push(newRoom);
          }
        }

        if (duplicates.length > 0) {
          setError(`Duplicate rooms found: ${duplicates.join(', ')}`);
          return;
        }

        onBulkAddRooms(newRooms);
        setShowUploadModal(false);
        setError(null);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error processing file');
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === 'text/csv') {
      handleFileUpload(file);
    } else {
      setError('Please upload only CSV files');
    }
  };

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
          <select
            value={hostel}
            onChange={(e) => setHostel(e.target.value as HostelType)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="BH1">BH1</option>
            <option value="BH2">BH2</option>
            <option value="BH3">BH3</option>
            <option value="GH1">GH1</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Floor Number</label>
          <input
            type="text"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter floor number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter room number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value as RoomSection)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors"
          >
            Add Room
          </button>
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Upload size={16} />
            Upload CSV
          </button>
        </div>
      </form>

      {/* File Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99999">
          <div 
            className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 ${isDragging ? 'ring-2 ring-blue-500' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Room Data</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />

              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop your CSV file here, or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-500 hover:text-blue-600"
                >
                  browse
                </button>
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Expected CSV format: Sr No., Hostel No., Floor No., Room No., Section
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRoomForm;