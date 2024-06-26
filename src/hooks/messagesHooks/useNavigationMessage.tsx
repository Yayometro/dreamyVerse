"use client";
import { useState, useCallback } from "react";
import useUserSelectedConversation from "@/hooks/messagesHooks/useUserSelectedConversation";
import useCurrentConversation from "./useCurrentConversation";

const useNavigationMessage = () => {
  const [navigation, setNavigation] = useState<"list" | "conversation">("list");
  const {setUserSelectedConversation} = useUserSelectedConversation()
  const {setCurrentConversation} = useCurrentConversation()

  const handleConversationClick = useCallback(() => {
    setNavigation("conversation");
  }, [setNavigation]);

  const handleBackClick = useCallback(() => {
    setNavigation("list");
    setUserSelectedConversation(null)
    setCurrentConversation(null)
  }, [setNavigation, setUserSelectedConversation, setCurrentConversation]);

  return {
    navigation,
    setNavigation,
    handleConversationClick,
    handleBackClick,
  };
};

export default useNavigationMessage;
