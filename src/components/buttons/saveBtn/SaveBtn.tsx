"use client"
import { Button } from '@nextui-org/react'
import React from 'react'
import { GrSave } from "react-icons/gr";
import { IDreamDocument } from '../../../../dreamyVerse';

function SaveBtn({father}:{father: IDreamDocument}) {
  return (
    <Button
        isIconOnly
        variant='light'
        color='warning'
        size='sm'
        className=' text-default-900 p-0 cursor-pointer'
    >
        <GrSave size={100} className='w-[20px] h-[20px]' />
    </Button>
  )
}

export default SaveBtn