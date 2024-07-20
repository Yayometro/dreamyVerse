"use client";

import React from "react";
import { IUserDocument } from "../../../../../dreamyVerse";
import GeneralAvatar from "@/components/user/generalAvtar/GeneralAvtara";
import { useRouter } from "next/navigation";

function MiniUserItemList({
  user,
  aClassName,
  aSize,
  aIsBordered,
  aRadius,
  aColor,
  aAs,
}: {
  user: IUserDocument;
  aClassName?: string;
  aSize?: "lg" | "md" | "sm";
  aIsBordered?: boolean;
  aRadius?: "full" | "lg" | "md" | "sm";
  aColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  aAs?: "button" | any;
}) {
  const router = useRouter();
  return (
    <div
      className=" flex justify-between hover:underline items-center gap-2 cursor-pointer"
      onClick={() => router.push(`/dashboard/profile/${user.username}`)}
    >
      <GeneralAvatar
        src={user.avatar || "/assets/user/user-non-profile.jpg"}
        size={aSize}
        as={aAs}
        className={aClassName}
        isBordered={aIsBordered}
        radius={aRadius}
        color={aColor}
        username={user.username}
      />
      <p className="text-tiny">{user.username}</p>
    </div>
  );
}

export default MiniUserItemList;
