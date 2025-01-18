import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InsightsPageDev from "@/components/Insights/InsightsPageDeve";
import RoomUsageDashboard from "@/components/Insights/insightsComponts";
import EnhancedDashboard from "@/components/Insights/insightdash";


const insightsPage= () => {
  return (
    <DefaultLayout>
      <div >
        <div className="mb-5">
    <InsightsPageDev />
    </div>
    {/* <RoomUsageDashboard />  */}
      </div>
      <div>
        <EnhancedDashboard />
      </div>
    </DefaultLayout>
  );
};

export default insightsPage;
