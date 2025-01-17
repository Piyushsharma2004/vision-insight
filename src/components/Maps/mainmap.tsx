'use client'
import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Layers } from 'lucide-react';

// Types
interface Block {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rooms: Room[];
}

interface Room {
  id: string;
  floor: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface StudentCount {
  blockId: string;
  roomId: string;
  count: number;
  timestamp: string;
}

// Campus layout configuration
const CAMPUS_BLOCKS: Block[] = [
  {
    id: 'VIB',
    name: 'VIB Block',
    x: 200,
    y: 100,
    width: 300,
    height: 200,
    rooms: Array.from({ length: 30 }, (_, i) => ({
      id: `${i + 1}`.padStart(2, '0'),
      floor: Math.floor(i / 10) + 1,
      x: (i % 5) * 60 + 10,
      y: Math.floor((i % 10) / 5) * 40 + 10,
      width: 50,
      height: 30
    }))
  },
  {
    id: 'NYB',
    name: 'NYB Block',
    x: 600,
    y: 100,
    width: 250,
    height: 180,
    rooms: Array.from({ length: 30 }, (_, i) => ({
      id: `${i + 1}`.padStart(2, '0'),
      floor: Math.floor(i / 10) + 1,
      x: (i % 5) * 60 + 10,
      y: Math.floor((i % 10) / 5) * 40 + 10,
      width: 50,
      height: 30
    }))
  },
  {
    id: 'KAB',
    name: 'KAB Block',
    x: 100,
    y: 100,
    width: 150,
    height: 120,
    rooms: Array.from({ length: 30 }, (_, i) => ({
      id: `${i + 1}`.padStart(2, '0'),
      floor: Math.floor(i / 10) + 1,
      x: (i % 5) * 60 + 10,
      y: Math.floor((i % 10) / 5) * 40 + 10,
      width: 50,
      height: 30
    }))
  },
  {
    id: 'NIB',
    name: 'NIB Block',
    x: 100,
    y: 250,
    width: 200,
    height: 150,
    rooms: Array.from({ length: 30 }, (_, i) => ({
      id: `${i + 1}`.padStart(2, '0'),
      floor: Math.floor(i / 10) + 1,
      x: (i % 5) * 60 + 10,
      y: Math.floor((i % 10) / 5) * 40 + 10,
      width: 50,
      height: 30
    }))
  }
];

// Block Component
const Block: React.FC<{
  block: Block;
  selectedFloor: number;
  showHeatmap: boolean;
  studentCounts: StudentCount[];
}> = ({ block, selectedFloor, showHeatmap, studentCounts }) => {
  const getHeatIntensity = (count: number) => Math.min(count / 50, 1);

  return (
    <g className="block">
      {/* Block outline */}
      <rect
        x={block.x}
        y={block.y}
        width={block.width}
        height={block.height}
        fill="#f0f0f0"
        stroke="#666"
        strokeWidth="2"
      />
      <text
        x={block.x + 10}
        y={block.y + 20}
        className="text-sm font-bold"
      >
        {block.name}
      </text>

      {/* Rooms for selected floor */}
      {block.rooms
        .filter(room => Math.floor(parseInt(room.id) / 100) === selectedFloor)
        .map(room => {
          const count = studentCounts.find(
            c => c.blockId === block.id && c.roomId === room.id
          )?.count || 0;

          return (
            <g key={`${block.id}-${room.id}`}>
              <rect
                x={block.x + room.x}
                y={block.y + room.y}
                width={room.width}
                height={room.height}
                fill={showHeatmap ? `rgba(255, 0, 0, ${getHeatIntensity(count)})` : '#fff'}
                stroke="#000"
                strokeWidth="1"
                className="cursor-pointer hover:opacity-80"
              />
              <text
                x={block.x + room.x + room.width / 2}
                y={block.y + room.y + room.height / 2}
                textAnchor="middle"
                className="text-xs pointer-events-none"
              >
                {`${block.id}-${room.id}`}
                <tspan x={block.x + room.x + room.width / 2} y={block.y + room.y + room.height / 2 + 12}>
                  {count}
                </tspan>
              </text>
            </g>
          );
        })}
    </g>
  );
};

// Main Component
const CampusMap = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [studentCounts, setStudentCounts] = useState<StudentCount[]>([]);

  // Fetch mock data - replace with your API
  useEffect(() => {
    const fetchData = () => {
      const mockCounts: StudentCount[] = [];
      CAMPUS_BLOCKS.forEach(block => {
        block.rooms.forEach(room => {
          mockCounts.push({
            blockId: block.id,
            roomId: room.id,
            count: Math.floor(Math.random() * 50),
            timestamp: new Date().toISOString()
          });
        });
      });
      setStudentCounts(mockCounts);
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Pan and zoom handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Controls */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(Number(e.target.value))}
          className="px-3 py-2 border rounded-md"
        >
          <option value={1}>First Floor</option>
          <option value={2}>Second Floor</option>
          <option value={3}>Third Floor</option>
        </select>

        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50"
        >
          <Layers className="w-4 h-4" />
          {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(z => Math.min(2, z + 0.1))}
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div 
        className="relative flex-1 border rounded-lg overflow-hidden bg-gray-50"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 600"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ddd" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Blocks */}
          {CAMPUS_BLOCKS.map(block => (
            <Block
              key={block.id}
              block={block}
              selectedFloor={selectedFloor}
              showHeatmap={showHeatmap}
              studentCounts={studentCounts}
            />
          ))}
        </svg>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        {CAMPUS_BLOCKS.map(block => {
          const blockCounts = studentCounts.filter(c => c.blockId === block.id);
          const totalStudents = blockCounts.reduce((sum, c) => sum + c.count, 0);
          
          return (
            <div key={block.id} className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold">{block.name}</h3>
              <p className="text-2xl font-bold">{totalStudents} students</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampusMap;