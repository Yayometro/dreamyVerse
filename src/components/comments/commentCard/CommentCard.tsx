"use client";

import { User } from "@nextui-org/react";
import React from "react";
import {
  ICommentDream,
  IDreamDocument,
  IUserDocument,
} from "../../../../dreamyVerse";
import { MdMoreHoriz } from "react-icons/md";
import { useSession } from "next-auth/react";
import ActionsOnComment from "@/components/popOver/actionsOnComment/ActionsOnComment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import getTimeDifference from "@/helpers/getTimeDifference";
import Link from "next/link";
import GeneralAvatar from "@/components/user/generalAvtar/GeneralAvtara";

function CommentCard({
  comment,
  father,
}: {
  comment: ICommentDream;
  father: IDreamDocument;
}) {
  const { data: session } = useSession();
  const userWhoComment = comment.user as IUserDocument;
  const user = session?.user?.fullUser;
  const UserWhoPublishedId =
    father.user && typeof father.user === "object" ? father.user._id : null;

  return (
    <div className=" w-full h-full flex-col flex gap-1 bg-slate-200/95 text-slate-900 dark:bg-slate-900 dark:text-white rounded-xl py-1 px-2 items-center justify-between">
      <div className="cc-body-section w-full h-full flex gap-1 justify-center items-start">
        <GeneralAvatar
          src={userWhoComment?.avatar as string}
          radius="full"
          size="md"
        />

        <div className="cc-body-content w-full h-full flex flex-col gap-1 break-words whitespace-normal overflow-hidden">
          <div className="cc-content-header-tab flex justify-between font-bold pr-1">
            <div className="cc-username-and-information flex gap-1.5 items-center text-[12px] hover:underline">
              <Link
                href={`dashboard/profile/${userWhoComment.username}`}
                className=""
              >
                {userWhoComment.username}
              </Link>
            </div>
            <div className="cc-actions-section  flex gap-2 items-center">
              {userWhoComment?._id === user?._id ||
              UserWhoPublishedId === user?._id ? (
                <Popover>
                  <PopoverTrigger>
                    <div className="cc-actions w-[20px] h-[10px] flex justify-center items-center cursor-pointer rounded-lg hover:bg-violet-300 dark:hover:bg-violet-800">
                      <MdMoreHoriz size={100} className=" w-[20px] h-[20px]" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className=" bg-slate-300 dark:bg-slate-800 flex items-center justify-center w-[140px] mt-[-90px] ml-[-100px]">
                    <ActionsOnComment
                      comment={comment}
                      father={father}
                      userWhoComment={userWhoComment}
                      currentUser={user}
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="cc-comment-section w-full h-full text-[12px] font-light md:text-[12px] break-words whitespace-normal overflow-hidden">
            <p className=" break-words">{comment.comment}</p>
          </div>
        </div>
      </div>
      <div className="footer-comment-card w-full flex gap-2 justify-between">
        <p className=" text-[10px] text-slate-500">Likes:</p>
        <div className="text-[10px] text-slate-600">
          {comment.createdAt ? getTimeDifference(comment.createdAt) : ""}
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
