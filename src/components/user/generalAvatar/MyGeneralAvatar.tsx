"use client"

import { Avatar } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { IUserDocument } from '../../../../dreamyVerse'
import { useRouter } from 'next/navigation'

function MyGeneralAvatar({
    className,
    size,
    isBordered,
    radius,
    color
}:{
    className?: string,
    size?:  "lg" | "md" | "sm",
    isBordered? : boolean,
    radius? : "full" | "lg" | "md" | "sm",
    color? : "default" | "primary" | "secondary" | "success" | "warning" | "danger",
}) {
    const {data: session} = useSession()
    const [user, setUser] = useState<null | IUserDocument>(null)

    useEffect(() => {
        if(session?.user?.fullUser){
            setUser(session.user.fullUser as IUserDocument)
        }
    }, [session])
    const router = useRouter()
  return (
    <Avatar 
    onClick={() =>router.push(`/dashboard/profile/${user?.username}`)}
    src={user?.avatar || "/assets/user/user-non-profile.jpg"}
    size={size}
    className={className}
    isBordered={isBordered}
    radius={radius}
    color={color}
    />
  )
}

export default MyGeneralAvatar