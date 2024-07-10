// src/components/messages/messagesCenter/ConversationView.jsx
import React, { useContext, useEffect, useState } from "react";
import { IConversation, IMessage, IUserDocument, MessageContextType } from "../../../../dreamyVerse";
import { useGetAllMessagesPerConversationQuery } from "@/redux/features/api/apiSlice";
import NoData from "@/components/NoData/NoData";
import { ScrollShadow, Skeleton } from "@nextui-org/react";
import NoFiles from "@/components/NoData/NoFiles/NoFiles";
import MessageBubble from "../messageBubble/MessageBubble";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import MessageTexbox from "../messageTextbox/MessageTexbox";
import { MessageContext } from "@/providers/messages/MessageProvider";

const ConversationView = ({
  conversation,
}: {
  conversation: IConversation;
}) => {
  const { data, isError, isLoading, error } =
    useGetAllMessagesPerConversationQuery(conversation._id as string);
  const [messages, setMessages] = useState<IMessage[] | []>([]);
  const [updateComp, setUpdateComp] = useState<number>(0);
  //Get the context
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("SomeComponent must be used within a MessageProvider");
  }
  const {
    unreadMessages
  } = context as MessageContextType;
  //Get all messages from the current conversation

    const {userId} = useUserNavigator() 
    console.log("ConversationView se renderizó otra vez jeje ")

  useEffect(() => {
    if (data) {
      if(data.data === 0){
        setMessages([])
      } else {
        const recentOrderMsg = [...(data.data as IMessage[])].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB.getTime() - dateA.getTime();
        });
        setMessages(recentOrderMsg);
      }
    }
    // if(unreadMessages){
    //   console.log("unreadMessages", unreadMessages)
    //   const messagesOfThisConversation = unreadMessages.filter((messages:IMessage) => messages.conversation === conversation._id)
    //   console.log(messagesOfThisConversation)
    //   // let updatedMessages = [...messagesOfThisConversation as IMessage[], ...messages].sort((a, b) => {
    //   //   const dateA = new Date(a.createdAt || 0);
    //   //   const dateB = new Date(b.createdAt || 0);
    //   //   return dateB.getTime() - dateA.getTime();
    //   // });
    //   let updatedMessages = [...messagesOfThisConversation as IMessage[], ...messages];
    //   setMessages(prevMessages => [...unreadMessages, ...prevMessages])
    // }
  }, [data, unreadMessages, conversation._id]);

  if (isError) {
    console.log(error);
    return (
      <div className="w-full h-full">
        <NoData message="Something went wrong, please reload and try again" />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        {[0, 1, 2, 3, 4].map((e) => (
          <div
            className="max-w-[300px] w-full flex items-center gap-3"
            key={`skeleton-item-ms-${e}`}
          >
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
    <div className="conversation-messages w-full h-full flex flex-col justify-between overflow-y-auto">
      <ScrollShadow 
      hideScrollBar={true}
      className="messages-container w-full h-[90%] max-[375px]:h-[400px]x max-[414px]:h-[500px]x  flex flex-col gap-2 overflow-y-scroll border-1s"
      >
        <p className="text-[10px] w-full text-center">Recent messages:</p>
        {
          messages.length <= 0 ? (
            <div className="w-full h-full py-4">
              <NoFiles message="This conversation is empty. Be the first one to chat! 😎" />
            </div>
          ) : (
            messages.map(msn => (
              <MessageBubble
                key={`message--bubble-key-${msn._id}`}
                message={msn}
                user={msn.fromUser as unknown as  IUserDocument}
                orientation={msn.fromUser._id as unknown as string === userId as string ? "right" : "left"}
              />
            ))
          )
        }
      </ScrollShadow>
    </div>
  );
};

export default ConversationView;
