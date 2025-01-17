'use client'
import { useState, useEffect, useCallback, useMemo } from "react";
import { Download, Building } from "lucide-react";

type PeriodData = {
  count: number;
  key: string;
};

const LiveDataTableComponent = () => {
  const [selectedBlock, setSelectedBlock] = useState("VIB");
  const [periodData, setPeriodData] = useState<PeriodData[][]>([]);
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(-1);

  const timeSlots = useMemo(() => [
    "8:00 - 8:50", "8:50 - 9:40", "9:40 - 10:30", "10:50 - 11:40", "11:40 - 12:30", "12:30 - 1:00",
    "1:00 - 1:50", "1:50 - 2:40", "2:40 - 3:30", "3:50 - 4:40", "4:40 - 5:30", "5:30 - 6:00"
  ], []);

  const blocks = ["VIB", "NYB", "KAB", "NIB"];

  // Function to generate weighted count
  const generateWeightedCount = useCallback(() => {
    const isLowRange = Math.random() < 0.5;
    return isLowRange
      ? Math.floor(Math.random() * 5) + 1
      : Math.floor(Math.random() * 66) + 5;
  }, []);

  // Convert time string to minutes (handling 12-hour format)
  const convertTimeToMinutes = useCallback((timeStr: string) => {
    let [hours, minutes] = timeStr.split(':').map(Number);
    // Convert afternoon hours to 24-hour format
    if (hours < 8) hours += 12;
    return hours * 60 + minutes;
  }, []);

  // Calculate current period index based on time
  const getCurrentPeriodIndex = useCallback(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < timeSlots.length; i++) {
      const [startTime, endTime] = timeSlots[i].split(' - ');
      const startMinutes = convertTimeToMinutes(startTime);
      const endMinutes = convertTimeToMinutes(endTime);

      if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        return i;
      }
    }
    return -1;
  }, [timeSlots, convertTimeToMinutes]);

  // Initialize period data
  useEffect(() => {
    const initializeData = () => {
      const newData = [...Array(13)].map(() =>
        [...Array(12)].map(() => ({
          count: generateWeightedCount(),
          key: `${Date.now()}-${Math.random()}`,
        }))
      );
      setPeriodData(newData);
    };

    initializeData();
  }, [generateWeightedCount]);

  // Update counts every 20 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPeriodData((prevData) =>
        prevData.map((room) =>
          room.map((period) => ({
            ...period,
            count: generateWeightedCount(),
            key: `${Date.now()}-${Math.random()}`,
          }))
        )
      );
    }, 800000);

    return () => clearInterval(intervalId);
  }, [generateWeightedCount]);

  // Update current period index every minute
  useEffect(() => {
    const updateCurrentPeriod = () => {
      const newIndex = getCurrentPeriodIndex();
      setCurrentPeriodIndex(newIndex);
    };

    updateCurrentPeriod(); // Initial update
    const intervalId = setInterval(updateCurrentPeriod, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [getCurrentPeriodIndex]);

  const getOccupancyStyle = (count: number) => {
    if (count === 0)
      return {
        bg: "bg-gray-100 dark:bg-gray-800",
        text: "text-gray-400 dark:text-gray-500",
        border: "border-gray-300 dark:border-gray-600",
      };
    if (count <= 5)
      return {
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-700 dark:text-green-400",
        border: "border-green-500 dark:border-green-600",
      };
    return {
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-500 dark:border-red-600",
    };
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {blocks.map((block) => (
            <button
              key={block}
              onClick={() => setSelectedBlock(block)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedBlock === block
                  ? "bg-blue-600 dark:bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                {block}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:border-gray-700 shadow-lg">
        <table className="w-full border-collapse bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="border dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900 sticky left-0 z-10 text-gray-700 dark:text-gray-300">
                Room
              </th>
              {timeSlots.map((time, index) => (
                <th
                  key={time}
                  className={`border dark:border-gray-700 p-3 min-w-[100px] text-xs ${
                    index < 6
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : "bg-cyan-50 dark:bg-cyan-900/30"
                  } ${
                    index === 5
                      ? "border-r-2 border-r-gray-400 dark:border-r-gray-600"
                      : ""
                  } text-gray-700 dark:text-gray-300`}
                >
                  <div className="font-bold mb-1">{`P${index + 1}`}</div>
                  <div className="text-xs opacity-75">{time}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periodData.map((roomPeriods, roomIndex) => (
              <tr
                key={roomIndex}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="border dark:border-gray-700 p-3 font-medium sticky left-0 bg-white dark:bg-gray-800 z-10 text-gray-700 dark:text-gray-300">
                  {`${selectedBlock}-${(roomIndex + 1)
                    .toString()
                    .padStart(2, "0")}1`}
                </td>
                {roomPeriods.map((period, periodIndex) => {
                  const style = getOccupancyStyle(period.count);
                  return (
                    <td
                      key={period.key}
                      className={`border-2 p-3 text-center transition-colors ${
                        periodIndex <= currentPeriodIndex
                          ? `${style.bg} ${style.text} ${style.border}`
                          : "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600"
                      }`}
                    >
                      {periodIndex <= currentPeriodIndex ? period.count : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveDataTableComponent;