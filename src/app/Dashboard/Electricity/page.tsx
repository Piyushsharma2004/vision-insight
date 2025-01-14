import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ElectricityManagement from "@/components/Electricity/Electricitypart";


const ElectricityPage= () => {
  return (
    <DefaultLayout>
      <div className=" ">
        
      <ElectricityManagement />
      </div>
    </DefaultLayout>
  );
};

export default ElectricityPage;
