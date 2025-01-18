// types.ts
export interface ClassroomData {
    date: string;
    periods: { count: number; key: string }[];
  }
  
  export interface FilterBarProps {
    blocks: string[];
    selectedBlock: string;
    onBlockChange: (block: string) => void;
    selectedStartDate: Date;
    selectedEndDate: Date;
    onDateRangeChange: (startDate: Date, endDate: Date) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
  }
  
  export interface ReportTableProps {
    dateRangeData: ClassroomData[];
    timeSlots: string[];
    selectedClassroom: string;
  }