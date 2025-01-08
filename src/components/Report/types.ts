export type PeriodData = {
    maxCount: number;
    timestamp: string;
    className?: string;
  };
  
  export type RoomData = {
    roomId: string;
    periods: PeriodData[];
  };
  
  export type Block = 'VIB' | 'NYB' | 'KAB' | 'NIB';
  
  export type TimeSlot = {
    period: number;
    time: string;
  };
  
  export const TIME_SLOTS: TimeSlot[] = [
    { period: 1, time: "8:00 - 8:50" },
    { period: 2, time: "8:50 - 9:40" },
    { period: 3, time: "9:40 - 10:30" },
    { period: 4, time: "10:50 - 11:40" },
    { period: 5, time: "11:40 - 12:30" },
    { period: 6, time: "12:30 - 1:00" },
    { period: 7, time: "1:00 - 1:50" },
    { period: 8, time: "1:50 - 2:40" },
    { period: 9, time: "2:40 - 3:30" },
    { period: 10, time: "3:50 - 4:40" },
    { period: 11, time: "4:40 - 5:30" },
    { period: 12, time: "5:30 - 6:00" }
  ];
  
  export const BLOCKS: Block[] = ['VIB', 'NYB', 'KAB', 'NIB'];