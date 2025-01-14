'use client';
import { Zap as Lightning, Power } from 'lucide-react';

type RoomProps = {
  roomData: {
    id: string;
    count: number;
    powerOn: boolean;
  };
  buildingName: string;
  onTogglePower: (buildingName: string, roomId: string) => void;
};

const Room = ({ roomData, buildingName, onTogglePower }: RoomProps) => {
  const isLowOccupancy = roomData.count <= 5;

  return (
    <div
      className={`w-24 h-24 rounded-md p-2 flex flex-col items-center justify-center
        transition-colors duration-200 text-xs border-2
        ${
          roomData.powerOn
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
        }
      `}
    >
      <div className="text-center mb-2">
        <div className="font-bold text-sm mb-0.5 dark:text-gray-200">
          {buildingName}-{roomData.id.split('-')[1]}
        </div>
        <div className="text-sm dark:text-gray-300">{roomData.count} students</div>
      </div>
      <button
        onClick={() => onTogglePower(buildingName, roomData.id)}
        className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
          roomData.powerOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
        }`}
        title={roomData.powerOn ? 'Turn off power' : 'Turn on power'}
      >
        {roomData.powerOn ? <Power size={16} /> : <Lightning size={16} />}
      </button>
    </div>
  );
};

export default Room;
