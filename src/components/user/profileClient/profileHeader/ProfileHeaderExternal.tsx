"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import GeneralAvatar from "../../generalAvtar/GeneralAvtara";
import EditMyProfile from "@/components/buttons/user/editMyProfile/EditMyProfile";
import GetUserFollowersBtn from "@/components/buttons/follows/getUserFollowersBtn/GetUserFollowersBtn";
import GetUsersFollowsBtn from "@/components/buttons/follows/getUsersFollows/GetUsersFollowsBtn";
import GetUserDreamsLengthBtn from "@/components/buttons/follows/getDreamsOfUserBtn/GetUserDreamsLengthBtn";
import { IUserDocument } from "../../../../../dreamyVerse";
import useUserNavigator from "@/hooks/useUserNavigatorId";

function ProfileHeaderExternal({ user }: { user: IUserDocument }) {
  const { userId } = useUserNavigator();
  console.log(userId, user._id)
  const descriptionPs = "text-sm sm:text-base hover:underline cursor-pointer";
  return (
    <div className="flex gap-2 py-4 my-4 px-2 bg-default-850 dark:bg-black/30 shadow-lg rounded-2xl">
      <div className="top-header-myprofile flex w-full gap-6 sm:gap-12">
        <div className="w-fit h-full flex justify-center items-center">
          <GeneralAvatar
            src={user.avatar || "/assets/user/user-non-profile.jpg"}
            radius="lg"
            className=" w-full max-w-24s max-w-44 w-[100px]s h-[100px] sm:w-[200px] sm:h-[200px]"
            isBordered={true}
          />
        </div>
        <div className="information-section flex flex-col gap-3 sm:gap-4 items-start justify-start">
          <div className="info-sec-top w-full flex gap-2 sm:gap-4 justify-start">
            <p className="text-xl sm:text-3xl font-semibold">
              @{!user.username ? "No username..." : user.username}
            </p>
            {userId === user._id ? <EditMyProfile user={user} /> : "" }
          </div>
          <div className="info-sec-body w-full flex flex-col gap-2 items-start">
            <div className="flex gap-4 items-center justify-start">
              <p className={descriptionPs}>{user?.name || "No name"}</p>
              <p className={descriptionPs}>{user?.lastName || "No lastname"}</p>
            </div>
            <div className="flex gap-4 items-center justify-start">
              <p className={descriptionPs}>{user?.zodiac || "No zodiac"}</p>
              {userId === user._id ? (
                <p className={descriptionPs}>{user?.phone || "No cellphone"}</p>
              ) : ("")}
            </div>
            {userId === user._id ? (
              <div className="flex gap-4 items-center justify-start ">
                <p className={descriptionPs}>{user.mail || "No mail"}</p>
              </div>
            ) : "" }
          </div>
          <div className="info-sec-footer w-full flex flex-col gap-2 items-start">
            <div className="flex gap-4 items-center justify-start">
              <GetUserFollowersBtn userId={user._id} />
              <GetUsersFollowsBtn userId={user._id} />
              <GetUserDreamsLengthBtn userId={user._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderExternal;
