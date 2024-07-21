"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

function PopOverWantToTagPeople() {
  return (
    <Popover placement="top">
      <PopoverTrigger>
        <h1 className=" w-fit hover:underline text-sm font-bold cursor-pointer pb-2 flex  items-center gap-1">
          Want to tag people?
          <FaRegQuestionCircle size={15} />
        </h1>
      </PopoverTrigger>
      <PopoverContent>
        <div className=" w-[320px] px-1 py-2">
          <div className=" text-base font-bold pb-3">
            How does this work? 🤔
          </div>
          <div className=" text-small pb-2">
            Here you have the option to tag someone from the app, with the
            option to notify him/her that you dreamed of this person.
          </div>
          <div className="text-small pb-2">
            Additionally, you can tag someone from outside of the app, and this
            person will get a notification by email.
          </div>
          <div className="text-small pb-2">
            * Remember that by default this options is enabled, so if you want to stop this to notify, simply turn of this option.
          </div>
          🤓
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopOverWantToTagPeople;
