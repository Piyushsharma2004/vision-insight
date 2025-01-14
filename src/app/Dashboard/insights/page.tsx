import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InsightsPageDev from "@/components/Insights/InsightsPageDeve";


const insightsPage= () => {
  return (
    <DefaultLayout>
      <div className=" ">
        
    <InsightsPageDev />
      </div>
    </DefaultLayout>
  );
};

export default insightsPage;
