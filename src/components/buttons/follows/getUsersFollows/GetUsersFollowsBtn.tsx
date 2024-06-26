"use client";

import { useGetListOfUsersFollowedByUserQuery } from "@/redux/features/api/apiSlice";
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

function GetUsersFollowsBtn({ userId }:{ userId: string }){
  const [followList, setFollowList] = useState<[] | IFollowDocument[]>([]);
  const { error, isError, isLoading, data } = useGetListOfUsersFollowedByUserQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if(data?.data){
        setFollowList(data.data)
    } else if(isLoading || isError){
        // console.log(error)
    }
  }, [isError, isLoading, data])

  return (
      <Popover placement="top">
        <PopoverTrigger>
          <Button
          variant="light"
          className=" text-black dark:text-white    !w-[10px] p-0 flex flex-col gap-2 sm:flex-row"
          >
            <p>{followList.length} </p>
            <p>Following </p>
            {!isLoading ? "" : <Spinner size="sm" />}</Button>
        </PopoverTrigger>
        <PopoverContent className=" border-1 border-violet-600 p-2 flex flex-col gap-2 items-start justify-center">
          {followList.length <= 0
            ? "Following no one"
            : followList.map((follower) => (
                <MiniUserItemList 
                  user={follower.user as  IUserDocument} 
                  key={`get-users-followers-${follower._id}`}
                  aClassName=" w-5 h-5"
                />
              ))}
        </PopoverContent>
      </Popover>
  );
}

export default GetUsersFollowsBtn;
