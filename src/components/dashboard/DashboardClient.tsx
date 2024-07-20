"use client"
import React from 'react'
import FeedClient from './feed/FeedClient'
import LeftPanel from '../leftPanel/LeftPanel'

function DashboardClient() {
  return (
    <div className='w-full h-full md:pl-2'>
        <div className="dashboard-feed-container w-full h-full md:pt-[40px] flex gap-2">
            <FeedClient />
            <LeftPanel />
        </div>
    </div>
  )
}

export default DashboardClient