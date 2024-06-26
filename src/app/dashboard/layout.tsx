import React from "react";
import Navbar from "@/components/Navbar/Navbar";

async function DashbaordLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className=" dark:bg-black bg-white text-black dark:text-white font-light w-full h-full relative">
      <Navbar />
      <div className="dashboard-layout-children-cont w-full h-full pt-[70px] md:pl-[80px] md:pt-0 lg:pl-[200px] xl:pl-[250px]">
        {children}
      </div>
    </div>
  );
}

export default DashbaordLayout;
