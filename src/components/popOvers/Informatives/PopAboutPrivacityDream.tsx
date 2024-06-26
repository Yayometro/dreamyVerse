import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

function PopAboutPrivacityDream() {
  return (
    <Popover placement="top">
    <PopoverTrigger>
      <h1 className=" w-fit hover:underline text-sm font-bold cursor-pointer pb-2 flex  items-center gap-1">
        Change the visibility of this post
        <FaRegQuestionCircle size={15} />
      </h1>
    </PopoverTrigger>
    <PopoverContent>
      <div className=" w-[300px] px-1 py-2">
        <div className=" text-small pb-2">
          By default your post is open to everybody. This
          means that anyone can see your dream.
        </div>
        <div className="text-small pb-2">
          But, you have the option to set wheter no one will
          see it or select specifically who can see it.
        </div>
        🤓
      </div>
    </PopoverContent>
  </Popover>
  );
}

export default PopAboutPrivacityDream;
