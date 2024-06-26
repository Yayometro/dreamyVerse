"use client"

import { Avatar } from '@nextui-org/react'
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
}:{
    src: string
    className?: string,
    size?:  "lg" | "md" | "sm",
    isBordered? : boolean,
    radius? : "full" | "lg" | "md" | "sm",
    color? : "default" | "primary" | "secondary" | "success" | "warning" | "danger",
    as?: "button" | any
}) {

  return (
    <Avatar 
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