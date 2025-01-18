import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InsightsPageDev from "@/components/Insights/InsightsPageDeve";
import RoomUsageDashboard from "@/components/Insights/insightsComponts";
import EnhancedDashboard from "@/components/Insights/insightdash";


const insightsPage= () => {
  return (
    <DefaultLayout>
      <div >
     
    {/* <RoomUsageDashboard />  */}
      </div>
      <div>
        <EnhancedDashboard />
      </div>
      <div className="mt-5">
    <InsightsPageDev />
    </div>
    </DefaultLayout>
  );
};

export default insightsPage;
