"use client";
import React from "react";
import Image from "next/image";

const MapTwo: React.FC = () => {
  return (
    <div className="col-span-12 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <h4 className="mb-7 text-body-2xlg font-bold text-dark dark:text-white">
       Heap Map Of University
      </h4>
      <div className="h-[422px]">
        <div  className="mapOne map-btn">
          <Image 
            src="/images/task/campus-map.png" 
            alt="map" 
            width={800} 
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default MapTwo;
