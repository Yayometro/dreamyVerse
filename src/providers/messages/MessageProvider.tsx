"use client";
import MessageNotificationToast from "@/components/notifications/MessageNotificationToast/MessageNotificationToast";
import { initializeSounds, playMessageSound } from "@/helpers/soundsHelper";
import useCurrentConversation from "@/hooks/messagesHooks/useCurrentConversation";
import useNavigationMessage from "@/hooks/messagesHooks/useNavigationMessage";
import useUserSelectedConversation from "@/hooks/messagesHooks/useUserSelectedConversation";
import socket from "@/lib/socket";
import React, { createContext, useEffect } from "react";
import { IMessage, MessageSocketObject } from "../../../dreamyVerse";
import notifier from "@/helpers/notifier";
import useUnreadMessagesActions from "@/hooks/messagesHooks/useUnreadMessages";
//CREATE CONTEXT
export const MessageContext = createContext<any>(null);

function MessageProvider({ children }: { children: React.ReactNode }) {
  const navigation = useNavigationMessage();
  const currentConversation = useCurrentConversation();
  const unreadMessagesActions = useUnreadMessagesActions();
  const userSelectedConversation = useUserSelectedConversation();

  useEffect(() => {
    initializeSounds()
    socket.on("receiveMessage", (messageObj: MessageSocketObject) => {
      const {iMessage} = messageObj
      if(currentConversation.currentConversation && currentConversation.currentConversation._id === iMessage.conversation) {
        handleReceiveMessage(messageObj)
      } else {
        playMessageSound()
        handleReceiveMessage(messageObj)
        notifier("message", "", <MessageNotificationToast messageObj={messageObj}/>)
      }
    });

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      socket.off("receiveMessage");
    };
  }, [currentConversation.currentConversation])

  const handleReceiveMessage = (messageObj: MessageSocketObject) => {
    const { iMessage, action } = messageObj;
    if (action === "newMessage") {
      unreadMessagesActions.addUnreadMessage(iMessage);
    } else if (action === "editContent") {
      unreadMessagesActions.addEditedMessage(iMessage);
    } else if (action === "removeFor" || action === "removeForAll") {
      unreadMessagesActions.addRemovedMessage(iMessage);
    } else if (action === "visibleAgain") {
      unreadMessagesActions.addMarkedAsVisibleMessage(iMessage);
    }
  };
  
  return (
    <MessageContext.Provider value={{
        ...navigation,
        ...currentConversation,
        ...unreadMessagesActions,
        ...userSelectedConversation,
      }}
      >{children}</MessageContext.Provider>
  );
}

export default MessageProvider;
