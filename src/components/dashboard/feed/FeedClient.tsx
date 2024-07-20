"use client";
import DreamsCards from "@/components/dreams/dreamsCards/DreamsCards";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import SkeletonCard from "@/components/skeletons/card/CardSkeleton";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import { useGetHomeFeedQuery } from "@/redux/features/api/apiSlice";
import NoData from "@/components/NoData/NoData";

function FeedClient() {
  const [posts, setPosts] = useState<IDreamDocument[]>([]);
  const { userId } = useUserNavigator();

  // Use skip to conditionally skip the query until userEmail is available
  const { data, isLoading, isError, error } = useGetHomeFeedQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (data?.data) {
      setPosts(data.data);
    }
  }, [data]);

  if (isError) {
    console.log(error);
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
    <div className="w-full max-w-5xl flex flex-col justify-start items-center border-1s border-red-400s">
      <div className="cardsContainer w-full max-w-2xl flex flex-col justify-start items-center gap-4">
        {posts.length <= 0 ? (
          <div className=" w-full h-full py-[50px]">
            <NoData title="No post here 📭" message={"Follow some user, dream or post to see new publications here..."} />
          </div>
        ) : (
            posts.map((dream: IDreamDocument) => (
              <DreamsCards
                key={`dreamCardIdFeed-${dream._id}`}
                dcDream={dream}
                dcUser={dream.user as IUserDocument}
                navigatorUser={userId as string}
              />
            ))
        )}
      </div>
    </div>
  );
}

export default FeedClient;
