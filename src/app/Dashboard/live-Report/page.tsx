import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import LiveReport from "@/components/liveReport/livereportcomponents";


const liveReportPage= () => {
  return (
    <DefaultLayout>
      <div className=" ">
        
      <LiveReport />
      </div>
    </DefaultLayout>
  );
};

export default liveReportPage;
