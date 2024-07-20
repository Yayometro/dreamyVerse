"use client"

import { Avatar } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

function GeneralAvatar({
    src,
    className,
    size,
    isBordered,
    radius,
    color,
    as,
    username
}:{
    src: string
    className?: string,
    size?:  "lg" | "md" | "sm",
    isBordered? : boolean,
    radius? : "full" | "lg" | "md" | "sm",
    color? : "default" | "primary" | "secondary" | "success" | "warning" | "danger",
    as?: "button" | any
    username: string
}) {
  const router = useRouter()
  return (
    <Avatar 
    onClick={() =>router.push(`/dashboard/profile/${username}`)}
    as={as}
    src={src || "/assets/user/user-non-profile.jpg"}
    size={size}
    className={className}
    isBordered={isBordered}
    radius={radius}
    color={color}
    />
  )
}

export default GeneralAvatar