// src/config/mapConfig.ts

import { Block, Room } from '../type';

// Function to generate rooms for a block
function generateRooms(blockId: string, count: number, startX: number, startY: number): Room[] {
  const rooms: Room[] = [];
  const roomsPerFloor = 10;
  const roomsPerRow = 5;

  for (let i = 0; i < count; i++) {
    const floor = Math.floor(i / roomsPerFloor) + 1;
    const roomNumber = (i % roomsPerFloor) + 1;
    const roomId = `${floor}${roomNumber.toString().padStart(2, '0')}`; // e.g., 101, 102, etc.

    // Calculate room position within block
    const row = Math.floor((i % roomsPerFloor) / roomsPerRow);
    const col = i % roomsPerRow;

    rooms.push({
      id: roomId,
      floor,
      x: startX + (col * 60),  // 60px spacing between rooms
      y: startY + (row * 50),  // 50px spacing between rows
      width: 50,
      height: 40,
      label: `${blockId}-${roomId}` // e.g., VIB-101
    });
  }

  return rooms;
}

// Define block dimensions and positions
const BLOCK_CONFIGS = {
  VIB: {
    width: 320,
    height: 220,
    x: 400,
    y: 50,
    roomStartX: 10,
    roomStartY: 40
  },
  NYB: {
    width: 320,
    height: 220,
    x: 800,
    y: 50,
    roomStartX: 10,
    roomStartY: 40
  },
  KAB: {
    width: 320,
    height: 220,
    x: 50,
    y: 50,
    roomStartX: 10,
    roomStartY: 40
  },
  NIB: {
    width: 320,
    height: 220,
    x: 50,
    y: 300,
    roomStartX: 10,
    roomStartY: 40
  }
};

// Generate the complete campus map configuration
export const CAMPUS_BLOCKS: Block[] = [
  {
    id: 'VIB',
    name: 'VIB Block',
    x: BLOCK_CONFIGS.VIB.x,
    y: BLOCK_CONFIGS.VIB.y,
    width: BLOCK_CONFIGS.VIB.width,
    height: BLOCK_CONFIGS.VIB.height,
    color: '#e5e7eb',
    rooms: generateRooms(
      'VIB',
      30,
      BLOCK_CONFIGS.VIB.roomStartX,
      BLOCK_CONFIGS.VIB.roomStartY
    )
  },
  {
    id: 'NYB',
    name: 'NYB Block',
    x: BLOCK_CONFIGS.NYB.x,
    y: BLOCK_CONFIGS.NYB.y,
    width: BLOCK_CONFIGS.NYB.width,
    height: BLOCK_CONFIGS.NYB.height,
    color: '#e5e7eb',
    rooms: generateRooms(
      'NYB',
      30,
      BLOCK_CONFIGS.NYB.roomStartX,
      BLOCK_CONFIGS.NYB.roomStartY
    )
  },
  {
    id: 'KAB',
    name: 'KAB Block',
    x: BLOCK_CONFIGS.KAB.x,
    y: BLOCK_CONFIGS.KAB.y,
    width: BLOCK_CONFIGS.KAB.width,
    height: BLOCK_CONFIGS.KAB.height,
    color: '#e5e7eb',
    rooms: generateRooms(
      'KAB',
      30,
      BLOCK_CONFIGS.KAB.roomStartX,
      BLOCK_CONFIGS.KAB.roomStartY
    )
  },
  {
    id: 'NIB',
    name: 'NIB Block',
    x: BLOCK_CONFIGS.NIB.x,
    y: BLOCK_CONFIGS.NIB.y,
    width: BLOCK_CONFIGS.NIB.width,
    height: BLOCK_CONFIGS.NIB.height,
    color: '#e5e7eb',
    rooms: generateRooms(
      'NIB',
      30,
      BLOCK_CONFIGS.NIB.roomStartX,
      BLOCK_CONFIGS.NIB.roomStartY
    )
  }
];

// Helper functions for map interactions
export const getBlockById = (blockId: string): Block | undefined => {
  return CAMPUS_BLOCKS.find(block => block.id === blockId);
};

export const getRoomByNumber = (blockId: string, roomNumber: string): Room | undefined => {
  const block = getBlockById(blockId);
  return block?.rooms.find(room => room.id === roomNumber);
};

// Export map viewport configuration
export const MAP_CONFIG = {
  viewBox: '0 0 1200 600',
  minZoom: 0.5,
  maxZoom: 2,
  gridSize: 50,
};

// Export color configuration for heatmap
export const HEATMAP_COLORS = {
  min: '#ffffff',
  max: '#ff0000',
  steps: 10
};

// Define types for building levels
export const FLOOR_LEVELS = [
  { value: 1, label: 'First Floor' },
  { value: 2, label: 'Second Floor' },
  { value: 3, label: 'Third Floor' }
];

// Define student count thresholds for heatmap colors
export const STUDENT_COUNT_THRESHOLDS = {
  low: 10,
  medium: 25,
  high: 40,
  max: 50
};

// Export constants for room sizing and spacing
export const ROOM_CONFIG = {
  width: 50,
  height: 40,
  horizontalGap: 10,
  verticalGap: 10,
  labelOffset: {
    x: 25,
    y: 20
  }
};