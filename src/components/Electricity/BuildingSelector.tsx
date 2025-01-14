'use client';

type BuildingSelectorProps = {
  buildings: string[];
  selectedBuilding: string;
  setSelectedBuilding: (building: string) => void;
};

const BuildingSelector = ({
  buildings,
  selectedBuilding,
  setSelectedBuilding,
}: BuildingSelectorProps) => (
  <div className="flex gap-2 mb-4">
    {buildings.map((building) => (
      <button
        key={building}
        onClick={() => setSelectedBuilding(building)}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
          ${
            selectedBuilding === building
              ? 'bg-blue-600 text-white dark:bg-blue-500'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
          }
        `}
      >
        {building}
      </button>
    ))}
  </div>
);

export default BuildingSelector;
