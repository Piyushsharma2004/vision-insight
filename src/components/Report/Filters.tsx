import React from "react";
import { Search, Calendar, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  onFilterApply: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  dateRange,
  setDateRange,
  onFilterApply,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Search Input */}
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Search by room or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Date Range Picker */}
     
      {/* Apply Filters Button */}
      <Button onClick={onFilterApply} className="flex items-center gap-2">
        <Filter className="w-4 h-4" />
        Apply Filters
      </Button>
    </div>
  );
};

export default Filters;
