'use client';

const Legend = () => (
  <div className="mt-4 flex gap-4 justify-center">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded border-2 border-green-500 bg-green-50 dark:bg-green-900/20" />
      <span className="text-xs text-gray-600 dark:text-gray-300">Power On</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded border-2 border-red-500 bg-red-50 dark:bg-red-900/20" />
      <span className="text-xs text-gray-600 dark:text-gray-300">Power Off</span>
    </div>
  </div>
);

export default Legend;
