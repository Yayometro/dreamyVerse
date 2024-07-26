"use client"
// socketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import socket from '@/lib/socket';
import { INotification } from '../../../dreamyVerse';
import notifier from '@/helpers/notifier';
import { playNotificationSound, initializeSounds } from '@/helpers/soundsHelper';
import useUserNavigator from '@/hooks/useUserNavigatorId';

interface SocketContextType {
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const {userId} = useUserNavigator()

  useEffect(() => {
    initializeSounds()
    if(userId){
      socket.emit("identify", userId);
      console.log("Usuar identified by socketId-userId")
    }

    const handleNotification = (notification: INotification) => {
      notifier("info", notification.message);
      playNotificationSound();
      setNotifications((prev) => [...prev, notification]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a NotificationsProvider');
  }
  return context;
};
