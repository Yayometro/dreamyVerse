"use client";

import React from "react";
import Link from "next/link";
import GeneralAvatar from "@/components/user/generalAvtar/GeneralAvtara";
import { IDreamDocument, IUserDocument } from "../../../../../dreamyVerse";

function ExternalUserSectionDreamCard({
  user,
}: {
  user: IUserDocument;
}) {
  return (
    <div className=" flex gap-2 justify-start items-center">
      <GeneralAvatar src={user.avatar as string} radius="full" size="md" username={user.username}/>
      <div className="flex flex-col items-start justify-center">
        <p className=" font-medium text-sm hover:underline pl-0.5" ><Link href={`/dashboard/profile/${user.username}`} >{user.username}</Link></p>
      </div>
    </div>
  );
}

export default ExternalUserSectionDreamCard;
