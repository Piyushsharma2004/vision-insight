"use client";

import jsVectorMap from "jsvectormap";
import React, { useEffect, useRef } from "react";
import "../../js/college-map";

const MapThree: React.FC = () => {
  // Use ref to store the map instance
  const mapInstance = useRef<any>(null);
  
  useEffect(() => {
    const mapElement = document.getElementById("MapThree");

    if (!mapElement) {
      console.error("Map element not found");
      return;
    }

    // Create and store the map instance
    mapInstance.current = new jsVectorMap({
      selector: "#MapThree",
      map: "university_campus",
      zoomButtons: true,
      
      regionStyle: {
        initial: {
          fill: "#C8D0D8",
        },
        hover: {
          fillOpacity: 1,
          fill: "#3056D3",
        },
      },

      regionLabelStyle: {
        initial: {
          fontFamily: "Satoshi",
          fontWeight: "semibold",
          fill: "#fff",
        },
        hover: {
          cursor: "pointer",
        },
      },

      labels: {
        regions: {
          render(code: string) {
            return code.split("-")[1];
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }
    };
  }, []); // Remove currentLayer dependency since it's not being used

  // Handle zoom functions
  const handleZoomIn = () => {
    if (mapInstance.current) {
      mapInstance.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstance.current) {
      mapInstance.current.zoomOut();
    }
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <h4 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        University Campus Map
      </h4>

      {/* Layer Selection */}
      <div className="mb-4 flex items-center justify-between">
        <label
          htmlFor="layer-select"
          className="text-sm font-medium text-dark dark:text-white"
        >
          Select Layer:
        </label>
        <select
          id="layer-select"
          className="rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-sm text-dark focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="heatmap">Heatmap</option>
          <option value="room_map">Room Map</option>
          <option value="another_layer">Another Layer</option>
        </select>
      </div>

      {/* Map Container */}
      <div className="relative h-[422px]">
        <div id="MapThree" className="MapThree map-btn"></div>

    
      </div>
    </div>
  );
};

export default MapThree;