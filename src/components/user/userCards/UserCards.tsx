"use client"

import React, { useState } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { IUserDocument } from "../../../../dreamyVerse";
import fetcherFetch from "@/helpers/fetcher";

export const UserCard = ({father}: {father: IUserDocument}) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const fetcher = fetcherFetch()

  return (
    <Link href={`${fetcher.getFrontEndURL()}/profile/${father.username}`}>
    <Card className="max-w-[200px] border-none bg-transparent cursor-pointer hover:underline">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="sm" src={father.avatar || "/assets/user/user-non-profile.jpg"} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{
                father.username
            }</h4>
            <h5 className="text-small tracking-tight text-default-500">{
            
            }</h5>
          </div>
        </div>
        {/* <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button> */}
        
      </CardHeader>
    </Card>
    </Link>
  );
};
