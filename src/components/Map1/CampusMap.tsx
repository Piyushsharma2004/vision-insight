'use client'
import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Layers } from 'lucide-react';
import { CAMPUS_BLOCKS } from './config/mapConfig';
import { BlockComponent } from './BlockComponent';
import type { StudentCount } from './type';
import ZoomableMap from './futureMap';

const CampusMap = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [studentCounts, setStudentCounts] = useState<StudentCount[]>([]);

  // Mock data fetch - replace with actual API call
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

  // Calculate total students in all blocks
  const totalStudents = studentCounts.reduce((sum, c) => sum + c.count, 0);

  // Calculate total students in the selected floor
  const totalStudentsOnFloor = studentCounts
    .filter(c => parseInt(c.roomId) >= selectedFloor * 100 && parseInt(c.roomId) < (selectedFloor + 1) * 100)
    .reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Controls */}
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow">
        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(Number(e.target.value))}
          className="px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option value={1}>First Floor</option>
          <option value={2}>Second Floor</option>
          <option value={3}>Third Floor</option>
          <option value={4}>Fourth Floor</option>
          <option value={5}>Fifth Floor</option>
        </select>

        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <Layers className="w-4 h-4" />
          {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
            className="p-2 border rounded-md hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(z => Math.min(2, z + 0.1))}
            className="p-2 border rounded-md hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 bg-red-100 dark:bg-red-900 border-l-4 border-red-400 dark:border-red-600 rounded-md">
          <h1 className="text-red-700 dark:text-red-300 text-sm font-semibold">
            This is a simulated map for testing components. We are actively working to improve it.
          </h1>
        </div>
      </div>

      {/* Map Container */}
      <div 
        className="relative flex-1 border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ddd" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {CAMPUS_BLOCKS.map(block => (
            <BlockComponent
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
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg col-span-4">
          <h3 className="font-semibold text-lg">Total Students Across All Blocks</h3>
          <p className="text-xl font-bold">{totalStudents} students</p>
        </div>

        {CAMPUS_BLOCKS.map(block => {
          const blockCounts = studentCounts.filter(c => c.blockId === block.id);
          const totalBlockStudents = blockCounts.reduce((sum, c) => sum + c.count, 0);
          const floorStudents = blockCounts
            .filter(c => parseInt(c.roomId) >= selectedFloor * 100 && parseInt(c.roomId) < (selectedFloor + 1) * 100)
            .reduce((sum, c) => sum + c.count, 0);
          
          return (
            <div key={block.id} className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h3 className="font-semibold">{block.name}</h3>
              <p className="text-xl font-bold">{totalBlockStudents} total</p>
              <p className="text-sm">Floor {selectedFloor}: {floorStudents}</p>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg mt-4">
        <h3 className="font-semibold text-lg">Total Students on Floor {selectedFloor}</h3>
        <p className="text-xl font-bold">{totalStudentsOnFloor} students</p>
      </div>
      <ZoomableMap />
    </div>
  );
};

export default CampusMap;
