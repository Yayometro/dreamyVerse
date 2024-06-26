"use client";
import { useState } from "react";
import { IConversation } from "../../../dreamyVerse";

const useCurrentConversation = () => {
  const [currentConversation, setCurrentConversation] =
    useState<IConversation | null>(null);

  return {
    currentConversation,
    setCurrentConversation,
  };
};

export default useCurrentConversation;
