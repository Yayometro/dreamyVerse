
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function DashbaordLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
    if (!session) {
        console.log('No session on Dashboard')
        redirect("/login")
    }

  return (
    <div className=" dark:bg-black bg-white text-black dark:text-white font-light w-full h-full relative">
      <Navbar />
      <div className="dashboard-layout-children-cont w-full h-full py-[80px] md:pl-[100px] md:pt-0 lg:pl-[200px] xl:pl-[250px]">
        {children}
      </div>
    </div>
  );
}

export default DashbaordLayout;
