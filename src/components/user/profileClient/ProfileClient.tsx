"use client";

import React, { useEffect, useState } from "react";
import { useGetUserByUsernameQuery, useGetUserQuery } from "@/redux/features/api/apiSlice";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import SkeletonCard from "@/components/skeletons/card/CardSkeleton";
import FeedUserDreamsExternal from "./feedUserDreamExternal/FeedUserDreamExternal";
import ProfileHeaderExternal from "./profileHeader/ProfileHeaderExternal";

function ProfileClient({id}:{id:string}) {
  const [user, setUser] = useState<null | IUserDocument>(null);
  const { error, isError, isLoading, data } = useGetUserByUsernameQuery(id);

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
          {!user ? <div className=" py-2">
            <SkeletonCard />
          </div> : <ProfileHeaderExternal user={user} />}
          <FeedUserDreamsExternal id={user?._id as string} />
        </div>
      </div>
    </div>
  );
}

export default ProfileClient;
