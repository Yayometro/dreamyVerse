"use client"
// socketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import socket from '@/lib/socket';
import { INotification } from '../../../dreamyVerse';
import notifier from '@/helpers/notifier';
import { playNotificationSound } from '@/helpers/soundsHelper';

interface SocketContextType {
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    const handleNotification = (notification: INotification) => {
      notifier("info", notification.message);
      playNotificationSound();
      setNotifications((prev) => [...prev, notification]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

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
