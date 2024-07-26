
import React from "react";
import LeftPanel from "@/components/leftPanel/LeftPanel";
import ExternalDreamClientId from "@/components/dreams/externalDreamClientId/ExternalDreamClientId";

async function ExternalDream({ params }: { params: { id: string } }) {
  if (!params.id)
    return (
      <div className=" w-full w-max-[1200px] flex justify-center items-center">
        <p className=" text-xl md:text-3xl">
          No Dream Id provided. Please reload the page and try again later... 🤕
        </p>
      </div>
    );
  
  return (
    <div className="w-full h-full relative flex gap-2 pt-[100px]">
      <ExternalDreamClientId dreamId={params.id} />
      <LeftPanel />
    </div>
  );
}

export default ExternalDream;
