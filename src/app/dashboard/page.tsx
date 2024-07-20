import React from 'react'
import { getServerSession } from 'next-auth'

import DashboardClient from '@/components/dashboard/DashboardClient'


async function Dashboard() {
    const session = await getServerSession()
    if (!session) {
        console.log('No session on Dashboard')
    }
        
  return (
    <div className='general-dashboard-container w-full h-full lg:px-4 lg:pt-6'>
      <DashboardClient />
    </div>
  )
}

export default Dashboard