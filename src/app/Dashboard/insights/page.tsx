import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InsightsPageDev from "@/components/Insights/InsightsPageDeve";
import RoomUsageDashboard from "@/components/Insights/insightsComponts";


const insightsPage= () => {
  return (
    <DefaultLayout>
      <div >
        <div className="mb-5">
    <InsightsPageDev />
    </div>
    <RoomUsageDashboard /> 
      </div>
    </DefaultLayout>
  );
};

export default insightsPage;
