"use client";
import NavbarExternal from "@/components/externalNavbar/ExternalNavbar";
import React from "react";

function ExternalPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" dark:bg-black bg-white text-black dark:text-white font-light w-full h-full relative">
      <NavbarExternal />
      <div className="dashboard-layout-children-cont w-full h-full py-[80px] md:pl-[100px] md:pt-0 lg:pl-[200px] xl:pl-[250px]">
        {children}
      </div>
    </div>
  );
}

export default ExternalPostLayout;
