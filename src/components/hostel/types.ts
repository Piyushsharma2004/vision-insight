interface Room {
    id: number;
    roomNumber: string;
    capacity: number;
    occupancy: number;
    floor: number;
    type: 'Single' | 'Double' | 'Triple';
    status: 'Available' | 'Partially Occupied' | 'Fully Occupied';
  }
  