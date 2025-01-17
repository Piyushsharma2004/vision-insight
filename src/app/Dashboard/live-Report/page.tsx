import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import LiveReport from "@/components/liveReport/livereportcomponents";
import ClassroomMonitor from "@/components/Box/ClassroomsBox";
import TimeTableComponent from "@/components/Tables/countdatatable";
import LiveDataTableComponent from "@/components/liveReport/livedatatable";


const liveReportPage= () => {
  return (
    <DefaultLayout>
      <div className=" ">
        <div className="mb-5">
      <LiveReport />
      </div>
      <ClassroomMonitor />
      <LiveDataTableComponent />
      </div>
    </DefaultLayout>
  );
};

export default liveReportPage;
