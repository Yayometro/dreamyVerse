"use client";
import { useCallback, useState } from "react";
import { IUserDocument } from "../../../dreamyVerse";

const useUserSelectedConversation = () => {
  const [userSelectedConversation, setUserSelectedConversation] =
    useState<IUserDocument | null>(null);
    const handleUserSelectedConversation = useCallback(() => {
      
    }, [])
  return {
    userSelectedConversation,
    setUserSelectedConversation,
  };
};

export default useUserSelectedConversation;
