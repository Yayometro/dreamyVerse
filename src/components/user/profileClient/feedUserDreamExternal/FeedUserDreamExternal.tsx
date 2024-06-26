"use client";
import DreamsCards from "@/components/dreams/dreamsCards/DreamsCards";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import SkeletonCard from "@/components/skeletons/card/CardSkeleton";
import { useGetHomeFeedQuery, useGetUserDreamsQuery } from "@/redux/features/api/apiSlice";
import { IDreamDocument } from "../../../../../dreamyVerse";
import useUserNavigator from "@/hooks/useUserNavigatorId";

function FeedUserDreamsExternal({id}:{id:string}) {
  const [posts, setPosts] = useState<[] | IDreamDocument[]>([])
  const {userId} = useUserNavigator()

  const { data, isLoading, isError, error } = useGetUserDreamsQuery(id,{
    skip: !id
  });

  useEffect(() => {
  if(data?.data){
    setPosts(data.data)
  }
  }, [data])

  if (isError) {
    return (
      <div className="w-full md:w-[450px] lg:w-[600px] xl:w-[1000px] borderñ border-red-400s flex flex-col gap-2">
        <p>Error:</p>
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
    <div className="w-full  max-w-5xl flex justify-center items-center border-1s border-red-400s">
      <div className="cardsContainer max-w-2xl flex flex-col gap-4">
        {posts.length <= 0 ? (
          <div className=" flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl"> No post here to see 🤔...</h1>
              <p className=" text-lg">Follow some user, dream or post to see new publications here...</p>
            </div>
          {/* {[1, 2, 3, 4, 5].map((skeleton) => (
            <SkeletonCard key={`skeleton-loader-fc-${skeleton}`} />
          ))} */}
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

export default FeedUserDreamsExternal;