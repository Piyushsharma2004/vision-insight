import { Home, DoorClosed, Users } from 'lucide-react';

interface StatsProps {
  total: number;
  available: number;
  occupied: number;
}

export const Stats = ({ total, available, occupied }: StatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <StatCard icon={<Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />} label="Total Rooms" value={total} color="blue" />
    <StatCard icon={<DoorClosed className="h-6 w-6 text-green-600 dark:text-green-400" />} label="Available" value={available} color="green" />
    <StatCard icon={<Users className="h-6 w-6 text-red-600 dark:text-red-400" />} label="Occupied" value={occupied} color="red" />
  </div>
);

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`bg-${color}-100 dark:bg-${color}-900/50 p-3 rounded-xl`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  </div>
);