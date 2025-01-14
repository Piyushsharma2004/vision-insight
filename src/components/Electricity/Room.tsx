import React from 'react';
import { Zap, ZapOff } from 'lucide-react';
import type { RoomProps } from './types';

const Room: React.FC<RoomProps> = ({ 
  roomNumber, 
  count, 
  buildingName, 
  isPowered, 
  onTogglePower 
}) => {
  const isLowOccupancy = count <= 5;
  
  const handlePowerToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePower(roomNumber);
  };
  
  // Calculate background color based on power and occupancy state
  const getBgColor = () => {
    if (!isPowered) {
      return 'bg-red-100 border-red-500 dark:bg-red-900/30';
    }
    if (isLowOccupancy) {
      return 'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/20';
    }
    return 'bg-green-50 border-green-500 dark:bg-green-900/20';
  };

  // Calculate button styling based on power state
  const getButtonStyle = () => {
    if (!isPowered) {
      return 'bg-red-200 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-700';
    }
    return 'bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700';
  };
  
  return (
    <div
      className={`
        w-26 h-26 rounded-md p-2 
        flex flex-col items-center justify-between
        transition-all duration-200 
        border-2
        ${getBgColor()}
      `}
    >
      <div className="text-center">
        <div className="font-bold text-[12px] mb-1 dark:text-gray-200">
          {buildingName}-{roomNumber}
        </div>
        <div className={`text-[12px] ${!isPowered ? 'text-red-600 dark:text-red-400' : 'dark:text-gray-300'}`}>
          {count} students
        </div>
      </div>
      
      <button
        onClick={handlePowerToggle}
        type="button"
        className={`
          p-1.5 rounded-full 
          transition-all duration-200
          ${getButtonStyle()}
          shadow-sm
        `}
        title={isPowered ? "Turn power off" : "Turn power on"}
      >
        {isPowered ? (
          <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
        ) : (
          <ZapOff className="w-4 h-4 text-red-600 dark:text-red-400" />
        )}
      </button>

      {!isPowered && (
        <div className="absolute -top-1 -right-1">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Room);