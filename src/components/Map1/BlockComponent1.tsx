
import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const BlockComponent = () => {
  const [svgContent, setSvgContent] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Fetch SVG file from public folder
    fetch('/images/task/campus-map-2.svg')
      .then(response => response.text())
      .then(data => {
        // Extract the SVG content from inside the <svg> tag
        const svgContentOnly = data.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] || '';
        setSvgContent(svgContentOnly);
      })
      .catch(error => console.error('Error loading SVG:', error));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - pan.x, 
      y: e.clientY - pan.y 
    });
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
    <div className="w-full h-full flex flex-col gap-4 p-4">
      {/* Controls */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm">{Math.round(zoom * 100)}%</span>
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
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: '0 0',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  );
};

export default BlockComponent;