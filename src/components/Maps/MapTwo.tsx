"use client";
import jsVectorMap from "jsvectormap";
import React, { useEffect } from "react";
import "../../js/college-map";

const MapTwo: React.FC = () => {
  useEffect(() => {
    const mapElement = document.getElementById("mapOne");

    if (!mapElement) {
      console.error("Map element not found");
      return;
    }

    const vectorMapOne = new jsVectorMap({
      selector: "#mapOne",
      map: "college_map", // Your custom map
      zoomButtons: true,
      regionStyle: {
        initial: { fill: "#C8D0D8" },
        hover: { fillOpacity: 1, fill: "#3056D3" },
      },
    });

    // Cleanup logic
    return () => {
      if (vectorMapOne && document.getElementById("mapOne")) {
        vectorMapOne.destroy();
      } else {
        console.error("Vector map instance or map container not found during cleanup");
      }
    };
  }, []);

  return (
    <div className="col-span-12 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <h4 className="mb-7 text-body-2xlg font-bold text-dark dark:text-white">
        Heat Map of College Campus
      </h4>
      <div className="h-[422px]">
        <div id="mapOne" className="mapOne map-btn"></div>
      </div>
    </div>
  );
};

export default MapTwo;
