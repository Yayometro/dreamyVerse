import { User } from "@nextui-org/react";
import React from "react";
import { IUserDocument } from "../../../../dreamyVerse";
import { Link } from "lucide-react";
import FollowUserBtn from "@/components/buttons/followUserBtn/FollowUserBtn";
import { useRouter } from "next/navigation";
import MyGeneralAvatar from "../generalAvatar/MyGeneralAvatar";
import GeneralAvatar from "../generalAvtar/GeneralAvtara";

function UserFollowCard({ user, link }: { user: IUserDocument; link: string }) {
  const router = useRouter();
  return (
    <div className=" cursor-pointer w-full bg-slate-100 dark:bg-slate-900 rounded-lg flex justify-start items-center py-1.5 px-2 gap-2 hover:bg-slate-200 dark:hover:bg-slate-200 ">
      <div
        className="avatar-container cursor-pointer"
        onClick={() => router.push(link || `/dashboard/profile/${user.username}`)}
      >
        <GeneralAvatar
          src={user.avatar as string}
          size="md"
          radius="full"
        />
      </div>
      <div className=" w-full flex justify-between">
        <div
          className=" w-full flex flex-col gap-1 items-start justify-center"
        >
          <div className=" text-blue-500 hover:underline text-sm "
          onClick={() => router.push(link || `/dashboard/profile/${user.username}`)}
          >
            @{user.username}
          </div>
          <div className=" hover:underline text-xs ">
            {!user.zodiac
              ? `${user?.name} ${user?.lastName}`
              : `${user.zodiac}`}
          </div>
        </div>
        <FollowUserBtn
          user={user}
          styles=" h-full p-2 flex justify-center items-center cursor-pointer text-violet-600 text-sm hover:undeline"
        />
      </div>
    </div>
  );
}

export default UserFollowCard;
