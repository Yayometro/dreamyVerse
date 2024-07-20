"use client";

import React, { useEffect, useState } from "react";
import { useGetUserByUsernameQuery, useGetUserQuery } from "@/redux/features/api/apiSlice";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import SkeletonCard from "@/components/skeletons/card/CardSkeleton";
import FeedUserDreamsExternal from "./feedUserDreamExternal/FeedUserDreamExternal";
import ProfileHeaderExternal from "./profileHeader/ProfileHeaderExternal";
import NoFiles from "@/components/NoData/NoFiles/NoFiles";

function ProfileClient({id}:{id:string}) {
  const [user, setUser] = useState<null | IUserDocument>(null);
  const { error, isError, isLoading, data } = useGetUserByUsernameQuery(id);

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data]);

  if (isError) {
    console.log(error)
    return (
      <div className="w-full md:w-[450px] lg:w-[600px] xl:w-[1000px] borderñ border-red-400s flex flex-col gap-2">
        <p>Error:</p>
        <p>Something went wrong, please try again later.</p>
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
    <div className=" w-full px-2 flex gap-4 ">
      <div className="my-profile-colum-center w-full max-w-5xl flex justify-center items-center border-1s border-red-400s">
        <div className="first-col flex-col gap-4">
          {!user ? <div className="w-full h-full">
            <NoFiles message="No user available to display. Please try again later"/>
          </div> : <ProfileHeaderExternal user={user} />}
          <FeedUserDreamsExternal id={user?._id as string} />
        </div>
      </div>
    </div>
  );
}

export default ProfileClient;
