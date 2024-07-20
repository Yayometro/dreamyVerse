"use client";

import GeneralAvatar from "@/components/user/generalAvtar/GeneralAvtara";
import { MessageContext } from "@/providers/messages/MessageProvider";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import React, { useContext } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdReturnLeft } from "react-icons/io";

function MessageHistoryNavigator() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("SomeComponent must be used within a MessageProvider");
  }
  const {
    navigation,
    userSelectedConversation,
    handleBackClick,
    setCurrentConversation,
  } = context;
  const itemStyle = " hover:underline cursor-pointer";
  const itemColor = "foreground";
  return (
    <div className="w-full h-full">
      {navigation === "list" ? (
        <Breadcrumbs>
          <BreadcrumbItem
            className={itemStyle}
            key={itemColor}
            color={itemColor}
          >
            Conversation List
          </BreadcrumbItem>
        </Breadcrumbs>
      ) : navigation === "conversation" ? (
        <div className="w-full flex justify-start items-center gap-2">
          <div className="w-[30px] h-[30px] rounded-lg">
            <Button
              as={"button"}
              isIconOnly
              variant="light"
              onClick={() => {
                setCurrentConversation(null);
                handleBackClick();
              }}
              className="w-full h-full"
            >
              <FaAngleLeft className="w-full h-full" />
            </Button>
          </div>
          <div className="details flex justify-center items-center">
            <GeneralAvatar
              src={`${userSelectedConversation?.avatar || ""}`}
              radius="full"
              size="md"
              username={userSelectedConversation.username}
            />
          </div>
          <div className="details flex flex-col justify-start items-start">
            <h1 className=" text-base font-semibold">
              {userSelectedConversation?.username}
            </h1>
            <p className=" text-sm">
              {userSelectedConversation?.zodiac || "no zodiac"}
            </p>
          </div>
        </div>
      ) : (
        "Error on history"
      )}
    </div>
  );
}

export default MessageHistoryNavigator;
