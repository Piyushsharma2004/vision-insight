import React from "react";
import TimeTableComponent from "@/components/Tables/countdatatable";
import DefaultLayout from "@/components/Layouts/DefaultLaout";


const ReportPage= () => {
  return (
    <DefaultLayout>
      <div className=" ">
        
      <TimeTableComponent />
      </div>
    </DefaultLayout>
  );
};

export default ReportPage;
