

import ProfileClient from '@/components/user/profileClient/ProfileClient'
import React from 'react'

function ProfileId({ params }: { params: { id: string } }) {
  return (
    <div className='w-full h-full'>
        <ProfileClient id={params.id} />
    </div>
  )
}

export default ProfileId