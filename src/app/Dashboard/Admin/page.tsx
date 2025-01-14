import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AdminPageDev from "@/components/Admin/admindev";


const adminPage= () => {
  return (
    <DefaultLayout>
      <div className=" ">
        
      <AdminPageDev />
      </div>
    </DefaultLayout>
  );
};

export default adminPage;
