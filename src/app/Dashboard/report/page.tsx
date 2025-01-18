import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
// import ReportComponent from "@/components/Report/ReportComponent";
import ReportComponent from "@/components/Report1/ReportComponent";



const ReportPage= () => {
  return (
    <DefaultLayout>
      <div className=" ">
        
      {/* <ReportComponent /> */}
      <ReportComponent />
      </div>
    </DefaultLayout>
  );
};

export default ReportPage;
