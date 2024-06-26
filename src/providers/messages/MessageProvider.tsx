"use client";
import useCurrentConversation from "@/hooks/messagesHooks/useCurrentConversation";
import useNavigationMessage from "@/hooks/messagesHooks/useNavigationMessage";
import useUnreadMessages from "@/hooks/messagesHooks/useUnreadMessages";
import useUserSelectedConversation from "@/hooks/messagesHooks/useUserSelectedConversation";
import React, { createContext } from "react";
export const MessageContext = createContext<any>(null);

function MessageProvider({ children }: { children: React.ReactNode }) {
  const navigation = useNavigationMessage();
  const currentConversation = useCurrentConversation();
  const unreadMessages = useUnreadMessages();
  const userSelectedConversation = useUserSelectedConversation();
  return (
    <MessageContext.Provider value={{
        ...navigation,
        ...currentConversation,
        ...unreadMessages,
        ...userSelectedConversation,
      }}
      >{children}</MessageContext.Provider>
  );
}

export default MessageProvider;
