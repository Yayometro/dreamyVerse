"use client";

import React, { useEffect, useState } from "react";
import {
  IDreamDocument,
  IReactionDocument,
  IUserDocument,
  typeDocument,
} from "../../../../../dreamyVerse";
import { useGetAllReactionsFromThisDreamQuery } from "@/redux/features/api/apiSlice";
import {
  Avatar,
  AvatarGroup,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Skeleton } from "@/components/ui/skeleton";
import { MdError } from "react-icons/md";
import Link from "next/link";
import fetcherFetch from "@/helpers/fetcher";
import { UserCard } from "@/components/user/userCards/UserCards";
import Image from "next/image";
import GeneralAvatar from "@/components/user/generalAvtar/GeneralAvtara";
import MiniUserItemList from "../../user/miniUserItemList/MiniUserItemList";

function ReactionsGroupAvatars({
  father,
  type,
}: {
  father: IDreamDocument;
  type: typeDocument;
}) {
  const [usersReaction, setUsersReaction] = useState<[] | IReactionDocument[]>(
    []
  );
  const [newError, setNewError] = useState<string>("");
  const { error, isError, isLoading, data } =
    useGetAllReactionsFromThisDreamQuery(father._id);
  const fetcher = fetcherFetch();

  useEffect(() => {
    if (!data?.ok) {
      setUsersReaction([]);
    } else {
      setUsersReaction(data.data);
    }
  }, [data]);
  if (isError) {
    console.log(error);
    return (
      <Popover showArrow placement="top-start">
        <PopoverTrigger>
          <Button
            as={"button"}
            isIconOnly
            variant="light"
            color="danger"
            size="sm"
            className=" text-default-900 p-0 cursor-pointer"
          >
            <MdError size={100} className="w-[20px] h-[20px]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1 shadow-xl">
          <p>{newError}</p>
        </PopoverContent>
      </Popover>
    );
  }

  if (isLoading) {
    return (
      <div className="flex gap-1">
        <Skeleton className=" h-5 w-5 rounded-full" />
        <Skeleton className=" h-5 w-5 rounded-full" />
        <Skeleton className=" h-5 w-5 rounded-full" />
      </div>
    );
  }
  return (
    <div className=" flex gap-2 border-l-1 border-default-300 pl-2 justify-start items-center">
      <p className=" text-tiny pr-2">Likes: </p>
      <AvatarGroup
        isBordered
        max={3}
        total={usersReaction.length}
        className="flex gap-1 items-center"
        renderCount={(count) => (
          <Popover showArrow placement="top">
            <PopoverTrigger>
              <Button as="button" variant="light" size="sm" className="pl-2">
                +{count} in total
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 flex flex-col gap-2 items-start justify-center border-1 border-violet-600">
              {usersReaction.length <= 0
                ? "No reactions..."
                : usersReaction.map((reaction) => (
                    <MiniUserItemList
                      key={`miniUserItemList-tss-${reaction._id}`}
                      user={reaction.user as IUserDocument}
                      aClassName=" w-5 h-5"
                    />
                  ))}
            </PopoverContent>
          </Popover>
        )}
      >
        {usersReaction.length <= 0
          ? "No reactions..."
          : usersReaction.map((reaction) => (
              <Popover
                showArrow
                placement="top"
                key={`reaction-avatar-${reaction._id}`}
              >
                <PopoverTrigger>
                  <Avatar
                    as="button"
                    className="w-5 h-5 cursor-pointer"
                    src={
                      reaction.user &&
                      typeof reaction.user !== "string" &&
                      (reaction.user as IUserDocument).avatar
                        ? (reaction.user as IUserDocument).avatar
                        : "/assets/user/user-non-profile.jpg"
                    }
                  />
                </PopoverTrigger>
                <PopoverContent className="p-1">
                  <UserCard father={reaction.user as IUserDocument} />
                </PopoverContent>
              </Popover>
            ))}
      </AvatarGroup>
    </div>
  );
}

export default ReactionsGroupAvatars;
