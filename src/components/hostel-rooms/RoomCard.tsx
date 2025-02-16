import { Building2, Tag, Home, Calendar } from 'lucide-react';
import { Room } from './types';

interface RoomCardProps {
  room: Room;
  onViewDetails: (room: Room) => void;
}

export const RoomCard = ({ room, onViewDetails }: RoomCardProps) => {
  // Helper function to format status classNames
  const getStatusClasses = (isOccupied: boolean) => ({
    badge: isOccupied 
      ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' 
      : 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
    indicator: isOccupied 
      ? 'bg-red-500 dark:bg-red-600' 
      : 'bg-green-500 dark:bg-green-600',
    iconBackground: isOccupied 
      ? 'bg-red-100 dark:bg-red-900/50' 
      : 'bg-green-100 dark:bg-green-900/50',
    iconColor: isOccupied 
      ? 'text-red-600 dark:text-red-400' 
      : 'text-green-600 dark:text-green-400',
    button: isOccupied
      ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900/75'
      : 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/50 dark:text-green-400 dark:hover:bg-green-900/75'
  });

  const statusClasses = getStatusClasses(room.status);

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all transform overflow-hidden cursor-pointer">
      {/* Status Indicator Bar */}
      <div className={`h-2 ${statusClasses.indicator} transition-all`} />
      
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              Room {room.room_number}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusClasses.badge}`}>
                {room.status ? 'Occupied' : 'Available'}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {room.block} Block
              </span>
            </div>
          </div>
          
          <div className={`p-3 rounded-xl ${statusClasses.iconBackground} group-hover:scale-110 transition-transform`}>
            <Building2 className={`h-5 w-5 ${statusClasses.iconColor}`} />
          </div>
        </div>

        {/* Room Details */}
        <div className="space-y-4">
          {/* Section Info */}
          <div className="flex items-center gap-3">
            <Tag className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Section: {room.section}
            </p>
          </div>

          {/* Type Info */}
          <div className="flex items-center gap-3">
            <Home className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Type: {room.hostel_type}
            </p>
          </div>

          {/* Footer Section */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {/* Last Updated */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated: Today
                </span>
              </div>

              {/* View Details Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  onViewDetails(room);
                }}
                className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${statusClasses.button}`}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optional: Add a loading skeleton version of the card
export const RoomCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
    <div className="h-2 bg-gray-200 dark:bg-gray-700" />
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <div>
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);