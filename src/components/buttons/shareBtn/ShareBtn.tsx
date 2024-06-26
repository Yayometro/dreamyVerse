"use client";
import { MdShare } from "react-icons/md";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, {useState } from "react";
import ShareContainerBtns from "@/components/shareComponents/shareContainerBtns/ShareContainerBtns";
import { IDreamDocument } from "../../../../dreamyVerse";

function ShareBtn({ father, isBlocked }: { father: IDreamDocument, isBlocked: boolean }) {
  
  return (
    <>
    {
      !isBlocked ? (<Popover showArrow placement="top">
      <PopoverTrigger>
        <Button
          as={"button"}
          isIconOnly
          variant="light"
          color="danger"
          size="sm"
          className=" text-default-900 p-0 cursor-pointer"
        >
          <MdShare size={100} className="w-[20px] h-[20px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 shadow-xl border-1 border-violet-500">
        <ShareContainerBtns father={father} />
      </PopoverContent>
    </Popover>) : (<Popover showArrow placement="top">
      <PopoverTrigger>
        <Button
          as={"button"}
          isIconOnly
          variant="light"
          color="danger"
          size="sm"
          className=" text-default-900 p-0 cursor-pointer"
        >
          <MdShare size={100} className="w-[20px] h-[20px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 shadow-xl border-1 border-violet-500">
        <div className=" flex justify-center items-center p-2">
          <p>User blocked the ability to share 🙅‍♂️</p>
        </div>
      </PopoverContent>
    </Popover>)
    }
    </>
  );
}

export default ShareBtn;
