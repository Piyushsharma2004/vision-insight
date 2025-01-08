import React from "react";
import Reports from "@/components/Report";
import DefaultLayout from "@/components/Layouts/DefaultLaout";


const ReportPage= () => {
  return (
    <DefaultLayout>
      <div className=" ">
        
       <Reports />
      </div>
    </DefaultLayout>
  );
};

export default ReportPage;
