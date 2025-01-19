import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import HostelManagement from "@/components/hostel/HostelManagement";

const HostelPage= () => {
  return (
    <DefaultLayout>
      <div >
     
      <HostelManagement />
    </div>
    </DefaultLayout>
  );
};

export default HostelPage;
