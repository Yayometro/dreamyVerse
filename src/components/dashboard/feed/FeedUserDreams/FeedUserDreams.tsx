"use client";
import DreamsCards from "@/components/dreams/dreamsCards/DreamsCards";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import SkeletonCard from "@/components/skeletons/card/CardSkeleton";
import { useGetHomeFeedQuery, useGetUserDreamsQuery } from "@/redux/features/api/apiSlice";
import { IDreamDocument } from "../../../../../dreamyVerse";
import NoData from "@/components/NoData/NoData";

function FeedUserDreams() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState<[] | IDreamDocument[]>([])

  // Update userEmail only once when session changes
  useEffect(() => {
    if (session?.user?.fullUser?._id) {
      setUserId(session?.user?.fullUser?._id);
    }
  }, [session]);

  // Use skip to conditionally skip the query until userEmail is available
  const { data, isLoading, isError, error } = useGetUserDreamsQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
  if(data?.data){
    setPosts(data.data)
  }
  }, [data])

  if (isError) {
    console.log(error)
    return (
      <div className="w-full md:w-[450px] lg:w-[600px] xl:w-[1000px] borderñ border-red-400s flex flex-col gap-2">
        <p>Error:</p>
        <p>An unexpected error happen. Pleas etry again later</p>
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
    <div className="w-full h-full  max-w-5xl flex justify-center items-center border-1s border-red-400s">
      <div className="cardsContainer w-full h-full max-w-2xl flex flex-col gap-4">
        {posts.length <= 0 ? (
          <div className="w-full h-full py-[30px]">
             <NoData title="¡No dreams here!" message={"Create your first dream now! 🤓"} />
          </div>
        ) : (
          data.data.map((dream: any) => (
            <DreamsCards
              key={`dreamCardIdFeed-${dream._id}`}
              dcDream={dream}
              dcUser={dream.user}
              navigatorUser={userId as string}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default FeedUserDreams;