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
      <div className="mapOne map-btn relative pt-15">
  <Image
    src="/images/task/campus-map-2.svg"
    alt="map"
    width={800}
    height={700}
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center h-[422px] rounded-md">
    <span className="text-white text-xl font-bold">Under Development</span>
  </div>
</div>

      </div>
    </div>
  );
};

export default MapTwo;
