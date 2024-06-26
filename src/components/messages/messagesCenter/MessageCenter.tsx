"use client";

import React, { useContext, useEffect, useState } from "react";
import { IConversation, IUserDocument } from "../../../../dreamyVerse";
import { useGetAllUserConversationsQuery } from "@/redux/features/api/apiSlice";
import NoData from "@/components/NoData/NoData";
import InputTagPeople from "@/components/inputs/inputTagPeople/InputTagPeople";
import SearchUsers from "@/components/search/searchUsers/SearchUsers";
import ConversationView from "../conversationView/ConversationView";
import { MessageContext } from "@/providers/messages/MessageProvider";
import ConversationItem from "../conversationItem/ConversationItem";
import { ScrollShadow, Skeleton } from "@nextui-org/react";

function MessageCenter({ userId }: { userId: string }) {
  const [conversations, setConversation] = useState<[] | IConversation[]>([]);

  const { data, isError, error, isLoading } =
    useGetAllUserConversationsQuery(userId);

  useEffect(() => {
    if (data) {
      setConversation(data.data);
    }
  }, [data]);

  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("SomeComponent must be used within a MessageProvider");
  }
  const {
    navigation,
    currentConversation,
  } = context;

  if(isError){
    console.log(error)
    return <div className="">Error</div>
  }
  if (isLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        {[0, 1, 2].map((e) => (
          <div className="max-w-[300px] w-full flex items-center gap-3" key={`skeleton-item-ms-${e}`}>
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full">
      {navigation === "list" ? (
        <div className="w-full">
          <div className="searcher w-full py-2">
            <SearchUsers />
          </div>
          {conversations.length <= 0 ? (
            <div className="w-full h-full flex justify-center items-center py-8">
              <NoData
                message={`You don't have conversations to display here. Make your first one and send a message to a friend! 😉`}
              />
            </div>
          ) : (
            <ScrollShadow className="conversation-list w-full h-full max-h-[600px] md:max-h-[800px] flex flex-col justify-center items-start gap-2">
              {conversations.map((conversation, index) => (
                <ConversationItem
                  conversation={conversation}
                  key={`conversation-item-key-${conversation._id}`}
                />
              ))}
            </ScrollShadow>
          )}
        </div>
      ) : (
        <div className="conversation-view w-full h-full">
          {currentConversation && (
            <ConversationView conversation={currentConversation} />
          )}
        </div>
      )}
    </div>
  );
}

export default MessageCenter;
