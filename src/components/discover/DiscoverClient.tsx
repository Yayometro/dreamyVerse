"use client";

import { useGetDiscoveryQuery } from "@/redux/features/api/apiSlice";
import React, { useEffect, useState } from "react";
import { IDreamDocument } from "../../../dreamyVerse";
import SkeletonCard from "../skeletons/card/CardSkeleton";
import DreamsCards from "../dreams/dreamsCards/DreamsCards";
import LeftPanel from "../leftPanel/LeftPanel";
import { useSession } from "next-auth/react";
import useUserNavigator from "@/hooks/useUserNavigatorId";

function DiscoverClient() {
  const [publicDreams, setPublicDreams] = useState<[] | IDreamDocument>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { error, isError, isLoading, data } = useGetDiscoveryQuery("");

  // Update userEmail only once when session changes
  const {userId} = useUserNavigator()

  useEffect(() => {
    if (data?.data) {
      setPublicDreams(data.data);
    }
  }, [data]);

  if (isError) {
    // if ("data" in error && error?.data) {
    //   if ("error" in error?.data) {
    //     setErrorMessage(error?.data?.error);
    //   }
    //   if ("message" in error?.data) {
    //     setErrorMessage(error?.data?.message);
    //   }
    // }
    if (typeof data.error === "object") {
      if ("error" in data.error) {
        setErrorMessage(data.error.error);
      }
    }
    if (typeof data.error === "string") {
      setErrorMessage(data.error);
    }
    return (
      <div className="w-full md:w-[450px] lg:w-[600px] xl:w-[1000px] borderñ border-red-400s flex flex-col gap-2">
        <p>Error:</p>
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full md:w-[450px] lg:w-[600px] xl:w-[1000px] borderñ border-red-400s flex flex-col gap-2">
        {[1, 2, 3, 4, 5].map((skeleton) => (
          <SkeletonCard key={`skeleton-loader-fc-${skeleton}`} />
        ))}
      </div>
    );
  }

  return (
    <div className=" md:pl-4">
      <div className="dashboard-feed-container flex gap-2">
        <div className="w-full  max-w-5xl flex justify-center items-center border-1s border-red-400s">
          <div className="cardsContainer max-w-2xl flex flex-col gap-4">
            <p className="w-full text-center font-thin text-2xl sm:text-4xl py-2 sm:py-6">
              🌜 Discover the dreams of the world 🌛
            </p>
            {!data?.data
              ? [1, 2, 3, 4, 5].map((skeleton) => (
                  <SkeletonCard key={`skeleton-loader-fc-${skeleton}`} />
                ))
              : data.data.map((dream: any) => (
                  <DreamsCards
                    key={`dreamCardIdFeedPublic-${dream._id}`}
                    dcDream={dream}
                    dcUser={dream.user}
                    navigatorUser={userId as string}
                  />
                ))}
          </div>
        </div>
        <LeftPanel />
      </div>
    </div>
  );
}

export default DiscoverClient;
