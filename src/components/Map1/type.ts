// src/types/index.ts

// Basic coordinate type
export interface Coordinates {
    x: number;
    y: number;
  }
  
  // Room interface
  export interface Room {
    id: string;
    floor: number;
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;  // e.g., "VIB-101"
  }
  
  // Block interface
  export interface Block {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    rooms: Room[];
  }
  
  // Block configuration interface
  export interface BlockConfig {
    width: number;
    height: number;
    x: number;
    y: number;
    roomStartX: number;
    roomStartY: number;
  }
  
  // Map viewport configuration
  export interface MapConfig {
    viewBox: string;
    minZoom: number;
    maxZoom: number;
    gridSize: number;
  }
  
  // Heatmap color configuration
  export interface HeatmapColors {
    min: string;
    max: string;
    steps: number;
  }
  
  // Floor level definition
  export interface FloorLevel {
    value: number;
    label: string;
  }
  
  // Student count thresholds
  export interface StudentCountThresholds {
    low: number;
    medium: number;
    high: number;
    max: number;
  }
  
  // Room configuration
  export interface RoomConfig {
    width: number;
    height: number;
    horizontalGap: number;
    verticalGap: number;
    labelOffset: Coordinates;
  }
  
  // Student count data
  export interface StudentCount {
    blockId: string;
    roomId: string;
    count: number;
    timestamp: string;
  }
  
  // Pan and zoom state
  export interface PanZoomState {
    pan: Coordinates;
    zoom: number;
  }
  
  // Map interaction state
  export interface MapInteractionState {
    isDragging: boolean;
    dragStart: Coordinates;
  }
  
  // Component props types
  export interface CampusMapProps {
    initialFloor?: number;
    updateInterval?: number;
    onRoomClick?: (blockId: string, roomId: string) => void;
    onBlockClick?: (blockId: string) => void;
  }
  
  export interface BlockComponentProps {
    block: Block;
    selectedFloor: number;
    showHeatmap: boolean;
    studentCounts: StudentCount[];
    onRoomClick?: (blockId: string, roomId: string) => void;
  }
  
  export interface RoomComponentProps {
    room: Room;
    blockId: string;
    blockX: number;
    blockY: number;
    showHeatmap: boolean;
    studentCount: number;
    onClick?: (blockId: string, roomId: string) => void;
  }
  
  // View modes
  export type ViewMode = 'normal' | 'heatmap';
  
  // API response types
  export interface StudentCountResponse {
    success: boolean;
    data: StudentCount[];
    timestamp: string;
  }
  
  export interface MapDataResponse {
    blocks: Block[];
    config: MapConfig;
  }
  
  // Error types
  export interface MapError {
    code: string;
    message: string;
    details?: unknown;
  }
  
  // Theme types for styling
  export interface MapTheme {
    blocks: {
      default: string;
      selected: string;
      hover: string;
    };
    rooms: {
      default: string;
      occupied: string;
      selected: string;
      hover: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    grid: {
      color: string;
      weight: number;
    };
  }
  
  // Statistics types
  export interface BlockStatistics {
    totalStudents: number;
    floorStudents: number;
    occupancyRate: number;
    peakHours: string[];
  }
  
  export interface MapStatistics {
    totalStudents: number;
    averageOccupancy: number;
    mostOccupiedBlock: string;
    leastOccupiedBlock: string;
    floorStatistics: Record<number, {
      students: number;
      occupancyRate: number;
    }>;
  }
  
  // Event types
  export type MapEventType = 
    | 'room-click'
    | 'block-click'
    | 'floor-change'
    | 'view-mode-change'
    | 'zoom-change'
    | 'pan';
  
  export interface MapEvent {
    type: MapEventType;
    payload: unknown;
    timestamp: string;
  }
  
  // Filter types
  export interface MapFilter {
    floors?: number[];
    blocks?: string[];
    minOccupancy?: number;
    maxOccupancy?: number;
    timeRange?: {
      start: string;
      end: string;
    };
  }
  
  // Legend types
  export interface MapLegend {
    title: string;
    items: Array<{
      color: string;
      label: string;
      value: number;
    }>;
  }
  
  // Export all block related types in a namespace
  export namespace BlockTypes {
    export interface Position {
      x: number;
      y: number;
    }
    
    export interface Dimensions {
      width: number;
      height: number;
    }
    
    export interface Style {
      color: string;
      borderColor: string;
      borderWidth: number;
    }
  }