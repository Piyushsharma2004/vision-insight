import React from 'react';

const RoomUsageStats = () => {
  // Sample data - replace with actual data
  const periods = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
  const occupancy = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
  const dates = "Jan 15 - Jan 30";
  const period_percentage = 65;
  const ocp_mean = 45;
  
  // Sample table data
  const aldata = {
    "Jan 15": Array.from({ length: 12 }, () => Math.floor(Math.random() * 40)),
    "Jan 16": Array.from({ length: 12 }, () => Math.floor(Math.random() * 40)),
    "Jan 17": Array.from({ length: 12 }, () => Math.floor(Math.random() * 40)),
  };

  return (
    <div className="bg-gray-900 p-4 text-white">
      {/* Top Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Room Usage Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex h-64 items-end gap-2">
            {periods.map((value, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-[#5EB344] transition-all duration-300"
                  style={{ height: `${value}%` }}
                />
                <div className="mt-2 text-sm">P{idx + 1}</div>
                <div className="text-sm">{value}%</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-gray-400">
            Room used out of 12 hours
          </div>
        </div>

        {/* Room Capacity Chart */}
        <div className="bg-gray-800 p-6 rounded-lg relative">
          <div className="flex h-64 items-end gap-2">
            {occupancy.map((value, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center group relative">
                <div 
                  className="w-full bg-[#b35344] transition-all duration-300"
                  style={{ height: `${value}%` }}
                />
                <div className="mt-2 text-sm">{idx + 1}</div>
                <div className="text-sm overflow-hidden">{value}%</div>
                <div className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-sm">
                  {value}%
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-4 right-4">Dates: {dates}</div>
          <div className="text-center mt-4 text-gray-400">
            Room capacity used each period
          </div>
        </div>
      </div>

      {/* Circular Charts */}
      <div className="flex flex-wrap justify-center gap-12 mb-8">
        {/* Room Usage Chart */}
        <div className="text-center">
          <svg viewBox="0 0 36 36" className="w-32 h-32">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#444"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FFA726"
              strokeWidth="3"
              strokeDasharray={`${period_percentage}, 100`}
            />
            <text x="18" y="20.35" textAnchor="middle" fill="white" fontSize="8">
              {period_percentage}%
            </text>
          </svg>
          <div className="mt-2">Average of room used</div>
        </div>

        {/* Capacity Chart */}
        <div className="text-center">
          <svg viewBox="0 0 36 36" className="w-32 h-32">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#444"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#2196F3"
              strokeWidth="3"
              strokeDasharray={`${ocp_mean}, 100`}
            />
            <text x="18" y="20.35" textAnchor="middle" fill="white" fontSize="8">
              {ocp_mean}%
            </text>
          </svg>
          <div className="mt-2">Average room capacity utilized</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-4 text-left">Date</th>
              {Array.from({ length: 12 }, (_, i) => (
                <th key={i} className="p-4 text-center">P{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(aldata).map(([date, values], idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="p-4">{date}</td>
                {values.map((value, i) => (
                  <td key={i} className="p-4 text-center">
                    <div>{value}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomUsageStats;