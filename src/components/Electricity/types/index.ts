// types/index.ts

export interface RoomData {
    id: string;
    count: number;
  }
  
  export interface BuildingData {
    name: string;
    rooms: RoomData[];
  }
  
  export interface PowerStatus {
    [key: string]: boolean;  // Format: "BUILDING-ROOM": boolean
  }
  
  export interface RoomProps {
    roomNumber: string;
    count: number;
    buildingName: string;
    isPowered: boolean;
    onTogglePower: (roomNumber: string) => void;
  }
  
  export interface PowerCommandResponse {
    success: boolean;
    message: string;
    roomStatus: {
      building: string;
      room: string;
      isPowered: boolean;
    };
  }
  
  // Room number mappings type
  export const roomNumbers: Record<string, string[]> = {
    NYB: ['001', '002', '003', '005', '006', '101', '102', '103', '106', '107', '202', '203', '204', '207', '208', '216', '301', '302', '303', '306', '307', '309', '311', '312', '313', '314', '401', '402', '403', '405', '406', '410', '501', '502', '503', '505', '506'],
    KAB: ['101', '102','105', '106','108','201', '202','204', '206', '207', '301', '302', '305', '306', '308', '401','402','407','502','506','507','601', '603', '607', '608', '701', '703', '704', '705'],
    NIB: ['111', '112', '301', '302', '303', '304', '305', '313', '314', '401', '402', '413', '414', '502', '511', '601', '602', '603', '613', '702', '703', '712', '711'],
    VIB: ['006', '007', '013', '016', '103', '105', '109', '110', '206', '207', '211', '212', '301', '307', '308', '312', '313', '318', '402', '403', '407', '408', '411', '412', '502', '503', '507', '508', '511', '512']
  };