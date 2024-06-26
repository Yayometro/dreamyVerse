"use client";

import { useGetUserFollowersQuery } from "@/redux/features/api/apiSlice";
import React, { useEffect, useState } from "react";
import { IFollowDocument, IUserDocument } from "../../../../../dreamyVerse";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Spinner,
} from "@nextui-org/react";
import MiniUserItemList from "../../user/miniUserItemList/MiniUserItemList";

function GetUserFollowersBtn({ userId }: { userId: string }) {
  const [followersList, setFollowersList] = useState<[] | IFollowDocument[]>([]);
  const { error, isError, isLoading, data } = useGetUserFollowersQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if(data?.data){
        setFollowersList(data.data)
    } else if(isLoading || isError){
        console.log(error)
    }
  }, [isError, isLoading, data])

  return (
      <Popover placement="top">
        <PopoverTrigger>
          <Button
          variant="light"
          className=" text-black dark:text-white !w-[10px] p-0 flex flex-col gap-2 sm:flex-row"
          >
            <p>{followersList.length}</p> 
            <p>Followers </p>
            {!isLoading ? "" : <Spinner size="sm" />}</Button>
        </PopoverTrigger>
        <PopoverContent className=" border-1 border-violet-600 p-2 flex flex-col gap-2 items-start justify-center">
          {followersList.length <= 0
            ? "0 followers"
            : followersList.map((follower) => (
                <MiniUserItemList 
                  user={follower.follower as  IUserDocument} 
                  key={`get-users-followers-${follower._id}`}
                  aClassName=" w-5 h-5"
                />
              ))}
        </PopoverContent>
      </Popover>
  );
}

export default GetUserFollowersBtn;
