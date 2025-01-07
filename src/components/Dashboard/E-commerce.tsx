"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import MapTwo from "@/components/Maps/MapTwo";
import ClassroomMonitor from "../Box/ClassroomsBox";
import TimeTableComponent from "../Tables/countdatatable";

const ECommerce: React.FC = () => {
  return (
    <>
      
      <ClassroomMonitor />
      <div className=" grid grid-cols-12 gap-4  md:gap-6  2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
       
     

        <div className="col-span-12 xl:col-span-8">
          <TableOne />
          
        </div>
        <ChatCard />
      </div>
      <TimeTableComponent />
    </>
  );
};

export default ECommerce;
