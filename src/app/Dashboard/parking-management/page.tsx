import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ParkingManagement from "@/components/Parking/parkingtool";


const parkingPage= () => {
  return (
    <DefaultLayout>
      <div className=" ">
        
      <ParkingManagement />
      </div>
    </DefaultLayout>
  );
};

export default parkingPage;
