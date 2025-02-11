import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import RoomStatus from "@/components/hostel-rooms/RoomStatus";

const HostelPage= () => {
  return (
    <DefaultLayout>
      <div >
     
      <RoomStatus />
    </div>
    </DefaultLayout>
  );
};

export default HostelPage;

