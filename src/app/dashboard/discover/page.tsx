import DiscoverClient from '@/components/discover/DiscoverClient'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function Discover() {
  const session = await getServerSession()
    if (!session) {
        console.log('No session on Dashboard')
        redirect("/login")
    }
  return (
    <DiscoverClient />
  )
}

export default Discover