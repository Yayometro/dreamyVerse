"use client"
import React, { useEffect } from 'react'
import FeedClient from './feed/FeedClient'
import LeftPanel from '../leftPanel/LeftPanel'
import useUserNavigator from '@/hooks/useUserNavigatorId';
import socket from '@/lib/socket';

function DashboardClient() {
  // const { userId } = useUserNavigator();


  // useEffect(() => {
  //   if (userId) {
  //       console.log(userId)
  //     const resSocket = socket.emit('identify', userId);
  //     console.log(resSocket)
  //   }
  // }, [userId]);
  return (
    <div className=' md:pl-2'>
        <div className="dashboard-feed-container flex gap-2">
            <FeedClient />
            <LeftPanel />
        </div>
    </div>
  )
}

export default DashboardClient