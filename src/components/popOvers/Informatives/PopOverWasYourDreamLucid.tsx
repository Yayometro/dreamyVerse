import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

function PopOverWasYourDreamLucid() {
  return (
    <Popover placement="top">
      <PopoverTrigger>
        <h1 className=" w-fit hover:underline text-sm font-bold cursor-pointer pb-2 flex  items-center gap-1">
          Was your dream lucid?
          <FaRegQuestionCircle size={15} />
        </h1>
      </PopoverTrigger>
      <PopoverContent>
        <div className=" w-[350px] px-1 py-2">
          <div className="text-tiny pb-2">
            Was your dream so real that you think it was like reality itself or
            even more realistic than real life? If yes, turn on the switch
          </div>
          🤓
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopOverWasYourDreamLucid;
