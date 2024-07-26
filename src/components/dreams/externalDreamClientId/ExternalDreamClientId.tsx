"use client";
import React, { useEffect } from "react";
import { useGetDreamQuery } from "@/redux/features/api/apiSlice";
import SkeletonCard from "@/components/skeletons/card/CardSkeleton";
import NoFiles from "@/components/NoData/NoFiles/NoFiles";
import ExternalDreamCard from "../externalDreamCard/ExternalDreamCard";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";

function ExternalDreamClientId({ dreamId }: { dreamId: string }) {
  const { isError, error, isLoading, data } = useGetDreamQuery(dreamId);

  useEffect(() => {
    if (data) {
      console.log(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full md:w-[450px] lg:w-[600px] xl:w-[1000px] borderñ border-red-400s flex flex-col gap-2">
        <SkeletonCard />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <div className=" w-full h-full w-max-[1200px] flex justify-center items-center">
        <NoFiles
          message="No dream loaded from server. Please reload the page and try again
            later... 🤕"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {!data ? (
        <div className=" w-full h-full w-max-[1200px] flex justify-center items-center">
          <NoFiles
            message="No dream loaded from server. Please reload the page and try again
            later... 🤕"
          />
        </div>
      ) : (
        <div className="dream-container-id w-full max-w-5xl justify-center items-start lg:pl-4 flex flex-col gap-10">
            <h1 className=" text-orange-500 text-4xl">You are watching this as external user. Actions are limited.</h1>
          <ExternalDreamCard
            dcDream={data.data}
            dcUser={(data.data as IDreamDocument).user as IUserDocument}
          />
          <div className="cardsContainer w-full max-w-2xl flex justify-center items-center"></div>
        </div>
      )}
    </div>
  );
}

export default ExternalDreamClientId;
