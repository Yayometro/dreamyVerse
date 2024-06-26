"use client";

import React, { useEffect, useState } from "react";
import MyProfileHeader from "../myProfileHeader/MyProfileHeader";
import { useGetUserQuery } from "@/redux/features/api/apiSlice";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import SkeletonCard from "@/components/skeletons/card/CardSkeleton";
import FeedUserDreams from "@/components/dashboard/feed/FeedUserDreams/FeedUserDreams";
import useUserNavigator from "@/hooks/useUserNavigatorId";

function MyProfileClient() {
  const [user, setUser] = useState<null | IUserDocument>(null);
  const {userId} = useUserNavigator()
  const { error, isError, isLoading, data } = useGetUserQuery(userId, {
    skip: !userId
  });

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    } else if (isLoading) {
    } else if (isError) {
    }
  }, [data, isLoading, isError]);
  return (
    <div className=" w-full px-2 flex gap-4 ">
      <div className="my-profile-colum-center w-full max-w-5xl flex justify-center items-center border-1s border-red-400s">
        <div className="first-col flex-col gap-4">
          {!user ? <SkeletonCard /> : <MyProfileHeader user={user} />}
          <FeedUserDreams />
        </div>
      </div>
    </div>
  );
}

export default MyProfileClient;
