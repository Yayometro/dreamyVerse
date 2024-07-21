"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

function InfoTagOutsideApp() {
  return (
    <Popover placement="top">
      <PopoverTrigger>
        <h1 className="w-fit hover:underline text-sm font-bold cursor-pointer pb-2 flex items-center gap-1">
          Tag someone from outside the app.
          <FaRegQuestionCircle size={15} />
        </h1>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] h-[320px] pt-[350px] overflow-y-scroll">
        <div className="w-full h-full px-1 py-2 flex flex-col items-start justify-center gap-1.5">
          <div className="text-small pb-2">
            To tag someone from outside the app you have 2 options.
          </div>
          <div className="flex flex-col gap-2 items-start p-4">
            <div className="flex flex-col items-start gap-1">
              <p>
                1. Just write the name of the person or persons and separate
                them with one SPACE. <b>{"It's"} important to say that all the persons tagged in this format will not be notified. </b>
              </p>
              <p className="pl-4">Example: Juan Alexander Jhon ...</p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <p>
                2. If you want to notify a person who you dream of and {"it's"} outside the app, then write the mail of the person or persons and separate them with a SPACE.
              </p>
              <p className="pl-4">Example: juan123@gmail.com trevol.Since@Outlook.com pepe.Monche@yahoo.com...</p>
            </div>
          </div>
          <div className="text-small pb-2 flex flex-col gap-2 text-blue-600">
            <p>Remember that if you choose the option to notify as true this will be applied to all the persons you tagged whether they are users in this app or are emails from people outside of the app.</p>
            <p>Remember that once you tag an email and activate the notify option, this person will receive a notification from DreamyVerse in their personal account notifying them that you dreamed of this person.</p>
          </div>
          <div>🤓</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default InfoTagOutsideApp;
