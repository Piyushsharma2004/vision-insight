import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Mapcomponents from "@/components/Maps/MapPage";
import MapThree from "@/components/Maps/MapThreeMain";
import CampusMonitoring from "@/components/Maps/mainmap";
import CampusMap from "@/components/Map1/CampusMap";


const MapPage= () => {
  return (
    <DefaultLayout>
      <div className="mb-5">
        
     < Mapcomponents />
      </div>
      

      <div>
      <CampusMap />
      </div>
    </DefaultLayout>
  );
};

export default MapPage;
