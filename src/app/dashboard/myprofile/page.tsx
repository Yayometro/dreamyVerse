import MyProfileClient from '@/components/user/myProfileComp/MyProfileClient'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function MyProfile() {
  const session = await getServerSession()
    if (!session) {
        console.log('No session on Dashboard')
        redirect("/login")
    }
  return (<MyProfileClient />)
}

export default MyProfile