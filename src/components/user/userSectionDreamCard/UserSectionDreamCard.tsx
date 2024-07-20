"use client";

import React from "react";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import FollowUserBtn from "@/components/buttons/followUserBtn/FollowUserBtn";
import { User } from "@nextui-org/react";
import Link from "next/link";
import GeneralAvatar from "../generalAvtar/GeneralAvtara";

function UserSectionDreamCard({
  user,
  dream,
}: {
  user: IUserDocument;
  dream: IDreamDocument;
}) {
  return (
    <div className=" flex gap-2 justify-start items-center">
      <GeneralAvatar src={user.avatar as string} radius="full" size="md" username={user.username}/>
      <div className="flex flex-col items-start justify-center">
        <p className=" font-medium text-sm hover:underline pl-0.5" ><Link href={`dashboard/profile/${user.username}`} >{user.username}</Link></p>
        <FollowUserBtn user={user} />
      </div>
    </div>
  );
}

export default UserSectionDreamCard;
