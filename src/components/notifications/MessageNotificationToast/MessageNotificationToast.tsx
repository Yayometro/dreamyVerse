"use client";


import React from 'react'
import { actionSocketMessage, IMessage, IUserDocument, MessageSocketObject } from '../../../../dreamyVerse'
import GeneralAvatar from '@/components/user/generalAvtar/GeneralAvtara'

function MessageNotificationToast({messageObj}:{messageObj:MessageSocketObject}) {
  const {iMessage, action, message} = messageObj
  // console.log({iMessage, action, message})
    const user = iMessage.fromUser as unknown as IUserDocument
  return (
    <div className=' w-full h-full flex gap-2'>
        <GeneralAvatar src={user.avatar || ""} radius='full' className=' w-[50px] h-[50px]' username={user.username}/>
        <div className="Info-section w-full h-full">
            <h1 className=' text-sm font-semibold'>{user.username}</h1>
            <p className=' text-tiny font-medium'>{message || ""}</p>
            <p className=' text-tiny font-normal'>{action === "newMessage" ? iMessage.content.message : ""}</p>
        </div>
    </div>
  )
}

export default MessageNotificationToast