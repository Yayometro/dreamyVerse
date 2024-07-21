"use client";

import GeneralAvatar from "@/components/user/generalAvtar/GeneralAvtara";
import React, { useContext, useEffect, useState } from "react";
import {
  IConversation,
  IUserDocument,
  MessageContextType,
} from "../../../../dreamyVerse";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import ReactionsGroupAvatars from "@/components/buttons/reactionBtn/reactionsGroupAvatars/ReactionsGroupAvatars";
import { SeparatorVertical } from "lucide-react";
import { MessageContext } from "@/providers/messages/MessageProvider";
import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

function ConversationItem({ conversation }: { conversation: IConversation }) {
  const [participantsGroup, setParticipantsGroup] = useState<
    null | IUserDocument[]
  >(null);
  const [userTo, setUserTo] = useState<null | IUserDocument>(null);
  const [isGroup, setIsGroup] = useState<boolean>(false);
  const { userId } = useUserNavigator();
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("SomeComponent must be used within a ConversationItem");
  }
  const {
    setUserSelectedConversation,
    handleConversationClick,
    setCurrentConversation,
    unreadMessagesActions,
  } = context as MessageContextType;

  useEffect(() => {
    const participants =
      conversation.participants as unknown as IUserDocument[];
    if (conversation.isGroup) {
      setIsGroup(true);
      setParticipantsGroup(participants);
    } else {
      setIsGroup(false);
      const isWithMyself = participants.filter(
        (participant) => participant._id === userId
      );
      if (isWithMyself.length === 2) {
        setUserTo(isWithMyself[0]);
      } else {
        const userTo =
          participants.find((participant) => participant._id !== userId) ||
          null;
        setUserTo(userTo);
      }
    }
  }, [conversation, userId]);

  const handleSelectionConversation = () => {
    console.log("Conversation is", conversation);
    setUserSelectedConversation(userTo);
    setCurrentConversation(conversation);
    handleConversationClick(conversation); //only change the navigation to "conversation" with useCallback
  };
  return (
    <div
      className="w-full flex gap-2 p-2 justify-between items-center bg-violet-200 dark:bg-slate-900 hover:bg-violet-300 hover:dark:bg-slate-800 rounded-lg cursor-pointer"
      onClick={handleSelectionConversation}
    >
      <div className="flex gap-2 justify-start items-center">
        <div className="avatar-sec">
          {!isGroup ? (
            <GeneralAvatar src={userTo?.avatar || ""} size="lg" radius="full" username={userTo && userTo.username ? userTo.username : ""}/>
          ) : (
            participantsGroup?.map((user) => (
              <GeneralAvatar
                src={user.avatar as string}
                key={`participant-key-${user._id}`}
                size="lg"
                radius="full"
                username={user.username}
              />
            ))
          )}
        </div>
        <div className="w-full h-full description flex justify-between items-center border-l-1 px-2">
          <h1 className="text-sm font-semibold hover:underline">
            {!conversation.isGroup
              ? userTo?.username
              : participantsGroup?.map((user) => user.username).join(", ")}
          </h1>
        </div>
      </div>
      {(unreadMessagesActions.unread.some(
        (msg) => msg.conversation === conversation._id
      ) &&
        unreadMessagesActions.unread.length >= 1) ||
      (unreadMessagesActions.edited.some(
        (msg) => msg.conversation === conversation._id
      ) &&
        unreadMessagesActions.edited.length >= 1) ||
      (unreadMessagesActions.removed.some(
        (msg) => msg.conversation === conversation._id
      ) &&
        unreadMessagesActions.removed.length >= 1) ||
      unreadMessagesActions.markedVisible.some(
        (msg) => msg.conversation === conversation._id
      ) ? (
        <Popover placement="top">
          <PopoverTrigger>
            <Button
              isIconOnly
              as={"button"}
              variant="light"
              color="warning"
              radius="full"
              className="mr-1 flex justify-center items-center text-tiny rounded-full bg-red-500"
            >
              {unreadMessagesActions.unread.length +
                unreadMessagesActions.edited.length +
                unreadMessagesActions.removed.length + 
                unreadMessagesActions.markedVisible.length}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-0.5 w-[200px]">
              <div className="text-small font-bold flex flex-col justify-start items-center gap-2">
                Unseen message changes:{" "}
              </div>
              <div className="text-tiny text-orange-500">
                Unread: {unreadMessagesActions.unread.length}
              </div>
              <div className="text-tiny text-blue-500">
                Edited: {unreadMessagesActions.edited.length}
              </div>
              <div className="text-tiny text-red-500">
                Removed: {unreadMessagesActions.removed.length}
              </div>
              <div className="text-tiny text-green-500">
                Marked as visible again: {unreadMessagesActions.markedVisible.length}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        ""
      )}
    </div>
  );
}

export default ConversationItem;
