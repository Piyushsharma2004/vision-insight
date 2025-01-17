// BlockComponent.tsx
import React from 'react';
import { Block, StudentCount } from './type';

interface BlockProps {
  block: Block;
  selectedFloor: number;
  showHeatmap: boolean;
  studentCounts: StudentCount[];
}

export const BlockComponent: React.FC<BlockProps> = ({
  block,
  selectedFloor,
  showHeatmap,
  studentCounts
}) => {
  const getHeatIntensity = (count: number) => Math.min(count / 50, 1);

  const floorRooms = block.rooms.filter(room => room.floor === selectedFloor);

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
        className="cursor-pointer"
      />
      
      {/* Block name */}
      <text
        x={block.x + 10}
        y={block.y + 25}
        className="text-sm font-bold"
      >
        {block.name}
      </text>

      {/* Rooms */}
      {floorRooms.map(room => {
        const roomCount = studentCounts.find(
          c => c.blockId === block.id && c.roomId === room.id
        )?.count || 0;

        return (
          <g key={`${block.id}-${room.id}`}>
            {/* Room rectangle */}
            <rect
              x={block.x + room.x}
              y={block.y + room.y}
              width={room.width}
              height={room.height}
              fill={showHeatmap ? `rgba(255, 0, 0, ${getHeatIntensity(roomCount)})` : '#fff'}
              stroke="#000"
              strokeWidth="1"
              className="cursor-pointer hover:opacity-80"
            />
            
            {/* Room number and count */}
            <text
              x={block.x + room.x + room.width / 2}
              y={block.y + room.y + room.height / 2 - 6}
              textAnchor="middle"
              className="text-xs font-medium"
              fill={showHeatmap && roomCount > 25 ? '#fff' : '#000'}
            >
              {`${block.id}-${room.id}`}
            </text>
            
            <text
              x={block.x + room.x + room.width / 2}
              y={block.y + room.y + room.height / 2 + 8}
              textAnchor="middle"
              className="text-xs"
              fill={showHeatmap && roomCount > 25 ? '#fff' : '#000'}
            >
              {roomCount}
            </text>
          </g>
        );
      })}
    </g>
  );
};