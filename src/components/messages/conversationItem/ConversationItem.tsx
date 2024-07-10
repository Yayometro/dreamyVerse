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
  const { setUserSelectedConversation, handleConversationClick, setCurrentConversation } =
    context as MessageContextType;

  useEffect(() => {
    const participants = conversation.participants as unknown as IUserDocument[];
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
    setUserSelectedConversation(userTo);
    setCurrentConversation(conversation)
    handleConversationClick(conversation); //only change the navigation to "conversation" with useCallback
  };
  return (
    <div
      className="w-full flex gap-2 p-2 justify-start items-center bg-violet-200 dark:bg-slate-900 hover:bg-violet-300 hover:dark:bg-slate-800 rounded-lg cursor-pointer"
      onClick={handleSelectionConversation}
    >
      <div className="avatar-sec">
        {!isGroup ? (
          <GeneralAvatar
            src={userTo?.avatar || ""}
            size="lg"
            radius="full"
          />
        ) : (
          participantsGroup?.map((user) => (
            <GeneralAvatar
              src={user.avatar as string}
              key={`participant-key-${user._id}`}
              size="lg"
              radius="full"
            />
          ))
        )}
      </div>
      <div className="w-full h-full description flex justify-start items-center border-l-1 px-2">
        <h1 className="text-sm font-semibold hover:underline">
          {!conversation.isGroup
            ? userTo?.username
            : participantsGroup?.map((user) => user.username).join(", ")}
        </h1>
      </div>
    </div>
  );
}

export default ConversationItem;
