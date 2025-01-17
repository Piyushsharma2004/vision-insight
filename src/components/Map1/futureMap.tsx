'use client'
import React, { useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';

const ZoomableMap = () => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Controls */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
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

      {/* Map Container */}
      <div
        className="relative flex-1 border rounded-lg overflow-hidden bg-white"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative pl-10"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <Image
            src="/images/task/campus-map-2.svg" // Load the SVG from public directory
            alt="Campus Map"
            width={1000}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default ZoomableMap;
