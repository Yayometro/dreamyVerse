"use client";
import { useState } from "react";

const useUnreadMessages = () => {
  const [unreadMessages, setUnreadMessages] = useState<any[]>([]);
  return {
    unreadMessages,
    setUnreadMessages,
  };
};

export default useUnreadMessages;
