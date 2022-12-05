import React from "react";
import SideBar from "../components/SideBar";

const Inventory = () => {
  return (
    <div className="grid grid-cols-12">
      <SideBar />
      <div className="grid grid-cols-2 col-span-8 bg-gray-50"></div>
    </div>
  );
};

export default Inventory;
