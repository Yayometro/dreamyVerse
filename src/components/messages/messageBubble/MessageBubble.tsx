"use client";

import React, { useState } from "react";
import { IMessage, IUserDocument } from "../../../../dreamyVerse";
import GeneralAvatar from "@/components/user/generalAvtar/GeneralAvtara";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";
import { MdInfo, MdMoreHoriz } from "react-icons/md";
import { useRemoveMessageMutation } from "@/redux/features/api/apiSlice";
import notifier from "@/helpers/notifier";
import ActionsBubbleMessageSections from "../actionsBubbleMessageSections/ActionsBubbleMessageSections";
import getTimeDifference from "@/helpers/getTimeDifference";
import useUserNavigator from "@/hooks/useUserNavigatorId";

function MessageBubble({
  message,
  user,
  orientation,
}: {
  message: IMessage;
  user: IUserDocument;
  orientation: "left" | "right";
}) {
  const { userId } = useUserNavigator();
  return (
    <div
      className={`flex w-full my-2 ${
        orientation === "left" ? "justify-start" : "justify-end"
      }`}
    >
      {orientation === "left" && (
        <div className="avatar-sec flex-shrink-0 w-8 h-8 mr-2">
          <GeneralAvatar
            src={user.avatar || ""}
            className="w-full h-full rounded-full"
          />
        </div>
      )}
      {orientation === "right" &&
        message.removed.for &&
        message.removed.for.some((id) => id === message.receiverUser) && (
          //   <div className="time-sec text-[8px] w-fit h-full flex flex-col justify-center items-center flex-shrink-0s w-8s h-8s mr-2 text-slate-500 dark:text-white/35">
          <Popover placement="top" showArrow={true}>
            <PopoverTrigger>
              <Button
                as={"button"}
                variant="light"
                color="warning"
                className="time-sec text-[8px] w-fit h-full flex flex-col justify-center items-center flex-shrink-0s w-8s h-8s mr-2 text-orange-500 dark:text-white/35s"
              >
                <MdInfo size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="">
              <div className="px-1 py-2">
                <div className="text-[11px] font-bold text-orange-500">This message is currently removed for the other person only.</div>
              </div>
            </PopoverContent>
          </Popover>
          //   </div>
        )}
      {orientation === "right" && (
        <div className="time-sec text-[8px] w-fit h-full flex flex-col justify-center items-center flex-shrink-0s w-8s h-8s mr-2 text-slate-500 dark:text-white/35">
          <p className=" justify-end items-end">
            {message.createdAt
              ? getTimeDifference(message.createdAt)
              : "-no time-"}
          </p>
        </div>
      )}
      

      {message.removed.for &&
      message.removed.for.some((id) => id === userId) ? (
        <Popover placement="top" showArrow={true}>
          <PopoverTrigger>
            <Button
              variant="light"
              size="sm"
              className={`message-bubble p-0 text-slate-900 dark:text-white `}
            >
              <div
                className={`message-bubble w-full flex ${
                  orientation === "left" ? "justify-start" : "justify-end"
                } max-w-[300px] cursor-pointer`}
              >
                <div
                  className={`message-content w-full p-4 rounded-lg ${
                    orientation === "left"
                      ? "bg-gray-200 dark:bg-violet-950"
                      : "bg-violet-200 dark:bg-slate-900"
                  }`}
                >
                  This message was removed...
                </div>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" bg-slate-300 dark:bg-slate-800 flex items-center justify-center ">
            <ActionsBubbleMessageSections message={message} />
          </PopoverContent>
        </Popover>
      ) : (
        <Popover placement="top" showArrow={true}>
          <PopoverTrigger>
            <Button
              variant="light"
              size="sm"
              className={`message-bubble p-0 text-slate-900 dark:text-white `}
            >
              <div
                className={`message-bubble w-full flex ${
                  orientation === "left" ? "justify-start" : "justify-end"
                } max-w-[300px] cursor-pointer`}
              >
                <div
                  className={`message-content w-full p-4 rounded-lg ${
                    orientation === "left"
                      ? "bg-gray-200 dark:bg-violet-950"
                      : "bg-violet-200 dark:bg-slate-900"
                  }`}
                >
                  {message.content.message}
                </div>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" bg-slate-300 dark:bg-slate-800 flex items-center justify-center ">
            <ActionsBubbleMessageSections message={message} />
          </PopoverContent>
        </Popover>
      )}

      {orientation === "left" && (
        <div className="time-sec text-[8px] w-fit h-full flex flex-col justify-center items-center flex-shrink-0s w-8s h-8s ml-2 text-slate-800/40 dark:text-white/35">
          <p className=" justify-end items-end">
            {message.createdAt
              ? getTimeDifference(message.createdAt)
              : "-no time-"}
          </p>
        </div>
      )}

      {orientation === "right" && (
        <div className="avatar-sec flex-shrink-0 w-8 h-8 ml-2">
          <GeneralAvatar
            src={user.avatar || ""}
            className="w-full h-full rounded-full"
          />
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
