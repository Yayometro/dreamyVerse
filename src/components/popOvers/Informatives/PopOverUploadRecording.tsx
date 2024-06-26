import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

function PopOverUploadRecording() {
  return (
    <Popover placement="top">
      <PopoverTrigger>
        <h1 className=" w-fit hover:underline text-sm font-bold cursor-pointer pb-2 flex  items-center gap-1">
          Upload a recording about your sleep
          <FaRegQuestionCircle size={15} />
        </h1>
      </PopoverTrigger>
      <PopoverContent>
        <div className=" w-[350px] px-1 py-2">
          <div className="text-small font-bold">How does this work? 🤔</div>
          <div className="text-tiny pb-2">
            It is really simple. If you click the button, you can select a
            recording about your dream and you can storage it in our cloud.
          </div>
          🤓
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopOverUploadRecording;
