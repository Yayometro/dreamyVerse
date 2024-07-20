"use client";
import { useState, useCallback } from "react";
import { IdInterfaceMongoo, IMessage, IUnreadMessageActions } from "../../../dreamyVerse";

const useUnreadMessagesActions = () => {
  const [unreadMessagesActions, setUnreadMessagesActions] = useState<IUnreadMessageActions>({
    unread: [],
    edited: [],
    removed: [],
    markedVisible: []
  });

  const addUnreadMessage = useCallback((message: IMessage) => {
    setUnreadMessagesActions(prev => ({
      ...prev,
      unread: [message, ...prev.unread],
    }));
  }, []);

  const addEditedMessage = useCallback((message: IMessage) => {
    setUnreadMessagesActions(prev => ({
      ...prev,
      edited: [message, ...prev.edited],
    }));
  }, []);

  const addRemovedMessage = useCallback((message: IMessage) => {
    setUnreadMessagesActions(prev => ({
      ...prev,
      removed: [message, ...prev.removed],
    }));
  }, []);
  const addMarkedAsVisibleMessage = useCallback((message: IMessage) => {
    setUnreadMessagesActions(prev => ({
      ...prev,
      markedVisible: [message, ...prev.removed],
    }));
  }, []);
  const removeUnreadMessage = useCallback((messages: IMessage[], conversationId: IdInterfaceMongoo) => {
    setUnreadMessagesActions(prev => ({
      ...prev,
      unread: prev.unread.filter(message => message.conversation !== conversationId),
    }));
  }, []);

  const removeEditedMessage = useCallback((messages: IMessage[], conversationId: IdInterfaceMongoo) => {
    setUnreadMessagesActions(prev => ({
      ...prev,
      edited: prev.edited.filter(message => message.conversation !== conversationId),
    }));
  }, []);

  const removeRemovedMessage = useCallback((messages: IMessage[], conversationId: IdInterfaceMongoo) => {
    setUnreadMessagesActions(prev => ({
      ...prev,
      removed: prev.removed.filter(message => message.conversation !== conversationId),
    }));
  }, []);
  const removeMarkedVisibleMessage = useCallback((messages: IMessage[], conversationId: IdInterfaceMongoo) => {
    setUnreadMessagesActions(prev => ({
      ...prev,
      markedVisible: prev.removed.filter(message => message.conversation !== conversationId),
    }));
  }, []);

  return {
    unreadMessagesActions,
    addUnreadMessage,
    addEditedMessage,
    addRemovedMessage,
    addMarkedAsVisibleMessage,
    removeEditedMessage,
    removeRemovedMessage,
    removeUnreadMessage,
    removeMarkedVisibleMessage
  };
};

export default useUnreadMessagesActions;
